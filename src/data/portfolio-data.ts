import {
  Brain,
  Activity,
  TrendingUp,
  Smartphone,
  Code2,
  GraduationCap,
  Stethoscope,
  Crown,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { projectImages } from './image-manifest';

export const profile = {
  name: 'Ved Mehta',
  firstName: 'Ved',
  lastName: 'Mehta',
  title: 'AI Engineer & Full Stack Developer',
  roles: [
    'AI Engineer',
    'Full Stack Developer',
    'Software Developer',
    'ML Enthusiast',
    'Flutter Developer',
  ],
  email: 'mehtaved12@gmail.com',
  github: 'https://github.com/Ved1030',
  linkedin: 'https://www.linkedin.com/in/ved140609/',
  location: 'Mumbai, India',
  resume:
    'https://drive.google.com/file/d/12Durb2_hEM7iRXJ6qWjWBktZi4bPVZjn/view?usp=sharing',
  photo: '/images/ved_image.jpeg',
  bio: 'Second-year B.Tech IT student specializing in AI-powered multimodal applications. Passionate about building intelligent systems that solve real-world problems using scalable software and cutting-edge machine learning.',
  tagline: 'Building intelligent systems & scalable software.',
};

export const stats = [
  { label: 'Projects Built', value: 9, suffix: '+', color: '#22D3EE' },
  { label: 'Technologies', value: 15, suffix: '+', color: '#60A5FA' },
  { label: 'Hackathons', value: 3, suffix: '', color: '#F4C542' },
  { label: 'GPA', value: 8.5, suffix: '', color: '#7DD3A6' },
];

export const techStack = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#FFFFFF' },
  { name: 'Python', color: '#3776AB' },
  { name: 'Node.js', color: '#339933' },
  { name: 'AI/ML', color: '#A855F7' },
  { name: 'Flutter', color: '#02569B' },
];

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string | null;
  thumbnail: string | null;
  images: string[];
  color: string;
  colorRgb: string;
  icon: LucideIcon;
  category: string;
}

// Helper to get images from manifest, with fallback
function getProjectImages(title: string) {
  const entry = projectImages[title];
  if (entry && entry.thumbnail) {
    return { thumbnail: entry.thumbnail, images: entry.images };
  }
  return { thumbnail: null, images: [] };
}

const trustWealth = getProjectImages('TrustWealth AI');
const zipdrop = getProjectImages('ZipDrop');
const aura = getProjectImages('AURA');
const skillLab = getProjectImages('SkillLab');
const prvaas = getProjectImages('Prvaas');
const constituency = getProjectImages('Constituency Dev Platform');
const petClinic = getProjectImages('Pet Clinic');
const nobleClasses = getProjectImages('Noble Classes');
const chronocancer = getProjectImages('ChronoCancer AI');

