export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  isPlaceholder: boolean;
  placeholderHint: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'ai' | 'dev' | 'workflow';
  description: string;
  icon: string;
  badge: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tagline: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  isUpcoming?: boolean;
  status: 'Live Demo' | 'In Progress' | 'Concept';
  keyFeatures?: string[];
  techStack?: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlights: string[];
  timeline: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  service?: string;
  message: string;
}

export interface FormValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}
