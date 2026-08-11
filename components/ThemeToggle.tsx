'use client';

const KEY = 'dtj-theme';

/**
 * Explicit light/dark pick, persisted. Deliberately does not follow
 * prefers-color-scheme once the reader has chosen — see the design system's
 * dark-mode note.
 *
 * The label is driven by CSS off the `data-theme` attribute rather than React
 * state, so it is correct in the server-rendered HTML and never flashes the
 * wrong word during hydration.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // private mode — the pick just won't survive the session
    }
  }

  return (
    <button type="button" className="dtj-theme-toggle" onClick={toggle} aria-label="Toggle dark mode">
      <span className="dtj-when-light">Dark</span>
      <span className="dtj-when-dark">Light</span>
    </button>
  );
}

/** Runs before paint so an explicit dark pick never flashes light. */
export const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(KEY)});if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();`;
