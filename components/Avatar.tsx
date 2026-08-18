"use client";

import { useState } from "react";
import { profile } from "@/lib/profile";

/**
 * Uses public/me.jpg when it exists and falls back to initials when it does
 * not, so the status bar never shows a broken image.
 */
export function Avatar({ size = 34 }: { size?: number }) {
  const [failed, setFailed] = useState(false);

  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (!failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/me.jpg"
        alt=""
        width={size}
        height={size}
        onError={() => setFailed(true)}
        style={{ width: size, height: size }}
        className="shrink-0 rounded-full object-cover ring-1 ring-white/25"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-[linear-gradient(140deg,#9ed6ff_0%,#1651a8_50%,#022c8a_100%)] font-semibold tracking-wide text-white ring-1 ring-white/25"
    >
      {initials}
    </span>
  );
}
