"use client";

import { useQuery } from "@tanstack/react-query";
import { Code2, Database, Layers3, Trophy } from "lucide-react";
import { fetchProfileStats } from "@/lib/profile-stats";

const groups = [
  { number: "01", title: "Programming", icon: Code2, skills: ["Java", "Kotlin", "C"] },
  { number: "02", title: "System design", icon: Layers3, skills: ["HLD", "LLD", "Design Patterns", "SOLID", "Scalability", "Distributed Systems"] },
  { number: "03", title: "CS foundations", icon: Database, skills: ["Data Structures & Algorithms", "OOP", "Computer Networks", "DBMS", "Operating Systems"] },
  { number: "04", title: "Competitive programming", icon: Trophy, skills: ["CodeChef · 3★"] },
];

export default function SkillsSection() {
  const statsQuery = useQuery({ queryKey: ["profile-stats"], queryFn: fetchProfileStats, staleTime: 5 * 60 * 1000 });
  const leetcode = statsQuery.data?.leetcode;
  const codeforces = statsQuery.data?.codeforces;
  const codechef = statsQuery.data?.codechef;
  const solvedCounts = [leetcode?.totalSolved, codeforces?.problemsSolved, codechef?.problemsSolved];
  const numericSolvedCounts = solvedCounts.filter((count): count is number => typeof count === "number" && Number.isFinite(count));
  const totalSolved = numericSolvedCounts.length === solvedCounts.length
    ? numericSolvedCounts.reduce((total, count) => total + count, 0)
    : null;
  const isLoadingTotal = statsQuery.isPending;

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
                      {leetcode?.topPercent != null
                        ? `LeetCode · Top ${leetcode.topPercent}%`
                        : statsQuery.isPending ? "LeetCode · Loading percentile…" : "LeetCode · Percentile unavailable"}
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
