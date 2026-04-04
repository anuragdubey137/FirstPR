import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId, issueId, issueTitle, issueUrl, repoName } = body;

    const existing = await prisma.bookmark.findFirst({
      where: {
        userId,
        issueId: String(issueId),
      },
    });

    // ❌ If exists → delete (unsave)
    if (existing) {
      await prisma.bookmark.delete({
        where: {
          id: existing.id,
        },
      });

      return Response.json({ saved: false });
    }

    // ✅ Else → create (save)
    await prisma.bookmark.create({
      data: {
        userId,
        issueId: String(issueId),
        issueTitle,
        issueUrl,
        repoName,
      },
    });

    return Response.json({ saved: true });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}