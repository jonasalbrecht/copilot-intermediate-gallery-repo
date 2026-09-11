"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY } from "./theme-constants";

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);
  window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    applyTheme(next);
  };

  const label = mounted
    ? isDark
      ? "Switch to light theme"
      : "Switch to dark theme"
    : "Toggle theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={mounted ? isDark : undefined}
      title={label}
      className="btn-icon"
    >
      {mounted && isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
