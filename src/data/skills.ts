export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    skills: ["Java", "Kotlin", "C"],
  },
  {
    title: "System Design",
    skills: ["High-Level Design (HLD)", "Low-Level Design (LLD)", "Design Patterns", "SOLID", "Scalability", "Distributed Systems"],
  },
  {
    title: "Computer Science Foundations",
    skills: ["Data Structures & Algorithms", "Object-Oriented Programming", "Computer Networks", "DBMS", "Operating Systems"],
  },
  {
    title: "Competitive Programming",
    skills: ["CodeChef · 3★"],
  },
];
