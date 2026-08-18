"use client";

import type { SystemMark } from "@/lib/types";

/**
 * The flat system tiles that anchor the left edge of a console home row. They
 * take focus and grow like any other tile so the row feels complete, but
 * activating them does nothing, so they carry no arrow strip.
 */

/** Square and triangle on the top row, cross and circle below. */
function FaceShapes({
  cx,
  cy,
  size,
  stroke,
  width,
}: {
  cx: number;
  cy: number;
  size: number;
  stroke: string;
  width: number;
}) {
  const gap = size * 0.62;
  const r = size / 2;

  return (
    <g fill="none" stroke={stroke} strokeWidth={width} strokeLinejoin="round" strokeLinecap="round">
      {/* square, top left */}
      <rect x={cx - gap - r} y={cy - gap - r} width={size} height={size} rx={size * 0.06} />
      {/* triangle, top right */}
      <path
        d={`M ${cx + gap} ${cy - gap - r} L ${cx + gap + r} ${cy - gap + r} L ${cx + gap - r} ${cy - gap + r} Z`}
      />
      {/* cross, bottom left */}
      <path
        d={`M ${cx - gap - r} ${cy + gap - r} L ${cx - gap + r} ${cy + gap + r} M ${cx - gap + r} ${cy + gap - r} L ${cx - gap - r} ${cy + gap + r}`}
      />
      {/* circle, bottom right */}
      <circle cx={cx + gap} cy={cy + gap} r={r} />
    </g>
  );
}

function ShapesMark() {
  return (
    <>
      <rect width="200" height="200" fill="url(#system-plain)" />
      <FaceShapes cx={100} cy={100} size={34} stroke="rgba(255,255,255,0.92)" width={5} />
    </>
  );
}

/** A shopping bag carrying the same four shapes. */
function StoreMark() {
  return (
    <>
      <rect width="200" height="200" fill="url(#system-plain)" />

      {/* handles */}
      <path
        d="M76 66 V54 a24 24 0 0 1 48 0 v12"
        fill="none"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* bag body */}
      <path
        d="M50 66 h100 l9 88 a8 8 0 0 1 -8 9 H49 a8 8 0 0 1 -8 -9 Z"
        fill="url(#system-bag)"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      <FaceShapes cx={100} cy={116} size={22} stroke="rgba(255,255,255,0.95)" width={4} />
    </>
  );
}

export function SystemArt({ mark }: { mark: SystemMark }) {
  return (
    <div className="h-full w-full">
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="system-plain" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#1f5bb8" />
            <stop offset="100%" stopColor="#123a86" />
          </linearGradient>
          <linearGradient id="system-bag" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#3f86dd" />
            <stop offset="100%" stopColor="#1c56ad" />
          </linearGradient>
        </defs>
        {mark === "shapes" ? <ShapesMark /> : <StoreMark />}
      </svg>
    </div>
  );
}
