import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";


export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const headers = {
      Authorization: `Bearer ${session.accessToken}`, // ✅ FIX
    };

    const userRes = await fetch("https://api.github.com/user", { headers });
    const user = await userRes.json();

    const username = user.login;

    const repoRes = await fetch(user.repos_url, { headers });
    const repos = await repoRes.json();

    const prRes = await fetch(
      `https://api.github.com/search/issues?q=author:${username}+type:pr`,
      { headers }
    );
    const prData = await prRes.json();

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