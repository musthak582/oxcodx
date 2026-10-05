export type TechGroup = {
  category: string;
  items: string[];
};

export const technologies: TechGroup[] = [
  { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "MongoDB"] },
  { category: "Mobile", items: ["React Native", "Flutter", "Swift", "Kotlin"] },
  { category: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "GitHub Actions"] },
];