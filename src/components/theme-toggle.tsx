"use client"

import { Monitor, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

const STORAGE_KEY = "theme"
const CYCLE_ORDER: Theme[] = ["system", "light", "dark"]

function getStoredTheme(): Theme {
  const value = localStorage.getItem(STORAGE_KEY)

  if (value === "light" || value === "dark" || value === "system") {
    return value
  }

  return "system"
}

function applyTheme(theme: Theme) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  const shouldUseDark = theme === "dark" || (theme === "system" && prefersDark)

  document.documentElement.classList.toggle("dark", shouldUseDark)
  document.documentElement.setAttribute("data-theme", theme)
}

function getThemeLabel(theme: Theme) {
  if (theme === "light") return "Light"
  if (theme === "dark") return "Dark"
  return "System"
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const storedTheme = getStoredTheme()
    setTheme(storedTheme)
    applyTheme(storedTheme)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) {
      return
    }

    localStorage.setItem(STORAGE_KEY, theme)
    applyTheme(theme)
  }, [mounted, theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleSystemThemeChange = () => {
      if (theme === "system") {
        applyTheme("system")
      }
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange)
    }
  }, [theme])

  const currentTheme = mounted ? theme : "system"
  const themeLabel = getThemeLabel(currentTheme)
  const themeIcon =
    currentTheme === "light" ? (
      <Sun className="size-4" />
    ) : currentTheme === "dark" ? (
      <Moon className="size-4" />
    ) : (
      <Monitor className="size-4" />
    )

  const handleCycleTheme = () => {
    const currentIndex = CYCLE_ORDER.indexOf(currentTheme)
    const nextTheme = CYCLE_ORDER[(currentIndex + 1) % CYCLE_ORDER.length]
    setTheme(nextTheme)
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      aria-label={`Theme: ${themeLabel}. Click to switch theme.`}
      title={`Theme: ${themeLabel}`}
      onClick={handleCycleTheme}
      className="gap-2"
    >
      {themeIcon}
      <span className="hidden sm:inline">{themeLabel}</span>
    </Button>
  )
}
