"use client";

import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Award, Code2, Star, Trophy } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { profile } from "@/data/profile";
import { fetchProfileStats } from "@/lib/profile-stats";

function ProfileCard({
  name,
  href,
  icon,
  entries,
  loading,
  index,
}: {
  name: string;
  href: string;
  icon: ReactNode;
  entries: { label: string; value: number | string | null | undefined }[];
  loading: boolean;
  index: string;
}) {
  return (
    <article className="profile-card" aria-busy={loading}>
      <div className="profile-card-heading">
        <span className="profile-icon">{icon}</span>
        <div><span className="card-overline">PLATFORM {index}</span><h3>{name}</h3></div>
        <a className="profile-arrow" href={href} target="_blank" rel="noreferrer" aria-label={`Open ${name} profile`}><ArrowUpRight size={17} /></a>
      </div>
      <dl className="profile-metrics">
        {entries.map((entry) => (
          <div className="profile-metric" key={entry.label}>
            <dt>{entry.label}</dt><dd>{loading ? "···" : entry.value ?? "—"}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export default function CodingProfilesSection() {
  const statsQuery = useQuery({ queryKey: ["profile-stats"], queryFn: fetchProfileStats, staleTime: 5 * 60 * 1000 });
  const github = statsQuery.data?.github;
  const leetcode = statsQuery.data?.leetcode;
  const codeforces = statsQuery.data?.codeforces;
  const codechef = statsQuery.data?.codechef;
  const hackerrank = statsQuery.data?.hackerrank;
  const solvedCounts = [leetcode?.totalSolved, codeforces?.problemsSolved, codechef?.problemsSolved];
  const numericSolvedCounts = solvedCounts.filter((count): count is number => typeof count === "number" && Number.isFinite(count));
  const totalSolved = numericSolvedCounts.length === solvedCounts.length
    ? numericSolvedCounts.reduce((total, count) => total + count, 0)
    : null;
  const isLoadingTotal = statsQuery.isPending;
  const loading = statsQuery.isPending;

  return (
    <section id="profiles" className="section profiles-section section-anchor">
      <div className="site-container">
        <div className="section-heading section-heading-split">
          <div>
            <p className="eyebrow">05 / CODING PROFILES</p>
            <h2 className="section-title">The numbers <em>so far.</em></h2>
          </div>
          <p className="section-lede"><span className="live-indicator" /> Total solved across LeetCode, Codeforces, and CodeChef: <strong>{totalSolved !== null ? totalSolved.toLocaleString() : isLoadingTotal ? "Loading…" : "Unavailable"}</strong></p>
        </div>

        <div className="profile-grid">
          <ProfileCard name="GitHub" href={profile.links.github} icon={<FaGithub size={20} />} index="01" loading={loading} entries={[
            { label: "Followers", value: github?.followers },
            { label: "Public repositories", value: github?.publicRepos },
            { label: "Total stars", value: github?.totalStars },
          ]} />
          <ProfileCard name="LeetCode" href={profile.links.leetcode} icon={<Code2 size={20} />} index="02" loading={loading} entries={[
            { label: "Problems solved", value: leetcode?.totalSolved },
            { label: "Profile percentile", value: leetcode?.topPercent != null ? `Top ${leetcode.topPercent}%` : undefined },
            { label: "Contest rating", value: leetcode?.contestRating },
          ]} />
          <ProfileCard name="Codeforces" href={profile.links.codeforces} icon={<Trophy size={20} />} index="03" loading={loading} entries={[
            { label: "Rating", value: codeforces?.rating },
            { label: "Rank", value: codeforces?.rank },
            { label: "Problems solved", value: codeforces?.problemsSolved },
          ]} />
          <ProfileCard name="CodeChef" href={profile.links.codechef} icon={<Star size={20} />} index="04" loading={loading} entries={[
            { label: "Stars", value: codechef?.stars },
            { label: "Rating", value: codechef?.rating },
            { label: "DSA rating", value: codechef?.dsaRating },
            { label: "Problems solved", value: codechef?.problemsSolved },
          ]} />
          <ProfileCard name="HackerRank" href={profile.links.hackerrank} icon={<Award size={20} />} index="05" loading={loading} entries={[
            { label: "Badges", value: hackerrank?.badges },
            { label: "Skill certifications", value: hackerrank?.skillCertifications },
            { label: "Profile", value: "View profile ↗" },
          ]} />
        </div>
      </div>
    </section>
  );
}
