"use client";

import { useEffect, useState } from "react";
import IssueCard from "@/components/IssueCard";
import IssueSkeleton from "@/components/IssueSkeleton";

// ✅ Skeleton Grid (reduced for performance)
function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(25)].map((_, i) => (
        <IssueSkeleton key={i} />
      ))}
    </div>
  );
}

export default function DifficultPage() {
  const [issues, setIssues] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // ✅ Cache (page → issues)
  const [cache, setCache] = useState<Record<number, any[]>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Fetch with caching
  async function fetchIssues(pageNum: number) {
    // 👉 If cached → instant load
    if (cache[pageNum]) {
      setIssues(cache[pageNum]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3000/api/github?level=difficult&page=${pageNum}`
      );

      const data = await res.json();
      const newIssues = data.items || [];

      setIssues(newIssues);

      // ✅ Save in cache
      setCache((prev) => ({
        ...prev,
        [pageNum]: newIssues,
      }));

    } catch (err) {
      console.error("Fetch failed:", err);
      setIssues([]);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchIssues(page);
  }, [page]);

  // ✅ Prefetch next page
  useEffect(() => {
    async function prefetchNext() {
      const nextPage = page + 1;

      if (cache[nextPage]) return;

      try {
        const res = await fetch(
          `http://localhost:3000/api/github?level=difficult&page=${nextPage}`
        );

        const data = await res.json();

        setCache((prev) => ({
          ...prev,
          [nextPage]: data.items || [],
        }));
      } catch (err) {
        console.error("Prefetch failed:", err);
      }
    }

    prefetchNext();
  }, [page]);

  // ✅ Prevent hydration mismatch
  if (!mounted) {
    return <SkeletonGrid />;
  }

  return (
    <div className="space-y-6">
      
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold">🔴 Difficult Issues</h1>
        <p className="text-gray-400 text-sm mt-1">
          Challenging issues requiring deeper understanding
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
              <IssueCard key={issue.id} issue={issue} />
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