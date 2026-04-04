export async function GET() {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    };

    // 👤 Get user
    const userRes = await fetch("https://api.github.com/user", { headers });
    const user = await userRes.json();

    const username = user.login;

    // 📦 Get repos
    const repoRes = await fetch(user.repos_url, { headers });
    const repos = await repoRes.json();

    // 🔀 PRs raised
    const prRes = await fetch(
      `https://api.github.com/search/issues?q=author:${username}+type:pr`,
      { headers }
    );
    const prData = await prRes.json();

    // ✅ PRs merged
    const mergedRes = await fetch(
      `https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged`,
      { headers }
    );
    const mergedData = await mergedRes.json();

    return Response.json({
      name: user.name,
      avatar: user.avatar_url,
      repos: repos.length,
      followers: user.followers,
      prs: prData.total_count,
      merged_prs: mergedData.total_count,
    });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}