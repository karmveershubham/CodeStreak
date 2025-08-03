export async function getLeaderboardData(page: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leaderboard?page=${page}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
