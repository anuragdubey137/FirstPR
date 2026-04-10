"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Appbar() {
  const session = useSession();

  return (
    <div className="w-full sticky top-0 z-50 backdrop-blur bg-[#020617]/70 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          🚀 FirstPR
        </Link>

        {/* BUTTON */}
        <div>
          {session.data?.user ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-sm transition"
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-sm transition"
            >
              Sign in
            </button>
          )}
        </div>

      </div>
    </div>
  );
}