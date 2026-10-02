/** localStorage key holding the visitor's theme ("dark" | "light"). */
export const THEME_STORAGE_KEY = "theme";

/**
 * Runs before first paint (next/script, beforeInteractive) so a stored light
 * theme never flashes dark. Dark is the CSS default on :root.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}})();`;
