"use client"

import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    await signOut({ callbackUrl: "/login" })
  }

  return (
    <Button type="button" variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  )
}
