import { NextResponse } from "next/server";

export async function GET() {
  const username = "Satyasai-vanapalli";
  
  try {
    // Fetch user profile
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!userRes.ok) throw new Error("Failed to fetch GitHub user");
    
    const userData = await userRes.json();
    
    // Fetch repositories to calculate total stars
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      next: { revalidate: 3600 },
    });
    
    let totalStars = 0;
    if (reposRes.ok) {
      const reposData = await reposRes.json();
      totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
    }

    return NextResponse.json({
      followers: userData.followers,
      following: userData.following,
      publicRepos: userData.public_repos,
      totalStars: totalStars,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch GitHub stats" }, { status: 500 });
  }
}
