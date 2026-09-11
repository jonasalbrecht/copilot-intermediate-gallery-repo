"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY } from "./theme-init";

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);
  window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
}

export function ThemeToggle() {
  // The inline init script in <head> runs before hydration and already
  // applies the persisted (or OS-preferred) theme to <html>. Reading the
  // DOM here (rather than defaulting to `false` and syncing in an effect)
  // avoids a visible icon flash on load. This intentionally differs from
  // the server-rendered markup when the resolved theme is dark, which is
  // why the button below is marked `suppressHydrationWarning`.
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    // If the user hasn't made an explicit choice yet, keep following the
    // OS preference while the app is open.
    if (window.localStorage.getItem(THEME_STORAGE_KEY)) {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      // Ignore OS changes once the user has made an explicit choice.
      if (window.localStorage.getItem(THEME_STORAGE_KEY)) {
        return;
      }
      setIsDark(event.matches);
      document.documentElement.classList.toggle("dark", event.matches);
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    applyTheme(next);
  };

  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      className="btn-icon"
      suppressHydrationWarning
    >
      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
