export type MetricValue = number | string | null;

export type PlatformStats = Record<string, MetricValue>;

export type ProfileStats = {
  updatedAt: string | null;
  github: PlatformStats;
  leetcode: PlatformStats;
  codeforces: PlatformStats;
  codechef: PlatformStats;
  hackerrank: PlatformStats;
};

export async function fetchProfileStats(): Promise<ProfileStats> {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const response = await fetch(`${basePath}/profile-stats.json`, { cache: "no-store" });

  if (!response.ok) throw new Error("Profile data is unavailable");
  return response.json() as Promise<ProfileStats>;
}
