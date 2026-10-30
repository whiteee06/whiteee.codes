import { SkillItem, ProjectItem, ServiceItem, SocialLink } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'NITHIARASU G.',
  shortName: 'Nithiarasu',
  brandName: 'WHITEe.CODES',
  brandTagline: 'LEARN • BUILD • CREATE',
  logoUrl: '/assets/aistudio/file_000000001f6c8211befe6a4b841901f9_a2366e14.png',
  title: 'AI & Data Science Student | Vibe Coder',
  tagline: 'Turning ideas into digital experiences with AI, creativity and code.',
  shortBio:
    'Passionate about artificial intelligence, web development, creative problem-solving, and building useful digital products with AI-assisted development. Blending logical data science foundations with rapid vibe coding to bring modern web interfaces to life.',
  status: 'Open for Freelance & Collaborative Projects',
  location: 'Tamil Nadu, India (Available Globally / Remote)',
  email: 'nithiarasu248@gmail.com',
  phone: '9952281794',
  phoneFormatted: '+91 99522 81794',
  whatsappUrl: 'https://wa.me/919952281794',
  githubPlaceholder: 'https://github.com/nithiarasu-placeholder',
  linkedinPlaceholder: 'https://linkedin.com/in/nithiarasu-placeholder',
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    url: 'https://wa.me/919952281794',
    icon: 'MessageSquare',
    isPlaceholder: false,
    placeholderHint: 'Direct WhatsApp Chat: +91 99522 81794',
  },
  {
    id: 'phone',
    name: 'Call Phone',
    url: 'tel:+919952281794',
    icon: 'Phone',
    isPlaceholder: false,
    placeholderHint: 'Direct Mobile: +91 99522 81794',
  },
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:nithiarasu248@gmail.com',
    icon: 'Mail',
    isPlaceholder: false,
    placeholderHint: 'Primary contact email: nithiarasu248@gmail.com',
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/nithiarasu-placeholder',
    icon: 'Github',
    isPlaceholder: true,
    placeholderHint: 'Replace with your GitHub profile link',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/nithiarasu-placeholder',
    icon: 'Linkedin',
    isPlaceholder: true,
    placeholderHint: 'Replace with your LinkedIn profile link',
  },
];

