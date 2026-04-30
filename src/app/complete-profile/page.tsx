import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";

export default async function CompleteProfilePage() {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Please register first to complete your profile.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Welcome, {session.user?.name || session.user?.email}!
            </p>
            <p className="text-sm text-muted-foreground">
              Your username: <span className="font-medium">Loading...</span>
            </p>
          </div>

          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">
              Profile completion form will be implemented here.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              This will include: bio, avatar upload, and other profile details.
            </p>
          </div>

          <Button asChild className="w-full">
            <Link href="/dashboard">Skip for now</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
