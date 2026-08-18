"use client";

import { useHome } from "./HomeProvider";

/**
 * The console's button hints, reinterpreted as keyboard hints. Reflects the
 * current state, so the hint is always the action that will actually happen.
 */
export function ControllerHints() {
  const { isIdle, openFolderId, expandedId } = useHome();

  const openLabel = openFolderId ? "Open item" : expandedId ? "Collapse" : "Open";
  const backLabel = openFolderId || expandedId ? "Back" : null;

  return (
    <div className="pointer-events-none flex items-center justify-end gap-5 px-1 py-4 text-xs text-ink-muted">
      <span className="hidden items-center gap-2 sm:flex">
        <Key>←</Key>
        <Key>→</Key>
        Browse
      </span>

      {openLabel && (
        <span className="flex items-center gap-2">
          <Key>Enter</Key>
          {openLabel}
        </span>
      )}

      {backLabel && (
        <span className="flex items-center gap-2">
          <Key>Esc</Key>
          {backLabel}
        </span>
      )}

      {isIdle && (
        <span className="hidden items-center gap-2 sm:flex">
          <Key>Tab</Key>
          Links
        </span>
      )}
    </div>
  );
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-white/18 bg-white/[0.06] px-1.5 py-0.5 font-sans text-[11px] font-medium not-italic text-ink-soft">
      {children}
    </kbd>
  );
}
