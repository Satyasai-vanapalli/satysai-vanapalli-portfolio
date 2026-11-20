import { NextResponse } from "next/server";

export async function GET() {
  const handle = "klu31222";

  try {
    // Fetch the CodeChef profile page directly and parse embedded data
    const res = await fetch(`https://www.codechef.com/users/${handle}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      next: { revalidate: 300 }, // Refresh the public profile data every 5 minutes
    });

    if (!res.ok) throw new Error("Failed to fetch CodeChef profile page");

    const html = await res.text();

    // Extract rating from the embedded Drupal.settings JSON
    // The page has: jQuery.extend(Drupal.settings, { ... "date_versus_rating": { "all": [ ... ] } ... })
    const settingsMatch = html.match(/jQuery\.extend\(Drupal\.settings,\s*(\{[\s\S]*?\})\);/);

    let rating = 0;
    let stars = "Unrated";
    let contestsParticipated = 0;
    let dsaRating: number | null = null;
    let problemsSolved: number | null = null;

    const pageText = html.replace(/<[^>]*>/g, " ").replace(/&nbsp;|&#160;/gi, " ");
    const problemsMatch = pageText.match(/Total\s+Problems\s+Solved\s*:?\s*(\d+)/i);
    if (problemsMatch) {
      const parsedProblemsSolved = Number.parseInt(problemsMatch[1], 10);
      if (Number.isFinite(parsedProblemsSolved)) problemsSolved = parsedProblemsSolved;
    }

    if (settingsMatch) {
      try {
        const settings = JSON.parse(settingsMatch[1]);
        const allRatings = settings?.date_versus_rating?.all;

        if (allRatings && allRatings.length > 0) {
          // Get the latest rating entry
          const latest = allRatings[allRatings.length - 1];
          rating = parseInt(latest.rating, 10) || 0;
          contestsParticipated = allRatings.length;
        }

        // Extract DSA Monday rating
        const dsaRatings = settings?.date_versus_rating?.dsa_monday;
        if (dsaRatings && dsaRatings.length > 0) {
          const latestDsa = dsaRatings[dsaRatings.length - 1];
          dsaRating = parseInt(latestDsa.rating, 10) || 0;
        }
      } catch (parseError) {
        console.error("Failed to parse CodeChef settings JSON:", parseError);
      }
    }

    // Extract stars from the HTML (e.g., <span class='rating' ...>3★</span>)
    const starsMatch = html.match(/<span\s+class=['"]rating['"][^>]*>\s*(\d+)(?:&#9733;|★)<\/span>/i);
    if (starsMatch) {
      stars = `${starsMatch[1]}★`;
    }

    if (dsaRating === null) {
      const dsaTextMatch = pageText.match(/DSA\s+Rating[\s\S]{0,40}?(\d{3,5})/i);
      if (dsaTextMatch) dsaRating = Number.parseInt(dsaTextMatch[1], 10);
    }

    return NextResponse.json({
      rating,
      stars,
      dsaRating,
      contestsParticipated,
      problemsSolved,
    });
  } catch (error) {
    console.error("CodeChef fetch error:", error);
    return NextResponse.json(
      {
        rating: "N/A",
        stars: "N/A",
        dsaRating: "N/A",
        contestsParticipated: "N/A",
        problemsSolved: null,
        error: "API unavailable",
      },
      { status: 200 }
    );
  }
}
