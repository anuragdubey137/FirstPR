export async function GET(req: Request) {
  try {
    const res = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    const user = await res.json();

    // Fetch repos
    const repoRes = await fetch(user.repos_url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    const repos = await repoRes.json();

    return Response.json({
      name: user.name,
      avatar: user.avatar_url,
      repos: repos.length,
      followers: user.followers,
    });

  } catch (err) {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}