export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const level = searchParams.get("level") || "good-first";
    const page = searchParams.get("page") || "1";
    const language = searchParams.get("language");
    let query = "";

    if (level === "good-first") {
      query = `label:"good first issue" state:open`;
    } else if (level === "intermediate") {
      query = `label:"help wanted" -label:"good first issue" state:open`;
    } else {
      query = `-label:"good first issue" -label:"help wanted" state:open`;
    }
    if (language) {
    query += ` language:${language}`;
    }
    const res = await fetch(
      `https://api.github.com/search/issues?q=${encodeURIComponent(
        query
      )}&per_page=25&page=${page}`,

      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      return Response.json(
        { items: [], error: "GitHub API failed" },
        { status: 500 }
      );
    }

    const data = await res.json();

    return Response.json(data);

  } catch (error) {
    console.error("API ERROR:", error);

    return Response.json(
      { items: [], error: "Internal Server Error" },
      { status: 500 }
    );
  }
}