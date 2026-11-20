export interface Project {
  id: string;
  title: string;
  description: string;
  visual: "system-design" | "dsa-practice";
  coverLabel: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "system-design",
    title: "System Design",
    description: "A collection of system design notes covering HLD, LLD, design patterns, and scalable architecture.",
    visual: "system-design",
    coverLabel: "HLD / LLD / PATTERNS",
    techStack: ["System Design", "HLD", "LLD", "Design Patterns"],
    liveUrl: "https://satyasai-vanapalli.github.io/System-Design/",
  },
  {
    id: "dsa-practice-sheet",
    title: "DSA Practice Sheet",
    description: "A structured practice roadmap for data structures and algorithms, with curated topics and problems.",
    visual: "dsa-practice",
    coverLabel: "ALGORITHMS / PRACTICE",
    techStack: ["Data Structures & Algorithms", "Practice", "Problem Solving"],
    liveUrl: "https://dsa-ag.vercel.app/",
  },
];
