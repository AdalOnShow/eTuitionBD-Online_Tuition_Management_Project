"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

type Theme = "light" | "dark" | "system";

const CYCLE_ORDER: Theme[] = ["system", "light", "dark"];

const THEME_LABELS: Record<Theme, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button type="button" variant="outline" size="lg" className="gap-2" disabled>
        <Monitor className="size-4" />
        <span className="hidden sm:inline">System</span>
      </Button>
    );
  }

  const currentTheme = (theme as Theme | undefined) ?? "system";
  const themeLabel = THEME_LABELS[currentTheme];
  const themeIcon =
    currentTheme === "light" ? (
      <Sun className="size-4" />
    ) : currentTheme === "dark" ? (
      <Moon className="size-4" />
    ) : (
      <Monitor className="size-4" />
    );

  const handleCycleTheme = () => {
    const currentIndex = CYCLE_ORDER.indexOf(currentTheme);
    const nextTheme = CYCLE_ORDER[(currentIndex + 1) % CYCLE_ORDER.length];
    setTheme(nextTheme);
  };

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
  );
}
