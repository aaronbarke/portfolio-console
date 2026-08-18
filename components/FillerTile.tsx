"use client";

/**
 * The flat system tiles that anchor the left edge of a console home row. They
 * are decorative: not focusable, skipped by the keyboard model, and hidden from
 * screen readers, because they lead nowhere.
 *
 * Deliberately original marks rather than any manufacturer's iconography, which
 * is the constraint this whole build has been held to.
 */
type FillerKind = "shapes" | "store";

function ShapesMark() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
      <g
        fill="none"
        stroke="rgba(255,255,255,0.68)"
        strokeWidth="4.5"
        strokeLinejoin="round"
      >
        <rect x="46" y="46" width="34" height="34" rx="2" />
        <path d="M137 44 L155 78 L119 78 Z" />
        <circle cx="63" cy="137" r="18" />
        <path d="M119 120 L155 120 L137 156 Z" />
      </g>
    </svg>
  );
}

function StoreMark() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
      <g
        fill="none"
        stroke="rgba(255,255,255,0.68)"
        strokeWidth="4.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M58 74 h84 l8 76 h-100 Z" />
        <path d="M80 88 V62 a20 20 0 0 1 40 0 v26" />
      </g>
    </svg>
  );
}

export function FillerTile({ kind, size }: { kind: FillerKind; size: number }) {
  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="relative shrink-0 self-start overflow-hidden rounded-[4px] bg-[linear-gradient(160deg,rgba(28,79,166,0.72)_0%,rgba(11,44,116,0.72)_100%)] ring-1 ring-white/12"
    >
      {kind === "shapes" ? <ShapesMark /> : <StoreMark />}
    </div>
  );
}
