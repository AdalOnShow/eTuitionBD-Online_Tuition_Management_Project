"use client";

import Link from "next/link";

import { BackgroundPaths } from "@/components/ui/background-paths";
import { Button } from "@/components/ui/button";
import { LandingNavbar } from "@/components/landing/landing-navbar";

const stats = [
  ["64", "districts covered"],
  ["3-step", "profile setup"],
  ["Role-based", "student and tutor dashboards"],
] as const;

const routeSteps = [
  "Register and verify email",
  "Choose student or tutor",
  "Use a focused dashboard",
] as const;

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <BackgroundPaths variant="backdrop" />
      </div>

      <LandingNavbar />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center px-4 pb-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-8">
        <div className="w-full space-y-10 lg:max-w-xl">
          <div className="inline-flex items-center rounded-full border border-emerald-200/80 bg-white/70 px-4 py-2 text-sm font-medium text-emerald-800 shadow-sm backdrop-blur">
            Bangladesh-first tuition marketplace
          </div>

          <header className="space-y-6">
            <h1 className="max-w-3xl text-center text-5xl font-semibold tracking-tight text-slate-950 sm:text-7xl lg:text-left">
              Find the right tutor without chasing referrals.
            </h1>
            <p className="max-w-2xl text-center text-lg leading-8 text-slate-600 lg:text-left">
              eTuitionBD connects students, guardians, and tutors through clear
              profiles, verified account flows, and role-specific dashboards.
            </p>
          </header>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="rounded-full bg-primary px-7">
              <Link href="/register">Create account</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full bg-white/60 px-7"
            >
              <Link href="/tuitions">Browse tuitions</Link>
            </Button>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-3">
            {stats.map(([value, label]) => (
              <div
                key={label}
                className="rounded-lg border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur"
              >
                <p className="text-2xl font-semibold text-slate-950">
                  {value}
                </p>
                <p className="text-sm text-slate-600">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="mt-10 w-full max-w-xl lg:mt-0">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/90 bg-slate-950 p-6 text-white shadow-2xl">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />

            <div className="relative space-y-5">
              <div className="rounded-2xl bg-white p-6 text-slate-950">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  Today’s route
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  Complete profile, then land on your dashboard.
                </h2>
              </div>

              <div className="space-y-3">
                {routeSteps.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-2xl bg-white/10 p-4"
                  >
                    <span className="grid size-9 place-items-center rounded-full bg-emerald-300 text-sm font-bold text-slate-950">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/complete-profile">Start profile setup</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="rounded-full bg-white/5 px-6 text-white"
                >
                  <Link href="/about">Learn how it works</Link>
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="relative pb-20 pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 rounded-lg border border-white/60 bg-white/50 p-6 backdrop-blur sm:grid-cols-3">
            {[
              {
                title: "Clear profiles",
                desc: "See tutors’ subjects, experience, and availability — without guesswork.",
              },
              {
                title: "Verified flows",
                desc: "Email verification and secure role-based access help keep things reliable.",
              },
              {
                title: "Role dashboards",
                desc: "Students and tutors each get a workflow designed for their next step.",
              },
            ].map((f) => (
              <div key={f.title} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-950">
                  {f.title}
                </h3>
                <p className="text-sm leading-6 text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

