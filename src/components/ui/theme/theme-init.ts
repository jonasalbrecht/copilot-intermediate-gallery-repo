export const THEME_STORAGE_KEY = "theme";

/**
 * Inline script executed before hydration to apply the persisted theme
 * (or the operating system preference on first visit) and avoid a flash
 * of the incorrect theme.
 */
export const themeInitScript = `(function() {
  try {
    var storageKey = ${JSON.stringify(THEME_STORAGE_KEY)};
    var stored = localStorage.getItem(storageKey);
    var isDark = stored
      ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {}
})();`;
