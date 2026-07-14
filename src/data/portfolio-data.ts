import {
  Activity,
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

const zipdrop = getProjectImages('ZipDrop');
const skillLab = getProjectImages('SkillLab');
const prvaas = getProjectImages('Prvaas');
const ozonevets = getProjectImages('OzoneVets');
const labbdhi = getProjectImages("Labbdhi Tutorial's");
const constituency = getProjectImages('Constituency Development Platform');
const chronocancer = getProjectImages('ChronoCancer AI');

export const projects: Project[] = [
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
  {
    title: 'Constituency Development Platform',
    subtitle: 'AI-Powered Civic Planning Platform',
    description:
      'An AI-powered platform for constituency planning, citizen grievance management, multilingual support, geospatial insights, and data-driven development.',
    tech: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'FastAPI',
      'Python',
      'SQLAlchemy',
      'SQLite',
      'Sarvam AI',
      'REST APIs',
      'Render',
      'Vercel',
    ],
    github: 'https://github.com/Ved1030',
    live: 'https://constituency-development-platform.vercel.app/',
    image: constituency.thumbnail,
    thumbnail: constituency.thumbnail,
    images: constituency.images,
    color: '#60A5FA',
    colorRgb: '96,165,250',
    icon: Activity,
    category: 'Full Stack',
  },
  {
    title: 'ZipDrop',
    subtitle: 'Intelligent File Sharing Platform',
    description:
      'A fast, secure file-sharing platform with drag-and-drop uploads, instant sharing via codes, and encrypted transfers for seamless collaboration.',
    tech: ['Next.js', 'Node.js', 'Supabase', 'Tailwind CSS'],
    github: 'https://github.com/Ved1030',
    live: 'https://zip-drop.vercel.app/',
    image: zipdrop.thumbnail,
    thumbnail: zipdrop.thumbnail,
    images: zipdrop.images,
    color: '#60A5FA',
    colorRgb: '96,165,250',
    icon: Zap,
    category: 'Full Stack',
  },
  {
    title: 'SkillLab',
    subtitle: 'Skill Assessment & Learning Platform',
    description:
      'An interactive platform for evaluating technical skills through adaptive quizzes, personalized learning paths, and real-time progress tracking.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    github: 'https://github.com/Ved1030',
    live: 'https://skilllab-three.vercel.app/',
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
    live: 'https://pravaasin.vercel.app/',
    image: prvaas.thumbnail,
    thumbnail: prvaas.thumbnail,
    images: prvaas.images,
    color: '#4FD1C5',
    colorRgb: '79,209,197',
    icon: Code2,
    category: 'Travel',
  },
  {
    title: 'OzoneVets',
    subtitle: 'Veterinary Management System',
    description:
      'A full-stack clinic management platform for booking appointments, managing pet records, and streamlining veterinary workflows.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/Ved1030',
    live: 'https://ozonevets.vercel.app/',
    image: ozonevets.thumbnail,
    thumbnail: ozonevets.thumbnail,
    images: ozonevets.images,
    color: '#34D399',
    colorRgb: '52,211,153',
    icon: Stethoscope,
    category: 'Healthcare',
  },
  {
    title: "Labbdhi Tutorial's",
    subtitle: 'EdTech Learning Platform',
    description:
      'An online education platform with live class integration, course management, student dashboards, and progress analytics.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Supabase'],
    github: 'https://github.com/Ved1030',
    live: 'https://class-institute.vercel.app/',
    image: labbdhi.thumbnail,
    thumbnail: labbdhi.thumbnail,
    images: labbdhi.images,
    color: '#F4C542',
    colorRgb: '244,197,66',
    icon: Crown,
    category: 'Education',
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

export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];