export const projects: Project[] = [
  {
    title: 'TrustWealth AI',
    subtitle: 'Explainable AI Portfolio Management',
    description:
      'An investment platform providing AI recommendations based on sentiment analysis, risk modeling, and real-time portfolio analytics with XAI for complete transparency.',
    tech: ['Python', 'FastAPI', 'Next.js', 'Machine Learning', 'XAI'],
    github: 'https://github.com/Ved1030',
    live: '#',
    image: trustWealth.thumbnail,
    thumbnail: trustWealth.thumbnail,
    images: trustWealth.images,
    color: '#F4C542',
    colorRgb: '244,197,66',
    icon: TrendingUp,
    category: 'Finance',
  },
  {
    title: 'ZipDrop',
    subtitle: 'Intelligent File Sharing Platform',
    description:
      'A fast, secure file-sharing platform with drag-and-drop uploads, instant sharing via codes, and encrypted transfers for seamless collaboration.',
    tech: ['Next.js', 'Node.js', 'Supabase', 'Tailwind CSS'],
    github: 'https://github.com/Ved1030',
    live: '#',
    image: zipdrop.thumbnail,
    thumbnail: zipdrop.thumbnail,
    images: zipdrop.images,
    color: '#60A5FA',
    colorRgb: '96,165,250',
    icon: Zap,
    category: 'Full Stack',
  },
  {
    title: 'AURA',
    subtitle: 'AI Mental Wellness Assistant',
    description:
      'A comprehensive multimodal assistant detecting emotions from facial expressions, voice, and text using CNNs and Transformers with real-time insights and multilingual support.',
    tech: ['Python', 'FastAPI', 'CNN', 'Whisper', 'Transformers', 'Next.js'],
    github: 'https://github.com/Ved1030',
    live: '#',
    image: aura.thumbnail,
    thumbnail: aura.thumbnail,
    images: aura.images,
    color: '#22D3EE',
    colorRgb: '34,211,238',
    icon: Brain,
    category: 'AI',
  },
  {
    title: 'SkillLab',
    subtitle: 'Skill Assessment & Learning Platform',
    description:
      'An interactive platform for evaluating technical skills through adaptive quizzes, personalized learning paths, and real-time progress tracking.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    github: 'https://github.com/Ved1030',
    live: '#',
    image: skillLab.thumbnail,
    thumbnail: skillLab.thumbnail,
    images: skillLab.images,
    color: '#F4C542',
    colorRgb: '244,197,66',
    icon: GraduationCap,
    category: 'Education',
  },
  {
    title: 'Prvaas',
    subtitle: 'Smart Travel Companion',
    description:
      'An AI-powered travel planning app with intelligent route suggestions, real-time trip management, and personalized travel recommendations.',
    tech: ['Flutter', 'Python', 'Firebase', 'Google Maps API'],
    github: 'https://github.com/Ved1030',
    live: '#',
    image: prvaas.thumbnail,
    thumbnail: prvaas.thumbnail,
    images: prvaas.images,
    color: '#4FD1C5',
    colorRgb: '79,209,197',
    icon: Code2,
    category: 'Travel',
  },
  {
    title: 'Constituency Dev Platform',
    subtitle: 'Civic Tech Data Dashboard',
    description:
      'A data-driven platform for tracking and analyzing constituency development projects, budget allocations, and public welfare metrics.',
    tech: ['React', 'Django', 'PostgreSQL', 'Chart.js'],
    github: 'https://github.com/Ved1030',
    live: '#',
    image: constituency.thumbnail,
    thumbnail: constituency.thumbnail,
    images: constituency.images,
    color: '#60A5FA',
    colorRgb: '96,165,250',
    icon: Activity,
    category: 'Full Stack',
  },
  {
    title: 'Pet Clinic',
    subtitle: 'Veterinary Management System',
    description:
      'A full-stack clinic management platform for booking appointments, managing pet records, and streamlining veterinary workflows.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/Ved1030',
    live: '#',
    image: petClinic.thumbnail,
    thumbnail: petClinic.thumbnail,
    images: petClinic.images,
    color: '#34D399',
    colorRgb: '52,211,153',
    icon: Stethoscope,
    category: 'Healthcare',
  },
  {
    title: 'Noble Classes',
    subtitle: 'EdTech Learning Platform',
    description:
      'An online education platform with live class integration, course management, student dashboards, and progress analytics.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Supabase'],
    github: 'https://github.com/Ved1030',
    live: '#',
    image: nobleClasses.thumbnail,
    thumbnail: nobleClasses.thumbnail,
    images: nobleClasses.images,
    color: '#F4C542',
    colorRgb: '244,197,66',
    icon: Crown,
    category: 'Education',
  },
  {
    title: 'ChronoCancer AI',
    subtitle: 'AI Cancer Risk Assessment',
    description:
      'An agentic AI decision system with explainable AI visualizations for cancer risk prediction and screening, built as a mobile application.',
    tech: ['Flutter', 'Python', 'Explainable AI', 'Agentic AI'],
    github: 'https://github.com/Ved1030',
    live: '#',
    image: chronocancer.thumbnail,
    thumbnail: chronocancer.thumbnail,
    images: chronocancer.images,
    color: '#22D3EE',
    colorRgb: '34,211,238',
    icon: Smartphone,
    category: 'AI',
  },
];

