import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";

export default async function ProfileSuccessPage() {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Please complete your profile first.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-green-600">
            Profile Completed Successfully!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="space-y-2">
            <p className="text-lg">
              Congratulations,{" "}
              <span className="font-semibold">{session.user.name}</span>!
            </p>
            <p className="text-muted-foreground">
              Your {session.user.role === "STUDENT" ? "student" : "tutor"}{" "}
              profile has been created successfully.
            </p>
          </div>

          <div className="rounded-lg border border-dashed p-6 bg-muted/50">
            <h3 className="text-lg font-semibold mb-2">What&apos;s Next?</h3>
            <p className="text-muted-foreground mb-6">
              You can now explore all the features available to you as a{" "}
              {session.user.role === "STUDENT" ? "student" : "tutor"}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">Go to Homepage</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link
                href={`/${session.user.role === "STUDENT" ? "student" : "tutor"}`}
              >
                Go to Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
