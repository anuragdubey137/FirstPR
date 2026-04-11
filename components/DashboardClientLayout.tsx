"use client";

import Link from "next/link";
import { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function DashboardClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [issuesOpen, setIssuesOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#0B0F1A] text-white">
      
      {/*MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/*SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50 h-full w-64 bg-[#0B0F1A] border-r border-gray-800 p-4
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Close button (mobile) */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="font-bold">🚀 OpenPR</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-2">
          
          <Link
            href="/dashboard"
            className={`block p-2 rounded-lg ${
              pathname === "/dashboard" ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
          >
            🏠 Home
          </Link>

          <Link
            href="/dashboard/orgs"
            className={`block p-2 rounded-lg ${
              pathname === "/dashboard/orgs"
                ? "bg-gray-800"
                : "hover:bg-gray-800"
            }`}
          >
            💼 Open Source Jobs
          </Link>

          {/* Issues Dropdown */}
          <div>
            <button
              onClick={() => setIssuesOpen(!issuesOpen)}
              className="w-full text-left p-2 rounded-lg hover:bg-gray-800"
            >
              🐛 Issues {issuesOpen ? "▲" : "▼"}
            </button>

            {issuesOpen && (
              <div className="ml-4 mt-2 space-y-1">
                <Link
                  href="/dashboard/issues/good-first"
                  className={`block p-2 rounded-lg ${
                    pathname.includes("good-first")
                      ? "bg-gray-800"
                      : "hover:bg-gray-800"
                  }`}
                >
                  🟢 Good First
                </Link>

                <Link
                  href="/dashboard/issues/intermediate"
                  className={`block p-2 rounded-lg ${
                    pathname.includes("intermediate")
                      ? "bg-gray-800"
                      : "hover:bg-gray-800"
                  }`}
                >
                  🟡 Intermediate
                </Link>

                <Link
                  href="/dashboard/issues/difficult"
                  className={`block p-2 rounded-lg ${
                    pathname.includes("difficult")
                      ? "bg-gray-800"
                      : "hover:bg-gray-800"
                  }`}
                >
                  🔴 Difficult
                </Link>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/*MAIN CONTENT */}
      <div className="flex-1 flex flex-col w-full">

        {/*TOP BAR */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-gray-800"
          >
            <Menu size={20} />
          </button>

          <h1 className="font-semibold">Dashboard</h1>
        </div>

        {/* PAGE */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}