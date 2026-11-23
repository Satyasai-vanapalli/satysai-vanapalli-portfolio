import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const timeout = () => AbortSignal.timeout(25_000);

function asNumberOrNull(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

async function getJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    signal: timeout(),
    headers: {
      "User-Agent": "SatyaSaiPortfolioStats/1.0",
      Accept: "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
}

async function getLeetCodeStats() {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        submitStats { acSubmissionNum { difficulty count } }
      }
      userContestRanking(username: $username) {
        rating
        attendedContestsCount
        topPercentage
      }
    }
  `;
  const result = await getJson("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
    body: JSON.stringify({ query, variables: { username: "Dominator_Zzz" } }),
  });

  if (result.errors || !result.data?.matchedUser) throw new Error("LeetCode profile response was incomplete");

  const submissions = result.data.matchedUser.submitStats?.acSubmissionNum ?? [];
  const allSolved = submissions.find((item) => item.difficulty === "All")?.count ?? null;
  const ranking = result.data.userContestRanking;
  const rawTopPercent = Number(ranking?.topPercentage);

  return {
    totalSolved: allSolved,
    contestRating: ranking ? Math.round(ranking.rating) : "Unrated",
    contestsAttended: ranking?.attendedContestsCount ?? 0,
    topPercent: Number.isFinite(rawTopPercent) ? rawTopPercent.toFixed(2) : null,
  };
}

async function getCodeforcesStats() {
  const handle = "klu2300031222";
  const [userData, ratingData, statusData] = await Promise.all([
    getJson(`https://codeforces.com/api/user.info?handles=${handle}`),
    getJson(`https://codeforces.com/api/user.rating?handle=${handle}`),
    getJson(`https://codeforces.com/api/user.status?handle=${handle}`),
  ]);

  if (userData.status !== "OK" || !userData.result?.[0] || statusData.status !== "OK") {
    throw new Error("Codeforces profile response was incomplete");
  }

  const user = userData.result[0];
  const solved = new Set();
  for (const submission of statusData.result) {
    if (submission.verdict === "OK" && submission.problem?.contestId != null && submission.problem?.index) {
      solved.add(`${submission.problem.contestId}-${submission.problem.index}`);
    }
  }

  return {
    rating: user.rating ?? 0,
    rank: user.rank ?? "Unrated",
    problemsSolved: solved.size,
    contestsAttended: ratingData.status === "OK" ? ratingData.result.length : null,
  };
}

function extractJsonObjectAfter(html, marker) {
  const markerIndex = html.indexOf(marker);
  if (markerIndex < 0) return null;

  const start = html.indexOf("{", markerIndex + marker.length);
  if (start < 0) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < html.length; index += 1) {
    const character = html[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }

    if (character === '"') inString = true;
    else if (character === "{") depth += 1;
    else if (character === "}") {
      depth -= 1;
      if (depth === 0) return html.slice(start, index + 1);
    }
  }

  return null;
}

async function getCodeChefStats() {
  const response = await fetch("https://www.codechef.com/users/klu31222", {
    signal: timeout(),
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36",
      Accept: "text/html",
    },
  });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);

  const html = await response.text();
  const pageText = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&amp;/g, "&");

  let settings = null;
  const settingsJson = extractJsonObjectAfter(html, "jQuery.extend(Drupal.settings,");
  if (settingsJson) {
    try { settings = JSON.parse(settingsJson); } catch { /* The profile may omit chart data. */ }
  }

  const allRatings = settings?.date_versus_rating?.all ?? [];
  const dsaRatings = settings?.date_versus_rating?.dsa_monday ?? [];
  const lastOverall = allRatings.at(-1);
  const lastDsa = dsaRatings.at(-1);
  const problemsMatch = pageText.match(/Total\s+Problems\s+Solved\s*:?\s*(\d+)/i);
  const starsMatch = html.match(/<span\s+class=['"]rating['"][^>]*>\s*(\d+)(?:&#9733;|★)<\/span>/i);
  const dsaTextMatch = pageText.match(/DSA\s+Rating[\s\S]{0,40}?(\d{3,5})/i);

  return {
    rating: Number.parseInt(lastOverall?.rating, 10) || 0,
    stars: starsMatch ? `${starsMatch[1]}★` : "Unrated",
    dsaRating: Number.parseInt(lastDsa?.rating, 10) || (dsaTextMatch ? Number.parseInt(dsaTextMatch[1], 10) : null),
    contestsParticipated: allRatings.length,
    problemsSolved: problemsMatch ? Number.parseInt(problemsMatch[1], 10) : null,
  };
}

async function getGitHubStats() {
  const username = "Satyasai-vanapalli";
  const [user, repositories] = await Promise.all([
    getJson(`https://api.github.com/users/${username}`),
    getJson(`https://api.github.com/users/${username}/repos?per_page=100`),
  ]);

  return {
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
    totalStars: repositories.reduce((total, repo) => total + (repo.stargazers_count ?? 0), 0),
  };
}

async function getGeeksForGeeksStats() {
  const result = await getJson("https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=klu2300031222&article_count=false&redirect=true");
  const data = result.data;
  if (!data) throw new Error("GeeksforGeeks profile response was incomplete");

  return {
    codingScore: asNumberOrNull(data.score),
    monthlyScore: asNumberOrNull(data.monthly_score),
    problemsSolved: asNumberOrNull(data.total_problems_solved),
    instituteRank: asNumberOrNull(data.institute_rank),
    currentStreak: asNumberOrNull(data.pod_solved_current_streak),
  };
}

async function useLiveStats(name, fetchStats, fallback) {
  try {
    return await fetchStats();
  } catch (error) {
    console.warn(`${name} statistics could not be refreshed: ${error.message}`);
    return fallback;
  }
}

const stats = {
  updatedAt: new Date().toISOString(),
  github: await useLiveStats("GitHub", getGitHubStats, {
    followers: null, following: null, publicRepos: null, totalStars: null,
  }),
  leetcode: await useLiveStats("LeetCode", getLeetCodeStats, {
    totalSolved: null, contestRating: "Unavailable", contestsAttended: null, topPercent: null,
  }),
  codeforces: await useLiveStats("Codeforces", getCodeforcesStats, {
    rating: null, rank: "Unavailable", problemsSolved: null, contestsAttended: null,
  }),
  codechef: await useLiveStats("CodeChef", getCodeChefStats, {
    rating: null, stars: "Unavailable", dsaRating: null, contestsParticipated: null, problemsSolved: null,
  }),
  hackerrank: { badges: 3, skillCertifications: 2 },
  geeksforgeeks: await useLiveStats("GeeksforGeeks", getGeeksForGeeksStats, {
    codingScore: null, monthlyScore: null, problemsSolved: null, instituteRank: null, currentStreak: null,
  }),
};

await writeFile(join(process.cwd(), "public", "profile-stats.json"), `${JSON.stringify(stats, null, 2)}\n`);
console.log(`Wrote refreshed profile statistics (${stats.updatedAt}).`);
