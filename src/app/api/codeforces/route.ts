import { NextResponse } from "next/server";

export async function GET() {
  const handle = "klu2300031222";
  
  try {
    // Fetch user info, rating history, and submissions in parallel
    const [userRes, ratingRes, statusRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${handle}`, {
        next: { revalidate: 300 },
      }),
      fetch(`https://codeforces.com/api/user.rating?handle=${handle}`, {
        next: { revalidate: 300 },
      }),
      fetch(`https://codeforces.com/api/user.status?handle=${handle}`, {
        next: { revalidate: 300 },
      }),
    ]);
    
    if (!userRes.ok) throw new Error("Failed to fetch Codeforces user");
    
    const userData = await userRes.json();
    
    if (userData.status !== "OK" || userData.result.length === 0) {
      throw new Error("User not found");
    }

    const user = userData.result[0];

    // Count contests from rating history
    let contestsAttended = 0;
    if (ratingRes.ok) {
      const ratingData = await ratingRes.json();
      if (ratingData.status === "OK") {
        contestsAttended = ratingData.result.length;
      }
    }

    // Count unique solved problems from submissions
    let problemsSolved = 0;
    if (statusRes.ok) {
      const statusData = await statusRes.json();
      if (statusData.status === "OK") {
        const solvedSet = new Set<string>();
        for (const sub of statusData.result) {
          if (sub.verdict === "OK") {
            solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
          }
        }
        problemsSolved = solvedSet.size;
      }
    }

    return NextResponse.json({
      rating: user.rating || 0,
      rank: user.rank || "Unrated",
      problemsSolved,
      contestsAttended,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch Codeforces stats" }, { status: 500 });
  }
}
