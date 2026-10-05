import {
  siNextdotjs,
  siReact,
  siTypescript,
  siTailwindcss,
  siNodedotjs,
  siPython,
  siPostgresql,
  siMongodb,
  siRedis,
  siFlutter,
  siSwift,
  siKotlin,
  siDocker,
  siKubernetes,
  siGithubactions,
  siFigma,
  type SimpleIcon,
} from "simple-icons";
import { Cloud, Smartphone, type LucideIcon } from "lucide-react";

export const categories = [
  "All",
  "Frontend & Design",
  "Backend",
  "Database",
  "Mobile",
  "Cloud & DevOps",
] as const;

export type Category = (typeof categories)[number];

export type Tech = {
  id: string;
  name: string;
  category: Exclude<Category, "All">;
  description: string;
  icon?: SimpleIcon;
  fallback?: LucideIcon; // used when a brand is not in Simple Icons
  color?: string; // override brand color (hex with #)
};

export const techStack: Tech[] = [
  { id: "nextjs", name: "Next.js", category: "Frontend & Design", description: "Full-stack React framework for fast, SEO-friendly web apps.", icon: siNextdotjs },
  { id: "react", name: "React", category: "Frontend & Design", description: "Component-driven interfaces that scale with your product.", icon: siReact },
  { id: "typescript", name: "TypeScript", category: "Frontend & Design", description: "Type safety that catches bugs before users do.", icon: siTypescript },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend & Design", description: "Consistent, maintainable styling with a design-token approach.", icon: siTailwindcss },
  { id: "figma", name: "Figma", category: "Frontend & Design", description: "Design, prototype and hand off with the whole team in one place.", icon: siFigma },

  { id: "nodejs", name: "Node.js", category: "Backend", description: "Fast, scalable APIs and real-time services.", icon: siNodedotjs },
  { id: "python", name: "Python", category: "Backend", description: "Data processing, automation and AI-powered features.", icon: siPython },

  { id: "postgresql", name: "PostgreSQL", category: "Database", description: "Reliable relational data with powerful querying.", icon: siPostgresql },
  { id: "mongodb", name: "MongoDB", category: "Database", description: "Flexible document storage for fast-moving products.", icon: siMongodb },
  { id: "redis", name: "Redis", category: "Database", description: "In-memory caching and queues for instant responses.", icon: siRedis },

  { id: "react-native", name: "React Native", category: "Mobile", description: "iOS and Android apps from one shared codebase.", fallback: Smartphone, color: "#61DAFB" },
  { id: "flutter", name: "Flutter", category: "Mobile", description: "Beautiful, high-performance cross-platform apps.", icon: siFlutter },
  { id: "swift", name: "Swift", category: "Mobile", description: "Native iOS apps with top-tier performance.", icon: siSwift },
  { id: "kotlin", name: "Kotlin", category: "Mobile", description: "Modern, native Android development.", icon: siKotlin },

  { id: "aws", name: "AWS", category: "Cloud & DevOps", description: "Secure, scalable cloud infrastructure.", fallback: Cloud, color: "#FF9900" },
  { id: "docker", name: "Docker", category: "Cloud & DevOps", description: "Consistent environments from laptop to production.", icon: siDocker },
  { id: "kubernetes", name: "Kubernetes", category: "Cloud & DevOps", description: "Orchestration for systems that must never go down.", icon: siKubernetes },
  { id: "github-actions", name: "GitHub Actions", category: "Cloud & DevOps", description: "Automated testing and deployment on every push.", icon: siGithubactions },
];

export const getTech = (id: string) => techStack.find((t) => t.id === id)!;

export const techColor = (t: Tech) =>
  t.color ?? (t.icon ? `#${t.icon.hex}` : "#2563eb");