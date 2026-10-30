import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  addDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  PERSONAL_INFO,
  INITIAL_SKILLS,
  FEATURED_PROJECTS,
  SERVICES_LIST
} from '../data/portfolioData';
import { SkillItem, ProjectItem, ServiceItem, ContactFormData } from '../types/portfolio';
import { useAuth } from './AuthContext';

export interface ContactMessage extends ContactFormData {
  id: string;
  createdAt: string;
  read?: boolean;
}

interface PortfolioDataContextType {
  personalInfo: typeof PERSONAL_INFO;
  skills: SkillItem[];
  projects: ProjectItem[];
  services: ServiceItem[];
  messages: ContactMessage[];
  loading: boolean;
  seedInitialData: () => Promise<void>;
  updatePersonalInfo: (data: Partial<typeof PERSONAL_INFO>) => Promise<void>;
  addSkill: (skill: Omit<SkillItem, 'id'>) => Promise<void>;
  updateSkill: (id: string, skill: Partial<SkillItem>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
  addProject: (project: Omit<ProjectItem, 'id'>) => Promise<void>;
  updateProject: (id: string, project: Partial<ProjectItem>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addService: (service: Omit<ServiceItem, 'id'>) => Promise<void>;
  updateService: (id: string, service: Partial<ServiceItem>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  submitContactMessage: (msg: ContactFormData) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  toggleMessageRead: (id: string, currentRead: boolean) => Promise<void>;
}

const PortfolioDataContext = createContext<PortfolioDataContextType>({
  personalInfo: PERSONAL_INFO,
  skills: INITIAL_SKILLS,
  projects: FEATURED_PROJECTS,
  services: SERVICES_LIST,
  messages: [],
  loading: true,
  seedInitialData: async () => {},
  updatePersonalInfo: async () => {},
  addSkill: async () => {},
  updateSkill: async () => {},
  deleteSkill: async () => {},
  addProject: async () => {},
  updateProject: async () => {},
  deleteProject: async () => {},
  addService: async () => {},
  updateService: async () => {},
  deleteService: async () => {},
  submitContactMessage: async () => {},
  deleteMessage: async () => {},
  toggleMessageRead: async () => {},
});

export const PortfolioDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState<typeof PERSONAL_INFO>(PERSONAL_INFO);
  const [skills, setSkills] = useState<SkillItem[]>(INITIAL_SKILLS);
  const [projects, setProjects] = useState<ProjectItem[]>(FEATURED_PROJECTS);
  const [services, setServices] = useState<ServiceItem[]>(SERVICES_LIST);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { isAdmin } = useAuth();

  // 1. Sync Settings
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'portfolio_settings', 'general'),
      (snapshot) => {
        if (snapshot.exists()) {
          setPersonalInfo((prev) => ({ ...prev, ...snapshot.data() }));
        }
      },
      (error) => {
        console.warn('Settings listener:', error.message);
      }
    );
    return () => unsub();
  }, []);

  // 2. Sync Skills
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'skills'),
      (snapshot) => {
        if (!snapshot.empty) {
          const list: SkillItem[] = [];
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...(docSnap.data() as Omit<SkillItem, 'id'>) });
          });
          setSkills(list);
        }
      },
      (error) => {
        console.warn('Skills listener:', error.message);
      }
    );
    return () => unsub();
  }, []);

  // 3. Sync Projects
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'projects'),
      (snapshot) => {
        if (!snapshot.empty) {
          const list: ProjectItem[] = [];
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...(docSnap.data() as Omit<ProjectItem, 'id'>) });
          });
          setProjects(list);
        }
      },
      (error) => {
        console.warn('Projects listener:', error.message);
      }
    );
    return () => unsub();
  }, []);

  // 4. Sync Services
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'services'),
      (snapshot) => {
        if (!snapshot.empty) {
          const list: ServiceItem[] = [];
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...(docSnap.data() as Omit<ServiceItem, 'id'>) });
          });
          setServices(list);
        }
      },
      (error) => {
        console.warn('Services listener:', error.message);
      }
    );
    return () => unsub();
  }, []);

  // 5. Sync Messages (Admin only)
  useEffect(() => {
    if (!isAdmin) {
      setMessages([]);
      setLoading(false);
      return;
    }

    const unsub = onSnapshot(
      collection(db, 'messages'),
      (snapshot) => {
        const list: ContactMessage[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...(docSnap.data() as Omit<ContactMessage, 'id'>) });
        });
        list.sort((a, b) => (new Date(b.createdAt).getTime() || 0) - (new Date(a.createdAt).getTime() || 0));
        setMessages(list);
        setLoading(false);
      },
      (error) => {
        console.warn('Messages listener:', error.message);
        setLoading(false);
      }
    );
    return () => unsub();
  }, [isAdmin]);

  // Seed default data into Firestore
  const seedInitialData = async () => {
    try {
      await setDoc(doc(db, 'portfolio_settings', 'general'), PERSONAL_INFO);

      for (const item of INITIAL_SKILLS) {
        const { id, ...data } = item;
        await setDoc(doc(db, 'skills', id), data);
      }

      for (const item of FEATURED_PROJECTS) {
        const { id, ...data } = item;
        await setDoc(doc(db, 'projects', id), data);
      }

      for (const item of SERVICES_LIST) {
        const { id, ...data } = item;
        await setDoc(doc(db, 'services', id), data);
      }
    } catch (err: any) {
      console.warn('Seed operation:', err.message);
    }
  };

  const updatePersonalInfo = async (data: Partial<typeof PERSONAL_INFO>) => {
    setPersonalInfo((prev) => ({ ...prev, ...data }));
    try {
      await setDoc(doc(db, 'portfolio_settings', 'general'), data, { merge: true });
    } catch (err: any) {
      console.warn('Update settings:', err.message);
    }
  };

  const addSkill = async (skill: Omit<SkillItem, 'id'>) => {
    const newId = `skill-${Date.now()}`;
    const newSkillItem: SkillItem = { id: newId, ...skill };
    setSkills((prev) => [...prev, newSkillItem]);

    try {
      await setDoc(doc(db, 'skills', newId), skill);
    } catch (err: any) {
      console.warn('Add skill:', err.message);
    }
  };

  const updateSkill = async (id: string, skill: Partial<SkillItem>) => {
    setSkills((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...skill } : item))
    );

    try {
      await setDoc(doc(db, 'skills', id), skill, { merge: true });
    } catch (err: any) {
      console.warn('Update skill:', err.message);
    }
  };

  const deleteSkill = async (id: string) => {
    setSkills((prev) => prev.filter((item) => item.id !== id));

    try {
      await deleteDoc(doc(db, 'skills', id));
    } catch (err: any) {
      console.warn('Delete skill:', err.message);
    }
  };

  const addProject = async (project: Omit<ProjectItem, 'id'>) => {
    const newId = `project-${Date.now()}`;
    const newProjectItem: ProjectItem = { id: newId, ...project };
    setProjects((prev) => [newProjectItem, ...prev]);

    try {
      await setDoc(doc(db, 'projects', newId), project);
    } catch (err: any) {
      console.warn('Add project:', err.message);
    }
  };

  const updateProject = async (id: string, project: Partial<ProjectItem>) => {
    setProjects((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...project } : item))
    );

    try {
      await setDoc(doc(db, 'projects', id), project, { merge: true });
    } catch (err: any) {
      console.warn('Update project:', err.message);
    }
  };

  const deleteProject = async (id: string) => {
    // Optimistic local state removal
    setProjects((prev) => prev.filter((item) => item.id !== id));

    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (err: any) {
      console.warn('Delete project:', err.message);
    }
  };

  const addService = async (service: Omit<ServiceItem, 'id'>) => {
    const newId = `service-${Date.now()}`;
    const newServiceItem: ServiceItem = { id: newId, ...service };
    setServices((prev) => [...prev, newServiceItem]);

    try {
      await setDoc(doc(db, 'services', newId), service);
    } catch (err: any) {
      console.warn('Add service:', err.message);
    }
  };

  const updateService = async (id: string, service: Partial<ServiceItem>) => {
    setServices((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...service } : item))
    );

    try {
      await setDoc(doc(db, 'services', id), service, { merge: true });
    } catch (err: any) {
      console.warn('Update service:', err.message);
    }
  };

  const deleteService = async (id: string) => {
    setServices((prev) => prev.filter((item) => item.id !== id));

    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (err: any) {
      console.warn('Delete service:', err.message);
    }
  };

  const submitContactMessage = async (msg: ContactFormData) => {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      ...msg,
      createdAt: new Date().toISOString(),
      read: false,
    };
    setMessages((prev) => [newMsg, ...prev]);

    try {
      await addDoc(collection(db, 'messages'), {
        ...msg,
        createdAt: newMsg.createdAt,
        read: false,
      });
    } catch (err: any) {
      console.warn('Submit message:', err.message);
    }
  };

  const deleteMessage = async (id: string) => {
    setMessages((prev) => prev.filter((item) => item.id !== id));

    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (err: any) {
      console.warn('Delete message:', err.message);
    }
  };

  const toggleMessageRead = async (id: string, currentRead: boolean) => {
    setMessages((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: !currentRead } : item))
    );

    try {
      await setDoc(doc(db, 'messages', id), { read: !currentRead }, { merge: true });
    } catch (err: any) {
      console.warn('Toggle read:', err.message);
    }
  };

  return (
    <PortfolioDataContext.Provider
      value={{
        personalInfo,
        skills,
        projects,
        services,
        messages,
        loading,
        seedInitialData,
        updatePersonalInfo,
        addSkill,
        updateSkill,
        deleteSkill,
        addProject,
        updateProject,
        deleteProject,
        addService,
        updateService,
        deleteService,
        submitContactMessage,
        deleteMessage,
        toggleMessageRead,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => useContext(PortfolioDataContext);
