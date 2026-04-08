"use client";

import Link from "next/link";
import { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#0B0F1A] text-white">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 p-4 space-y-4">
        
        <h2 className="text-xl font-bold mb-6">FirstPR</h2>

        <nav className="space-y-2">
          
          {/* Home */}
          <Link
            href="/dashboard"
            className={`block p-2 rounded-lg ${
              pathname === "/dashboard" ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
          >
            🏠 Home
          </Link>
          
          {/* Open Source Jobs */}
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
              onClick={() => setOpen(!open)}
              className="w-full text-left p-2 rounded-lg hover:bg-gray-800"
            >
              🐛 Issues {open ? "▲" : "▼"}
            </button>

            {open && (
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

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}