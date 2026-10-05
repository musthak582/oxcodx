import {
  Compass,
  Code2,
  Palette,
  ClipboardList,
  TrendingUp,
  LayoutDashboard,
  Server,
  Smartphone,
  Cloud,
  Search,
  PenTool,
  KanbanSquare,
  ShieldCheck,
  LifeBuoy,
  Handshake,
  Megaphone,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

export type OrgNode = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  children?: OrgNode[];
};

export const org: OrgNode = {
  id: "leadership",
  title: "Leadership",
  description: "Vision, strategy and client partnerships.",
  icon: Compass,
  children: [
    {
      id: "engineering",
      title: "Engineering",
      description: "Builds and ships the products.",
      icon: Code2,
      children: [
        { id: "frontend", title: "Frontend", description: "Web interfaces and experiences.", icon: LayoutDashboard },
        { id: "backend", title: "Backend", description: "APIs, data and business logic.", icon: Server },
        { id: "mobile", title: "Mobile", description: "iOS and Android apps.", icon: Smartphone },
        { id: "devops", title: "DevOps", description: "Cloud, pipelines and uptime.", icon: Cloud },
      ],
    },
    {
      id: "design",
      title: "Design",
      description: "Shapes how products look and feel.",
      icon: Palette,
      children: [
        { id: "ux-research", title: "UX Research", description: "Understands users and their needs.", icon: Search },
        { id: "ui-design", title: "UI Design", description: "Visual design and design systems.", icon: PenTool },
      ],
    },
    {
      id: "operations",
      title: "Operations",
      description: "Keeps delivery smooth and reliable.",
      icon: ClipboardList,
      children: [
        { id: "project-management", title: "Project Management", description: "Plans and tracks every sprint.", icon: KanbanSquare },
        { id: "quality-assurance", title: "Quality Assurance", description: "Tests before anything ships.", icon: ShieldCheck },
        { id: "support", title: "Support", description: "Helps clients after launch.", icon: LifeBuoy },
      ],
    },
    {
      id: "growth",
      title: "Growth",
      description: "Connects OxCodx with the world.",
      icon: TrendingUp,
      children: [
        { id: "business-development", title: "Business Development", description: "Builds client relationships.", icon: Handshake },
        { id: "marketing", title: "Marketing", description: "Tells the OxCodx story.", icon: Megaphone },
        { id: "training", title: "Training", description: "Runs our courses and programs.", icon: GraduationCap },
      ],
    },
  ],
};