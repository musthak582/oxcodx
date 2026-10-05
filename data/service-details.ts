export type ServiceDetail = {
  id: string;
  features: string[];
  outcome: string;
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "Custom Software": {
    id: "custom-software",
    features: [
      "Internal tools, portals and enterprise platforms",
      "API design and third-party integrations",
      "Scalable architecture ready for growth",
      "Full source code ownership",
    ],
    outcome: "Software that fits your process, not the other way around.",
  },
  "Web Development": {
    id: "web-development",
    features: [
      "Marketing sites, web apps and e-commerce",
      "Blazing-fast performance and SEO built in",
      "Secure, accessible and responsive by default",
      "CMS and admin dashboards you can manage",
    ],
    outcome: "A website that looks premium and converts visitors.",
  },
  "Mobile Apps": {
    id: "mobile-apps",
    features: [
      "iOS and Android from a single codebase",
      "Native performance and smooth animations",
      "Push notifications, payments and offline mode",
      "App Store and Play Store launch support",
    ],
    outcome: "Apps your users love to open every day.",
  },
  "Cloud & DevOps": {
    id: "cloud-devops",
    features: [
      "Cloud setup and migration on AWS and more",
      "CI/CD pipelines for fast, safe releases",
      "Containers, monitoring and alerting",
      "Cost and security optimization",
    ],
    outcome: "Ship faster and sleep better with reliable infrastructure.",
  },
  "UI/UX Design": {
    id: "ui-ux-design",
    features: [
      "User research and journey mapping",
      "Wireframes and interactive prototypes",
      "Design systems for consistency at scale",
      "Usability testing before development",
    ],
    outcome: "Interfaces that make complex products feel simple.",
  },
  "Business Automation": {
    id: "business-automation",
    features: [
      "Workflow automation across your tools",
      "Custom integrations and data pipelines",
      "Automated reporting and notifications",
      "AI-assisted processes where they help",
    ],
    outcome: "Hours of manual work replaced by systems that run themselves.",
  },
};