import { Globe, Smartphone, Cloud, type LucideIcon } from "lucide-react";

export const courseFormats = ["All", "Live online", "Recorded", "In-person"] as const;
export type CourseFormatFilter = (typeof courseFormats)[number];
export type CourseFormat = Exclude<CourseFormatFilter, "All">;
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export type Course = {
  id: string;
  title: string;
  description: string;
  format: CourseFormat;
  level: CourseLevel;
  duration: string;
  techIds: string[]; // ids from data/tech-stack.ts
};

// PLACEHOLDER courses. Replace with your real catalogue.
export const courses: Course[] = [
  {
    id: "nextjs",
    title: "Web Development with Next.js",
    description:
      "Build fast, modern websites and web apps with React, TypeScript and Next.js.",
    format: "Live online",
    level: "Intermediate",
    duration: "8 weeks",
    techIds: ["nextjs", "react", "typescript"],
  },
  {
    id: "fullstack-js",
    title: "Full-Stack JavaScript",
    description:
      "Go from front end to back end: APIs, databases and deployment, end to end.",
    format: "In-person",
    level: "Intermediate",
    duration: "12 weeks",
    techIds: ["react", "nodejs", "mongodb"],
  },
  {
    id: "python-automation",
    title: "Python for Automation",
    description:
      "Learn Python from scratch and automate the repetitive work in your day.",
    format: "Recorded",
    level: "Beginner",
    duration: "6 weeks",
    techIds: ["python"],
  },
  {
    id: "flutter",
    title: "Mobile Apps with Flutter",
    description:
      "Design and ship iOS and Android apps from a single codebase.",
    format: "Live online",
    level: "Intermediate",
    duration: "10 weeks",
    techIds: ["flutter"],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Essentials",
    description:
      "Containers, pipelines and cloud basics: ship software the way modern teams do.",
    format: "Recorded",
    level: "Intermediate",
    duration: "8 weeks",
    techIds: ["docker", "kubernetes", "github-actions"],
  },
  {
    id: "uiux",
    title: "UI/UX Design Fundamentals",
    description:
      "Learn user research, wireframing and visual design, and prototype in Figma.",
    format: "In-person",
    level: "Beginner",
    duration: "6 weeks",
    techIds: ["figma"],
  },
];

export const getCourse = (id: string) => courses.find((c) => c.id === id)!;

export type LearningPath = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  courseIds: string[];
  outcome: string;
};

export const learningPaths: LearningPath[] = [
  {
    id: "web",
    title: "Web Developer",
    description: "From design basics to building complete web products.",
    icon: Globe,
    courseIds: ["uiux", "nextjs", "fullstack-js"],
    outcome: "Ready for junior full-stack roles",
  },
  {
    id: "mobile",
    title: "Mobile Developer",
    description: "Design and build apps people use every day.",
    icon: Smartphone,
    courseIds: ["uiux", "flutter"],
    outcome: "Ready to build and publish mobile apps",
  },
  {
    id: "cloud",
    title: "Cloud Engineer",
    description: "Automate, containerise and run software at scale.",
    icon: Cloud,
    courseIds: ["python-automation", "cloud-devops"],
    outcome: "Ready for DevOps and cloud roles",
  },
];