"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // Clear cookies client-side
    document.cookie = "access_token=; path=/; max-age=0";
    document.cookie = "refresh_token=; path=/; max-age=0";
    router.push("/login");
  };

  return (
    <Button type="button" variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
