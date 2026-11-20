"use client";

import { useQuery } from "@tanstack/react-query";
import { Code2, Database, Layers3, Trophy } from "lucide-react";

type ProfileStats = Record<string, number | string | null | undefined>;

async function fetchStats(url: string): Promise<ProfileStats> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Profile data is unavailable");
  return response.json() as Promise<ProfileStats>;
}

const groups = [
  { number: "01", title: "Programming", icon: Code2, skills: ["Java", "Kotlin", "C"] },
  { number: "02", title: "System design", icon: Layers3, skills: ["HLD", "LLD", "Design Patterns", "SOLID", "Scalability", "Distributed Systems"] },
  { number: "03", title: "CS foundations", icon: Database, skills: ["Data Structures & Algorithms", "OOP", "Computer Networks", "DBMS", "Operating Systems"] },
  { number: "04", title: "Competitive programming", icon: Trophy, skills: ["CodeChef · 3★"] },
];

export default function SkillsSection() {
  const leetcode = useQuery({ queryKey: ["leetcode"], queryFn: () => fetchStats("/api/leetcode"), staleTime: 5 * 60 * 1000 });
  const codeforces = useQuery({ queryKey: ["codeforces"], queryFn: () => fetchStats("/api/codeforces"), staleTime: 5 * 60 * 1000 });
  const codechef = useQuery({ queryKey: ["codechef"], queryFn: () => fetchStats("/api/codechef"), staleTime: 5 * 60 * 1000 });
  const solvedCounts = [leetcode.data?.totalSolved, codeforces.data?.problemsSolved, codechef.data?.problemsSolved];
  const numericSolvedCounts = solvedCounts.filter((count): count is number => typeof count === "number" && Number.isFinite(count));
  const totalSolved = numericSolvedCounts.length === solvedCounts.length
    ? numericSolvedCounts.reduce((total, count) => total + count, 0)
    : null;
  const isLoadingTotal = leetcode.isPending || codeforces.isPending || codechef.isPending;

  return (
    <section id="toolkit" className="section toolkit-section section-anchor">
      <div className="site-container">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">03 / TOOLKIT</p>
            <h2 className="section-title">Core skills &amp; <em>focus.</em></h2>
          </div>
          <p className="section-lede">The computer science foundations and problem-solving areas I’m building depth in.</p>
        </div>

        <div className="toolkit-grid">
          {groups.map(({ number, title, icon: Icon, skills }) => (
            <article className="toolkit-card" key={title}>
              <div className="toolkit-card-top"><span className="toolkit-icon"><Icon size={19} /></span><span className="toolkit-number">{number}</span></div>
              <h3>{title}</h3>
              <div className="skill-chips">
                {skills.map((skill) => <span key={skill}>{skill}</span>)}
                {title === "Competitive programming" && (
                  <>
                    <span>
                      {leetcode.data?.topPercent != null
                        ? `LeetCode · Top ${leetcode.data.topPercent}%`
                        : leetcode.isPending ? "LeetCode · Loading percentile…" : "LeetCode · Percentile unavailable"}
                    </span>
                    <span aria-live="polite">
                      {totalSolved !== null
                        ? `${totalSolved.toLocaleString()} total solved`
                        : isLoadingTotal ? "Loading live total…" : "Live total unavailable"}
                    </span>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
