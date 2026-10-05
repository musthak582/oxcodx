export const roleTeams = ["All", "Engineering", "Design", "Operations", "Growth"] as const;
export type RoleTeamFilter = (typeof roleTeams)[number];

export type Role = {
  id: string;
  title: string;
  team: Exclude<RoleTeamFilter, "All">;
  type: "Full-time" | "Part-time" | "Internship" | "Contract";
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

// PLACEHOLDER roles. Replace with your real openings (or empty the array
// to show the "no open roles" message).
export const roles: Role[] = [
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    team: "Engineering",
    type: "Full-time",
    summary: "Build fast, polished interfaces for client products using React and Next.js.",
    responsibilities: [
      "Turn designs into responsive, accessible interfaces",
      "Build reusable components and keep them consistent",
      "Work closely with designers and backend engineers",
    ],
    requirements: [
      "Solid experience with React and TypeScript",
      "Care for performance and detail",
      "Comfortable with Git and code review",
    ],
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer",
    team: "Engineering",
    type: "Full-time",
    summary: "Design and build the APIs and data systems that power our clients' software.",
    responsibilities: [
      "Design and build secure, well-tested APIs",
      "Model data and keep systems reliable",
      "Support deployments and monitoring",
    ],
    requirements: [
      "Experience with Node.js or Python",
      "Working knowledge of SQL or NoSQL databases",
      "Clear communication and problem-solving",
    ],
  },
  {
    id: "engineering-intern",
    title: "Software Engineering Intern",
    team: "Engineering",
    type: "Internship",
    summary: "Learn on real projects alongside experienced engineers.",
    responsibilities: [
      "Contribute to real client and internal projects",
      "Pair with mentors on code and design decisions",
      "Learn our tools and workflow",
    ],
    requirements: [
      "Basic knowledge of web development",
      "Curiosity and willingness to learn quickly",
      "Projects or coursework to show",
    ],
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    team: "Design",
    type: "Full-time",
    summary: "Shape how our products look, feel and work for real users.",
    responsibilities: [
      "Create wireframes, prototypes and polished UI in Figma",
      "Run lightweight user research and testing",
      "Maintain and grow our design system",
    ],
    requirements: [
      "A portfolio showing product and visual design work",
      "Strong eye for typography, spacing and detail",
      "Comfortable working with engineers",
    ],
  },
  {
    id: "project-manager",
    title: "Project Manager",
    team: "Operations",
    type: "Full-time",
    summary: "Keep projects clear, on time and on budget while clients stay confident.",
    responsibilities: [
      "Plan sprints and track delivery",
      "Be the clear point of contact for clients",
      "Spot risks early and unblock the team",
    ],
    requirements: [
      "Experience coordinating software projects",
      "Excellent written and spoken communication",
      "Organised, calm and proactive",
    ],
  },
  {
    id: "training-instructor",
    title: "Training Instructor",
    team: "Growth",
    type: "Part-time",
    summary: "Teach our courses and help the next generation of developers grow.",
    responsibilities: [
      "Deliver live and in-person classes",
      "Review student projects and give feedback",
      "Help improve course material",
    ],
    requirements: [
      "Strong practical experience in software development",
      "Enjoy explaining ideas clearly",
      "Patience and encouragement",
    ],
  },
];