export const skillCategories = [
  {
    title: 'Programming Languages',
    color: '#22D3EE',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 88 },
      { name: 'Java', level: 75 },
      { name: 'C++', level: 70 },
      { name: 'C', level: 65 },
      { name: 'SQL', level: 80 },
    ],
  },
  {
    title: 'Web Development',
    color: '#60A5FA',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'Node.js', level: 82 },
      { name: 'Express.js', level: 80 },
      { name: 'Django', level: 72 },
      { name: 'Tailwind CSS', level: 92 },
    ],
  },
  {
    title: 'Mobile Development',
    color: '#34D399',
    skills: [
      { name: 'Flutter', level: 78 },
      { name: 'React Native', level: 65 },
    ],
  },
  {
    title: 'AI / Machine Learning',
    color: '#4FD1C5',
    skills: [
      { name: 'TensorFlow', level: 75 },
      { name: 'CNN', level: 80 },
      { name: 'Explainable AI', level: 85 },
      { name: 'Agentic AI', level: 78 },
    ],
  },
  {
    title: 'Tools & Platforms',
    color: '#F4C542',
    skills: [
      { name: 'Git', level: 88 },
      { name: 'GitHub', level: 90 },
      { name: 'MongoDB', level: 78 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'Supabase', level: 70 },
    ],
  },
];

export const experiences = [
  {
    company: 'Tech Solutions Pvt Ltd',
    role: 'Full Stack Web Developer Intern',
    period: '2025 - Present',
    location: 'Mumbai, India',
    description:
      'Building full-stack platforms and integrating enterprise-level solutions for client project management.',
    responsibilities: [
      'Developed ClientSphere Management System for streamlined project management',
      'Built full-stack platform including dashboards and task tracking',
      'Integrated REST APIs and developed secure client data handling systems',
      'Implemented responsive designs with Tailwind CSS and PostgreSQL',
    ],
    tech: ['Next.js', 'React.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  },
];

export const achievements = [
  {
    title: 'CSMIT Hackathon',
    subtitle: '2nd Place Overall | 1st in AI/ML Domain',
    description:
      'Developed AURA, an AI-powered multimodal mental wellness assistant, securing top positions across all domains and the specialized AI/ML track.',
    icon: 'trophy' as const,
    tags: ['AI/ML Winner', 'Second Runner Up'],
    metric: '2nd',
    color: '#F4C542',
    images: projectImages['Achievements']?.images ?? [],
  },
  {
    title: 'CanHack 2026',
    subtitle: 'International Hackathon Selection',
    description:
      'Shortlisted for international selection with ChronoCancer — an AI cancer prediction system using Explainable AI and Agentic AI.',
    icon: 'target' as const,
    tags: ['International Selection', 'XAI / Agentic AI'],
    metric: 'Top',
    color: '#22D3EE',
    images: [],
  },
  {
    title: 'Datathon — Thakur College',
    subtitle: 'Top 5 in Offline Data Competition',
    description:
      'Competing in predictive modeling and analysis without internet access, demonstrating deep statistical knowledge and problem-solving speed.',
    icon: 'medal' as const,
    tags: ['Data Analysis', 'Top 5'],
    metric: '5th',
    color: '#4FD1C5',
    images: [],
  },
];

export const testimonials = [
  {
    name: 'Prof. Ananya Sharma',
    role: 'IT Department, Mumbai University',
    content:
      'Ved demonstrates exceptional problem-solving abilities and a deep understanding of AI systems. His work on explainable AI is impressive for a student at his level.',
    avatar: 'AS',
  },
  {
    name: 'Rohan Patel',
    role: 'Hackathon Teammate',
    content:
      'Working with Ved on AURA was incredible. His ability to architect complex multimodal systems and deliver under tight deadlines is remarkable.',
    avatar: 'RP',
  },
  {
    name: 'Priya Desai',
    role: 'Tech Solutions Pvt Ltd',
    content:
      'Ved brought fresh perspectives to our full-stack development team. His enthusiasm for building scalable systems and attention to code quality stood out.',
    avatar: 'PD',
  },
];

export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];
