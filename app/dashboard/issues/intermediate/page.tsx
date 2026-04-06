"use client";

import { useEffect, useState } from "react";
import IssueCard from "@/components/IssueCard";
import IssueSkeleton from "@/components/IssueSkeleton";
import { useSession } from "next-auth/react";

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(25)].map((_, i) => (
        <IssueSkeleton key={i} />
      ))}
    </div>
  );
}

export default function IntermediatePage() {
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [issues, setIssues] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  async function fetchIssues(pageNum: number) {
    setLoading(true);

    const res = await fetch(
      `http://localhost:3000/api/github?level=intermediate&page=${pageNum}`
    );

    const data = await res.json();
    setIssues(data.items || []);

    setLoading(false);
  }
  const userId = session?.user?.email ?? "";
const handleToggleBookmark = async (issue: any) => {
  console.log("🔥 CLICKED BOOKMARK");

  if (!userId) {
    alert("Please login first");
    return;
  }

  const id = String(issue.id);

  // optimistic UI update
  setBookmarks((prev) =>
    prev.includes(id)
      ? prev.filter((x) => x !== id)
      : [...prev, id]
  );

  try {
    const res = await fetch("/api/bookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        issueId: id,
        issueTitle: issue.title,
        issueUrl: issue.html_url,
        repoName: issue.repository_url.split("/").slice(-2).join("/"),
      }),
    });

    console.log("STATUS:", res.status);

    const data = await res.json();
    console.log("API RESPONSE:", data);

    if (!res.ok) {
      throw new Error(data?.error || "API failed");
    }

  } catch (err) {
    console.error("❌ BOOKMARK API ERROR:", err);
  }
};
  useEffect(() => {
    fetchIssues(page);
  }, [page]);


  if (!mounted) {
    return <SkeletonGrid />;
  }

  return (
    <div className="space-y-6">
      
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold">🟡 Intermediate Issues</h1>
        <p className="text-gray-400 text-sm mt-1">
          Requires some experience — good next step after beginner issues
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <SkeletonGrid />
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {issues.map((issue) => (
               <IssueCard
               key={issue.id}
               issue={issue}
               isBookmarked={bookmarks.includes(String(issue.id))}
               onToggleBookmark={handleToggleBookmark}
               />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-6">
            
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="px-4 py-2 bg-gray-800 rounded-lg"
            >
              ⬅ Prev
            </button>

            <span className="px-4 py-2">Page {page}</span>

            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-gray-800 rounded-lg"
            >
              Next ➡
            </button>

          </div>
        </>
      )}

    </div>
  );
}