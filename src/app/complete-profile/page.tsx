import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { getProfileStatus } from "@/server/auth/profile-status.service";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CompleteProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const profileStatus = await getProfileStatus();

  if (profileStatus.success && profileStatus.data.profileComplete) {
    if (profileStatus.data.role === "TUTOR") {
      redirect("/tutor");
    }
    if (profileStatus.data.role === "ADMIN") {
      redirect("/admin");
    }
    redirect("/student");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_35%),linear-gradient(180deg,_rgba(248,250,252,1),_rgba(240,253,244,0.75))] px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-700">
            Profile setup
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
            Choose how you want to use eTuitionBD
          </h1>
          <p className="text-base leading-7 text-slate-600">
            Your account is verified. Select the path that matches what you need
            right now. You will complete the matching profile next.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Card className="border-emerald-200 bg-white/90 shadow-[0_18px_60px_-30px_rgba(16,185,129,0.45)]">
            <CardHeader>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-700">
                Student
              </p>
              <CardTitle className="text-2xl text-slate-950">
                Find a tutor for your learning goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm leading-6 text-slate-600">
                Post tuition needs, manage applications, and keep your learning
                preferences in one place.
              </p>
              <Button asChild className="h-11 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700">
                <Link href="/complete-profile/student">Continue as student</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-white/90 shadow-[0_18px_60px_-30px_rgba(245,158,11,0.45)]">
            <CardHeader>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-amber-700">
                Tutor
              </p>
              <CardTitle className="text-2xl text-slate-950">
                Build your teaching profile and get hired
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm leading-6 text-slate-600">
                Showcase experience, subjects, and rates so students can find
                and trust you quickly.
              </p>
              <Button asChild className="h-11 w-full rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400">
                <Link href="/complete-profile/tutor">Continue as tutor</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
