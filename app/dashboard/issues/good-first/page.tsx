"use client";

import { useEffect, useState } from "react";
import IssueCard from "@/components/IssueCard";
import IssueSkeleton from "@/components/IssueSkeleton";

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(25)].map((_, i) => (
        <IssueSkeleton key={i} />
      ))}
    </div>
  );
}

export default function GoodFirstPage() {
  const [issues, setIssues] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Fix hydration issue
  useEffect(() => {
    setMounted(true);
  }, []);

  async function fetchIssues(pageNum: number) {
    setLoading(true);

    const res = await fetch(
      `http://localhost:3000/api/github?level=good-first&page=${pageNum}`
    );

    const data = await res.json();
    setIssues(data.items || []);

    setLoading(false);
  }

  useEffect(() => {
    fetchIssues(page);
  }, [page]);

  // Prevent hydration mismatch
  if (!mounted) {
    return <SkeletonGrid />;
  }

  return (
    <div className="space-y-6">
      
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold">🟢 Good First Issues</h1>
        <p className="text-gray-400 text-sm mt-1">
          Beginner-friendly issues to start your open source journey
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