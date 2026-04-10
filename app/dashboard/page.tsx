"use client";

import { useEffect, useState } from "react";
import StatsCard from "@/components/StatsCard";
import IssueCard from "@/components/IssueCard";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const [data, setData] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const userId = session?.user?.email;


  useEffect(() => {
    if (status !== "authenticated") return;

    async function fetchData() {
      try {
        const res = await fetch("/api/github/user");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("GitHub fetch error:", err);
      }
    }

    fetchData();
  }, [status]);

  useEffect(() => {
    if (!userId) return;

    async function fetchBookmarks() {
      try {
        const res = await fetch(`/api/bookmark?userId=${userId}`);
        const data = await res.json();
        setBookmarks(data.bookmarks || []);
      } catch (err) {
        console.error("Bookmark fetch error:", err);
      }
    }

    fetchBookmarks();
  }, [userId]);

  const handleToggleBookmark = async (issue: any) => {
    if (!userId) return;

    try {
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

      setBookmarks((prev) =>
        prev.filter((b) => b.issueId !== issue.id)
      );
    } catch (err) {
      console.error("Bookmark toggle error:", err);
    }
  };

  const formattedIssues = bookmarks.map((b) => ({
    id: b.issueId,
    title: b.issueTitle,
    html_url: b.issueUrl,
    repository_url: `https://api.github.com/repos/${b.repoName}`,
    labels: [],
    comments: 0,
  }));

  if (status === "loading") {
    return <div className="text-gray-400">Loading session...</div>;
  }

  if (status === "unauthenticated") {
    return <div className="text-gray-400">Not authenticated</div>;
  }

  if (!data) {
    return <div className="text-gray-400">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <h1 className="text-2xl font-bold">Welcome back 👋</h1>

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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