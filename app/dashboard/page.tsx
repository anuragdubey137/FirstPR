"use client";

import { useEffect, useState } from "react";
import StatsCard from "@/components/StatsCard";
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

      setBookmarks(data.bookmarks);
    }

    fetchBookmarks();
  }, [userId]);

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
        <h2 className="text-xl font-semibold mb-3">⭐ Bookmarked Issues</h2>

        {bookmarks.length === 0 ? (
          <p className="text-gray-400 text-sm">No bookmarks yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarks.map((b) => (
              <div
                key={b.issueId}
                className="p-4 bg-[#020617] rounded-xl border border-gray-800 hover:border-gray-600 transition"
              >
                <p className="text-xs text-gray-400 mb-1">
                  {b.repoName}
                </p>

                <h3 className="font-semibold line-clamp-2">
                  {b.issueTitle}
                </h3>

                <a
                  href={b.issueUrl}
                  target="_blank"
                  className="text-blue-400 text-sm mt-3 inline-block hover:underline"
                >
                  View →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}