"use client";

import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Award, Code2, Star, Trophy } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { profile } from "@/data/profile";

type ProfileStats = Record<string, number | string | null | undefined>;

async function fetchStats(url: string): Promise<ProfileStats> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Profile data is unavailable");
  return response.json() as Promise<ProfileStats>;
}

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
  const github = useQuery({ queryKey: ["github"], queryFn: () => fetchStats("/api/github"), staleTime: 5 * 60 * 1000 });
  const leetcode = useQuery({ queryKey: ["leetcode"], queryFn: () => fetchStats("/api/leetcode"), staleTime: 5 * 60 * 1000 });
  const codeforces = useQuery({ queryKey: ["codeforces"], queryFn: () => fetchStats("/api/codeforces"), staleTime: 5 * 60 * 1000 });
  const codechef = useQuery({ queryKey: ["codechef"], queryFn: () => fetchStats("/api/codechef"), staleTime: 5 * 60 * 1000 });
  const hackerrank = useQuery({ queryKey: ["hackerrank"], queryFn: () => fetchStats("/api/hackerrank"), staleTime: 5 * 60 * 1000 });
  const solvedCounts = [leetcode.data?.totalSolved, codeforces.data?.problemsSolved, codechef.data?.problemsSolved];
  const numericSolvedCounts = solvedCounts.filter((count): count is number => typeof count === "number" && Number.isFinite(count));
  const totalSolved = numericSolvedCounts.length === solvedCounts.length
    ? numericSolvedCounts.reduce((total, count) => total + count, 0)
    : null;
  const isLoadingTotal = leetcode.isPending || codeforces.isPending || codechef.isPending;

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
          <ProfileCard name="GitHub" href={profile.links.github} icon={<FaGithub size={20} />} index="01" loading={github.isPending} entries={[
            { label: "Followers", value: github.data?.followers },
            { label: "Public repositories", value: github.data?.publicRepos },
            { label: "Total stars", value: github.data?.totalStars },
          ]} />
          <ProfileCard name="LeetCode" href={profile.links.leetcode} icon={<Code2 size={20} />} index="02" loading={leetcode.isPending} entries={[
            { label: "Problems solved", value: leetcode.data?.totalSolved },
            { label: "Profile percentile", value: leetcode.data?.topPercent != null ? `Top ${leetcode.data.topPercent}%` : undefined },
            { label: "Contest rating", value: leetcode.data?.contestRating },
          ]} />
          <ProfileCard name="Codeforces" href={profile.links.codeforces} icon={<Trophy size={20} />} index="03" loading={codeforces.isPending} entries={[
            { label: "Rating", value: codeforces.data?.rating },
            { label: "Rank", value: codeforces.data?.rank },
            { label: "Problems solved", value: codeforces.data?.problemsSolved },
          ]} />
          <ProfileCard name="CodeChef" href={profile.links.codechef} icon={<Star size={20} />} index="04" loading={codechef.isPending} entries={[
            { label: "Stars", value: codechef.data?.stars },
            { label: "Rating", value: codechef.data?.rating },
            { label: "DSA rating", value: codechef.data?.dsaRating },
            { label: "Problems solved", value: codechef.data?.problemsSolved },
          ]} />
          <ProfileCard name="HackerRank" href={profile.links.hackerrank} icon={<Award size={20} />} index="05" loading={hackerrank.isPending} entries={[
            { label: "Badges", value: hackerrank.data?.badges },
            { label: "Skill certifications", value: hackerrank.data?.skillCertifications },
            { label: "Profile", value: "View profile ↗" },
          ]} />
        </div>
      </div>
    </section>
  );
}
