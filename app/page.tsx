"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(147,51,234,0.15),transparent_50%)]" />

      {/* HERO */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-16">
        <div className="px-4 py-2 rounded-full border border-gray-800 bg-gray-900/40 text-xs text-gray-400">
          🚀 Open Source Contribution Platform
        </div>

        <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight">
          Start Your Journey in{" "}
          <span className="text-blue-400">Open Source</span>
        </h1>

        <p className="mt-6 max-w-2xl text-gray-400 text-lg">
          Track your GitHub activity, discover beginner-friendly issues, and
          contribute to real-world projects with a structured path.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() =>
              signIn("github", { callbackUrl: "/dashboard" })
            }
            className="px-7 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            Get Started
          </button>

          <button
            onClick={() =>
              signIn("github", { callbackUrl: "/dashboard" })
            }
            className="px-7 py-3 rounded-xl border border-gray-700 hover:bg-gray-900 transition"
          >
            Explore Dashboard
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 px-8 py-20 grid md:grid-cols-3 gap-6">
        {[
          {
            title: "📊 GitHub Dashboard",
            desc: "View your repositories, followers, pull requests, and contributions in one place.",
          },
          {
            title: "🧩 Curated Issues",
            desc: "Explore Good First Issues, Intermediate, and Difficult problems based on your level.",
          },
          {
            title: "📌 Bookmark & Track",
            desc: "Save issues and track your progress while contributing to open source.",
          },
          {
            title: "🚀 Contribution Insights",
            desc: "Monitor PRs raised, merged, and your overall contribution growth.",
          },
          {
            title: "🏢 Open Source Opportunities",
            desc: "Discover organizations offering internships, jobs, or rewards for contributors.",
          },
          {
            title: "🎯 Structured Learning Path",
            desc: "Move from beginner to advanced by solving real-world open source issues.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-gray-800 bg-gray-900/40 hover:bg-gray-900/60 transition"
          >
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="text-gray-400 mt-2 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 px-8 py-20 text-center">
        <h2 className="text-3xl font-bold">How it works</h2>

        <div className="mt-10 grid md:grid-cols-3 gap-6 text-left">
          {[
            "Login with GitHub",
            "Explore issues based on difficulty",
            "Start contributing and track your progress",
          ].map((step, i) => (
            <div
              key={i}
              className="p-6 border border-gray-800 rounded-xl bg-gray-900/30"
            >
              <div className="text-blue-400 font-bold">Step {i + 1}</div>
              <p className="mt-2 text-gray-300">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 text-center py-24">
        <h2 className="text-3xl font-bold">
          Build your open source profile 🚀
        </h2>

        <p className="text-gray-400 mt-3">
          Discover, contribute, and grow with real projects.
        </p>

        <button
          onClick={() =>
              signIn("github", { callbackUrl: "/dashboard" })
            }
          className="inline-block mt-8 px-8 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition"
        >
          Launch App
        </button>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 text-center py-10 text-gray-500 border-t border-gray-900">
        Built for developers • OpenPR
      </footer>
    </div>
  );
}