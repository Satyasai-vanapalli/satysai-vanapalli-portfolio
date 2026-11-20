export interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
}

export const achievements: Achievement[] = [
  {
    id: "jee-mains-2023", // Assuming 2023 based on grad year 2027
    title: "JEE Mains 91.7 Percentile",
    date: "2023",
    description: "Secured 91.7 percentile in the highly competitive Joint Entrance Examination (Main).",
  },
];
