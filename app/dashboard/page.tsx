"use client";

import { useEffect, useState } from "react";
import StatsCard from "@/components/StatsCard";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const { data: session } = useSession();
  const userId = session?.user?.id;

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
    if (!userId) return;

    async function fetchBookmarks() {
      const res = await fetch(`/api/bookmarks?userId=${userId}`);
      const json = await res.json();
      setBookmarks(json.bookmarks || []);
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

      {/* Bookmarked Issues */}
      <div>
        <h2 className="text-xl font-semibold mb-2">
          ⭐ Bookmarked Issues
        </h2>

        {bookmarks.length === 0 ? (
          <div className="text-gray-400">
            No bookmarks yet
          </div>
        ) : (
          <div className="space-y-2">
            {bookmarks.map((b: any) => (
              <a
                key={b.id}
                href={b.issueUrl}
                target="_blank"
                className="block p-3 border border-gray-800 rounded-lg hover:bg-gray-900 transition"
              >
                <p className="font-medium">{b.issueTitle}</p>
                <p className="text-sm text-gray-400">
                  {b.repoName}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}