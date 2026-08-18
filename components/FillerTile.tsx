"use client";

import type { SystemMark } from "@/lib/types";

/**
 * The flat system tiles that anchor the left edge of a console home row. They
 * take focus and grow like any other tile so the row feels complete, but
 * activating them does nothing, so they carry no arrow strip.
 *
 * The marks are drawn original rather than copied from any manufacturer's
 * iconography, which is the constraint this whole build has been held to.
 */
function ShapesMark() {
  return (
    <g
      fill="none"
      stroke="rgba(255,255,255,0.72)"
      strokeWidth="4.5"
      strokeLinejoin="round"
    >
      <rect x="46" y="46" width="34" height="34" rx="2" />
      <path d="M137 44 L155 78 L119 78 Z" />
      <circle cx="63" cy="137" r="18" />
      <path d="M119 120 L155 120 L137 156 Z" />
    </g>
  );
}

function StoreMark() {
  return (
    <g
      fill="none"
      stroke="rgba(255,255,255,0.72)"
      strokeWidth="4.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M58 74 h84 l8 76 h-100 Z" />
      <path d="M80 88 V62 a20 20 0 0 1 40 0 v26" />
    </g>
  );
}

export function SystemArt({ mark }: { mark: SystemMark }) {
  return (
    <div className="h-full w-full bg-[linear-gradient(160deg,rgba(28,79,166,0.85)_0%,rgba(11,44,116,0.85)_100%)]">
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        {mark === "shapes" ? <ShapesMark /> : <StoreMark />}
      </svg>
    </div>
  );
}
