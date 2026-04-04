"use client";

import { useEffect, useState } from "react";

export default function IssueCard({ issue, userId }: any) {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔍 check if already bookmarked
  useEffect(() => {
    async function checkBookmark() {
      if (!userId || !issue?.id) return;

      try {
        const res = await fetch(`/api/bookmarks?userId=${userId}`);
        const data = await res.json();

        const exists = data.bookmarks?.some(
          (b: any) => String(b.issueId) === String(issue.id)
        );

        setBookmarked(!!exists);
      } catch (err) {
        console.error("Bookmark check failed", err);
      }
    }

    checkBookmark();
  }, [userId, issue?.id]);

  // ⭐ toggle bookmark
  const handleBookmark = async () => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          issueId: String(issue.id),
          issueTitle: issue.title,
          issueUrl: issue.html_url,
          repoName: issue.repository_url
            .split("/")
            .slice(-2)
            .join("/"),
        }),
      });

      const data = await res.json();

      setBookmarked(data.saved);
    } catch (err) {
      console.error("Bookmark failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-4 bg-[#020617] rounded-xl border border-gray-800 hover:border-gray-600 transition">

      {/* ⭐ Bookmark Button */}
      <button
        onClick={handleBookmark}
        disabled={loading}
        title={bookmarked ? "Remove bookmark" : "Bookmark"}
        className="absolute top-3 right-3 text-lg text-yellow-400 hover:scale-110 transition disabled:opacity-50"
      >
        {loading ? "⏳" : bookmarked ? "⭐" : "☆"}
      </button>

      {/* Repo */}
      <p className="text-xs text-gray-400 mb-1">
        {issue.repository_url.split("/").slice(-2).join("/")}
      </p>

      {/* Title */}
      <h3 className="font-semibold line-clamp-2">
        {issue.title}
      </h3>

      {/* Labels */}
      <div className="flex flex-wrap gap-2 mt-2">
        {issue.labels?.slice(0, 3).map((label: any) => (
          <span
            key={label.id}
            className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300"
          >
            {label.name}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <span>💬 {issue.comments}</span>

        <a
          href={issue.html_url}
          target="_blank"
          className="text-blue-400 hover:underline"
        >
          View →
        </a>
      </div>
    </div>
  );
}