import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, issueId, issueTitle, issueUrl, repoName } = body;

    if (!userId || !issueId) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    // 1. ensure user exists (githubId = email)
    const user = await prisma.user.upsert({
      where: {
        githubId: userId,
      },
      update: {},
      create: {
        githubId: userId,
        username: userId.split("@")[0],
      },
    });

    // 2. check existing bookmark (IMPORTANT: use user.id)
    const existing = await prisma.bookmark.findFirst({
      where: {
        userId: user.id,
        issueId: String(issueId),
      },
    });

    // 3. toggle remove
    if (existing) {
      await prisma.bookmark.delete({
        where: {
          id: existing.id,
        },
      });

      return NextResponse.json({
        saved: false,
        action: "removed",
      });
    }

    // 4. create bookmark
    const created = await prisma.bookmark.create({
      data: {
        userId: user.id,
        issueId: String(issueId),
        issueTitle,
        issueUrl,
        repoName,
      },
    });

    return NextResponse.json({
      saved: true,
      action: "added",
      bookmark: created,
    });
  } catch (error) {
    console.error("BOOKMARK ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 400 }
      );
    }

    // resolve user first (IMPORTANT FIX)
    const user = await prisma.user.findUnique({
      where: {
        githubId: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ bookmarks: [] });
    }

    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ bookmarks });
  } catch (error) {
    console.error("GET BOOKMARK ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}