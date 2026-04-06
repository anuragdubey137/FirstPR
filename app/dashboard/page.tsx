"use client";

import { useEffect, useState } from "react";
import StatsCard from "@/components/StatsCard";
import IssueCard from "@/components/IssueCard";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const { data: session } = useSession();
  const userId = session?.user?.email;

  // 🔹 Fetch GitHub user data
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/github/user");
      const json = await res.json();
      setData(json);
    }

    fetchData();
  }, []);

  // 🔹 Fetch bookmarks
  useEffect(() => {
    async function fetchBookmarks() {
      if (!userId) return;

      const res = await fetch(`/api/bookmark?userId=${userId}`);
      const data = await res.json();

      setBookmarks(data.bookmarks || []);
    }

    fetchBookmarks();
  }, [userId]);

  // 🔥 Toggle bookmark (REMOVE here)
  const handleToggleBookmark = async (issue: any) => {
    if (!userId) return;

    await fetch("/api/bookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        issueId: issue.id,
        issueTitle: issue.title,
        issueUrl: issue.html_url,
        repoName: issue.repository_url.split("/").slice(-2).join("/"),
      }),
    });

    // remove from UI instantly
    setBookmarks((prev) =>
      prev.filter((b) => b.issueId !== issue.id)
    );
  };

  // 🔄 Convert bookmarks → IssueCard format
  const formattedIssues = bookmarks.map((b) => ({
    id: b.issueId,
    title: b.issueTitle,
    html_url: b.issueUrl,
    repository_url: `https://api.github.com/repos/${b.repoName}`,
    labels: [],
    comments: 0,
  }));

  if (!data) {
    return <div className="text-gray-400">Loading...</div>;
  }

  return (
    <div className="space-y-6">

      {/* Welcome */}
      <h1 className="text-2xl font-bold">
        Welcome back 👋
      </h1>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <img
          src={data.avatar}
          className="w-12 h-12 rounded-full"
          alt="avatar"
        />
        <div>
          <p className="font-semibold">{data.name}</p>
          <p className="text-gray-400 text-sm">
            {data.followers} followers
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatsCard title="Repositories" value={data.repos} />
        <StatsCard title="Followers" value={data.followers} />
        <StatsCard title="PRs Raised" value={data.prs} />
        <StatsCard title="PRs Merged" value={data.merged_prs} />
      </div>

      {/* ⭐ Bookmarks Section */}
      <div>
        <h2 className="text-xl font-semibold mb-3">
          ⭐ Bookmarked Issues
        </h2>

        {formattedIssues.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No bookmarks yet
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formattedIssues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                isBookmarked={true}
                onToggleBookmark={handleToggleBookmark}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}