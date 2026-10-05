import {
  Code2,
  Globe,
  Smartphone,
  Cloud,
  Palette,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: "Custom Software",
    description:
      "Tailor-made applications built around your processes, designed to scale with your business.",
    icon: Code2,
  },
  {
    title: "Web Development",
    description:
      "Fast, secure and beautiful websites and web platforms built with modern frameworks.",
    icon: Globe,
  },
  {
    title: "Mobile Apps",
    description:
      "Polished iOS and Android apps that your users will love to open every day.",
    icon: Smartphone,
  },
  {
    title: "Cloud & DevOps",
    description:
      "Reliable cloud infrastructure, CI/CD pipelines and monitoring so you can ship with confidence.",
    icon: Cloud,
  },
  {
    title: "UI/UX Design",
    description:
      "Research-driven interfaces that look premium and make complex products feel simple.",
    icon: Palette,
  },
  {
    title: "Business Automation",
    description:
      "Replace repetitive manual work with smart workflows and integrations that save hours.",
    icon: Workflow,
  },
];