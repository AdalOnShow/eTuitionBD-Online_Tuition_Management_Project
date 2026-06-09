import Link from "next/link";

import { LogoutButton } from "@/components/auth/logout-button";

export default function TutorDashboardPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,_#fff7ed,_#f8fafc_50%,_#ecfdf5)] px-4 py-10">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col justify-between gap-4 rounded-[2rem] border bg-white/80 p-6 shadow-sm md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
              Tutor dashboard
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">
              Track opportunities and improve your tutor profile.
            </h1>
          </div>
          <LogoutButton />
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Matching queue", "See tuitions aligned with your subjects and rate."],
            ["Applications", "Monitor submitted proposals and current status."],
            ["Teaching profile", "Keep subjects, credentials, and pricing accurate."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-3xl border bg-white/85 p-6">
              <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
            </article>
          ))}
        </div>
        <Link
          href="/tuitions"
          className="inline-flex rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white"
        >
          Explore open tuitions
        </Link>
      </section>
    </main>
  );
}