export const INITIAL_SKILLS: SkillItem[] = [
  {
    id: 'skill-ai',
    name: 'Artificial Intelligence',
    category: 'ai',
    description: 'Core concepts in machine learning, neural networks, pattern recognition, and data-driven intelligence.',
    icon: 'Brain',
    badge: 'Core Focus',
  },
  {
    id: 'skill-genai',
    name: 'Generative AI',
    category: 'ai',
    description: 'Harnessing modern multimodal LLMs, diffusion models, and contextual embeddings for intelligent app workflows.',
    icon: 'Sparkles',
    badge: 'Cutting Edge',
  },
  {
    id: 'skill-prompting',
    name: 'Prompt Engineering',
    category: 'ai',
    description: 'System instruction architecture, few-shot prompting, structured JSON schema outputs, and chain-of-thought orchestration.',
    icon: 'Terminal',
    badge: 'Specialized',
  },
  {
    id: 'skill-vibe-coding',
    name: 'Vibe Coding',
    category: 'workflow',
    description: 'Intuitive, AI-augmented rapid prototyping and development—turning natural language ideas into production-ready software with flow state speed.',
    icon: 'Zap',
    badge: 'Philosophy',
  },
  {
    id: 'skill-web-core',
    name: 'HTML, CSS and JavaScript',
    category: 'dev',
    description: 'Fundamental modern web standards, semantic HTML5, responsive CSS grid/flexbox, ESNext syntax, and DOM manipulation.',
    icon: 'Code2',
    badge: 'Foundation',
  },
  {
    id: 'skill-python',
    name: 'Python',
    category: 'dev',
    description: 'Primary programming language for data science, algorithmic problem solving, machine learning scripting, and automation.',
    icon: 'FileCode2',
    badge: 'Data Science',
  },
  {
    id: 'skill-react',
    name: 'React',
    category: 'dev',
    description: 'Component-driven frontends, custom hooks, reactive state management, Tailwind CSS integration, and modern SPA architecture.',
    icon: 'Layers',
    badge: 'Frontend',
  },
  {
    id: 'skill-github',
    name: 'GitHub',
    category: 'workflow',
    description: 'Git version control, collaborative workflows, repo architecture, branch management, and open-source exploration.',
    icon: 'GitBranch',
    badge: 'Version Control',
  },
  {
    id: 'skill-ai-studio',
    name: 'Google AI Studio',
    category: 'workflow',
    description: 'Prototyping generative prompts, experimenting with state-of-the-art Gemini models, testing system prompts, and AI application development.',
    icon: 'Cpu',
    badge: 'AI Workbench',
  },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'pocketsmart-ai',
    title: 'PocketSmart AI',
    tagline: 'AI-Powered Budget & Smart Recommendation Assistant',
    description:
      'An AI-powered budget and recommendation assistant designed to help users explore personalized suggestions within their budget. Provides smart financial clarity and contextual purchase guidance with modern UX.',
    tags: ['Artificial Intelligence', 'Smart Budgeting', 'React', 'AI Recommendations'],
    liveUrl: 'https://fintracker-expenseve-tracker.lovable.app/dashboard',
    status: 'Live Demo',
    keyFeatures: [
      'Interactive budget planning with dynamic expense categorization',
      'Contextual AI recommendations aligned with user financial constraints',
      'Clean, real-time dashboard layout with instant calculation feedback',
      'Responsive interface crafted for seamless mobile and desktop usage',
    ],
    techStack: ['React', 'AI Modeling / Rules', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    id: 'coming-soon-lab',
    title: 'More Projects Coming Soon',
    tagline: 'Creative Experiments & AI-Powered Products In Development',
    description:
      'New creative experiments and AI-powered projects are in progress. Exploring autonomous agent interactions, intelligent web tools, and data-driven visual interfaces.',
    tags: ['Generative AI', 'Vibe Coding', 'Data Science', 'In The Lab'],
    status: 'In Progress',
    isUpcoming: true,
    keyFeatures: [
      'Exploration of multimodal interfaces and agentic workflows',
      'Micro-SaaS and small business digital tools powered by AI',
      'Interactive web simulations blending data science and UI craft',
    ],
    techStack: ['Python', 'React', 'Google AI Studio', 'Tailwind CSS'],
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'small-business',
    title: 'Small Business Website Development',
    description:
      'Tailored, high-converting digital storefronts and company websites that build credibility, highlight your products, and turn local visitors into loyal clients.',
    icon: 'Store',
    timeline: '1 - 2 Weeks',
    highlights: [
      'Mobile-first responsive architecture',
      'Fast loading speeds & SEO best practices',
      'Clear call-to-actions & WhatsApp / inquiry integration',
      'Clean code with zero unnecessary bloat',
    ],
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio Websites',
    description:
      'Distinctive personal brands and portfolios for developers, creatives, founders, and students wanting to showcase their skills, work, and personality.',
    icon: 'UserCheck',
    timeline: '3 - 7 Days',
    highlights: [
      'Custom dark or light aesthetic styling',
      'Interactive project showcases & skill highlights',
      'Responsive contact mechanisms & resume integration',
      'Smooth micro-interactions & high visual hierarchy',
    ],
  },
  {
    id: 'landing-page',
    title: 'Landing Page Design',
    description:
      'Laser-focused, engaging landing pages designed for product launches, events, newsletters, or digital services that prioritize conversion and storytelling.',
    icon: 'LayoutTemplate',
    timeline: '3 - 5 Days',
    highlights: [
      'Clear value propositions & sticky CTAs',
      'Visually compelling hero sections & feature grids',
      'Social proof & testimonial layouts',
      'Optimized performance across all screen sizes',
    ],
  },
  {
    id: 'ui-design',
    title: 'Website UI Design',
    description:
      'Clean, contemporary interface layouts with deliberate typography, high contrast, balanced whitespace, and purposeful micro-interactions.',
    icon: 'Palette',
    timeline: '3 - 6 Days',
    highlights: [
      'Modern glassmorphic or minimalist aesthetic systems',
      'Color palettes designed for accessibility & contrast',
      'Modular component hierarchies and design tokens',
      'Interactive prototypes and wireframes ready for code',
    ],
  },
];
