import { NextResponse } from "next/server";

export async function GET() {
  const username = "Dominator_Zzz";
  
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
      userContestRanking(username: $username) {
        rating
        attendedContestsCount
        topPercentage
      }
    }
  `;

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: 300 },
    });

    if (!res.ok) throw new Error("Failed to fetch LeetCode data");

    const json = await res.json();
    
    if (json.errors) throw new Error("GraphQL errors");

    const submitStats = json.data.matchedUser?.submitStats.acSubmissionNum || [];
    const contestRanking = json.data.userContestRanking;
    const rawTopPercent = Number(contestRanking?.topPercentage);
    const topPercent = Number.isFinite(rawTopPercent) ? rawTopPercent.toFixed(2) : null;

    const getCount = (diff: string) => submitStats.find((s: any) => s.difficulty === diff)?.count || 0;

    return NextResponse.json({
      totalSolved: getCount("All"),
      contestRating: contestRanking ? Math.round(contestRanking.rating) : "Unrated",
      contestsAttended: contestRanking ? contestRanking.attendedContestsCount : 0,
      topPercent,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch LeetCode stats" }, { status: 500 });
  }
}
