import {
  Code2,
  Braces,
  Coffee,
  Hash,
  Terminal,
  Database,
  Globe,
  Server,
  Smartphone,
  GitBranch,
  Bot,
  Brain,
  Network,
  Cpu,
  Layers,
  Wind,
  type LucideIcon,
} from 'lucide-react';

export interface TechIconData {
  icon: LucideIcon;
  color: string;
}

const ICON_MAP: Record<string, TechIconData> = {
  'Python': { icon: Code2, color: '#3776AB' },
  'JavaScript': { icon: Braces, color: '#F7DF1E' },
  'Java': { icon: Coffee, color: '#ED8B00' },
  'C++': { icon: Hash, color: '#00599C' },
  'C': { icon: Terminal, color: '#A8B9CC' },
  'SQL': { icon: Database, color: '#336791' },
  'React.js': { icon: Globe, color: '#61DAFB' },
  'Next.js': { icon: Layers, color: '#FFFFFF' },
  'Node.js': { icon: Server, color: '#339933' },
  'Express.js': { icon: Server, color: '#FFFFFF' },
  'Django': { icon: Globe, color: '#092E20' },
  'Tailwind CSS': { icon: Wind, color: '#06B6D4' },
  'Flutter': { icon: Smartphone, color: '#02569B' },
  'React Native': { icon: Smartphone, color: '#61DAFB' },
  'TensorFlow': { icon: Cpu, color: '#FF6F00' },
  'Git': { icon: GitBranch, color: '#F05032' },
  'GitHub': { icon: GitBranch, color: '#FFFFFF' },
  'MongoDB': { icon: Database, color: '#47A248' },
  'PostgreSQL': { icon: Database, color: '#4169E1' },
  'Supabase': { icon: Database, color: '#3FCF8E' },
  'CNN': { icon: Network, color: '#22D3EE' },
  'Explainable AI': { icon: Brain, color: '#A78BFA' },
  'Agentic AI': { icon: Bot, color: '#34D399' },
};

export function getTechIcon(name: string): TechIconData | null {
  return ICON_MAP[name] ?? null;
}
