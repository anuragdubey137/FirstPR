"use client";

import { useEffect, useState } from "react";
import StatsCard from "@/components/StatsCard";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  // 🔹 Fetch GitHub user data
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/github/user");
      const json = await res.json();
      setData(json);
    }

    fetchData();
  }, []);

  
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

    </div>
  );
}