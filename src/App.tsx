import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { SocialPlaceholderModal } from './components/SocialPlaceholderModal';
import { NotFoundView } from './components/NotFoundView';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PortfolioDataProvider } from './context/PortfolioDataContext';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';

function MainApp() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedServiceForContact, setSelectedServiceForContact] = useState<string>('');
  const [is404View, setIs404View] = useState<boolean>(false);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [socialModalData, setSocialModalData] = useState<{
    name: string;
    url: string;
    hint: string;
  } | null>(null);

  const { user, isAdmin, loading: authLoading } = useAuth();

  // Handle URL hash for #404 and #admin
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#404') {
        setIs404View(true);
        setIsAdminView(false);
      } else if (hash === '#admin') {
        setIsAdminView(true);
        setIs404View(false);
      } else {
        setIs404View(false);
        setIsAdminView(false);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    if (is404View || isAdminView) return;

    const sectionIds = ['hero', 'about', 'skills', 'projects', 'services', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [is404View, isAdminView]);

  const handleNavigate = (sectionId: string) => {
    if (is404View || isAdminView) {
      setIs404View(false);
      setIsAdminView(false);
      window.location.hash = '';
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceForContact(serviceTitle);
    handleNavigate('contact');
  };

  const handleOpenSocialPlaceholder = (name: string, url: string, hint: string) => {
    setSocialModalData({ name, url, hint });
  };

  const openAdminMode = () => {
    setIsAdminView(true);
    window.location.hash = '#admin';
  };

  const closeAdminMode = () => {
    setIsAdminView(false);
    window.location.hash = '';
  };

  if (isAdminView) {
    if (authLoading) {
      return (
        <div className="min-h-screen bg-[#08080c] flex items-center justify-center text-slate-300 font-mono text-sm">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-violet-500 animate-ping"></span>
            <span>Verifying Admin Authorization...</span>
          </div>
        </div>
      );
    }

    if (!user || !isAdmin) {
      return <AdminLogin onClose={closeAdminMode} />;
    }

    return <AdminDashboard onReturnToSite={closeAdminMode} />;
  }

  return (
    <AnimatePresence mode="wait">
      {is404View ? (
        <motion.div
          key="404-page"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="min-h-screen bg-[#08080c]"
        >
          <NotFoundView
            onReturnHome={() => {
              setIs404View(false);
              window.location.hash = '';
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          key="portfolio-main"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="min-h-screen bg-[#08080c] text-slate-100 flex flex-col font-sans selection:bg-violet-600/30 selection:text-cyan-300"
        >
          {/* Sticky Navigation Bar */}
          <Navbar
            activeSection={activeSection}
            onNavigate={handleNavigate}
            onOpenAdmin={openAdminMode}
          />

          {/* Main Content Sections */}
          <main className="flex-1">
            <Hero
              onExploreWork={() => handleNavigate('projects')}
              onContactMe={() => handleNavigate('contact')}
              onOpenSocialPlaceholder={handleOpenSocialPlaceholder}
            />

            <About />

            <Skills />

            <Projects />

            <Services onSelectService={handleSelectService} />

            <Contact preselectedService={selectedServiceForContact} />
          </main>

          {/* Footer */}
          <Footer
            onNavigate={handleNavigate}
            onOpenSocialPlaceholder={handleOpenSocialPlaceholder}
            onOpenAdmin={openAdminMode}
          />

          {/* Back to top floating button */}
          <BackToTop />

          {/* Social Placeholder Explanation Modal */}
          <SocialPlaceholderModal
            isOpen={!!socialModalData}
            onClose={() => setSocialModalData(null)}
            data={socialModalData}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PortfolioDataProvider>
        <MainApp />
      </PortfolioDataProvider>
    </AuthProvider>
  );
}
