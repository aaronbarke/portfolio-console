"use client";

import { useEffect, useState } from "react";

/**
 * Tile sizes measured off a 1080p console screenshot: resting tiles are ~200px
 * and the focused one ~336px at 1920 wide, a ratio of about 1.68. Those are expressed as a fraction of
 * viewport width so the proportions hold on other displays, clamped so they
 * stay sane on a phone and stop growing on an ultrawide.
 */
const RESTING_RATIO = 200 / 1920;
const FOCUSED_RATIO = 336 / 1920;

/** Everything steps down when a panel is open, to leave it room. */
const OPEN_SCALE = 0.72;

export interface TileSize {
  resting: number;
  focused: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function measure(width: number, anythingOpen: boolean): TileSize {
  const scale = anythingOpen ? OPEN_SCALE : 1;
  return {
    resting: Math.round(clamp(width * RESTING_RATIO, 108, 200) * scale),
    focused: Math.round(clamp(width * FOCUSED_RATIO, 176, 336) * scale),
  };
}

export function useTileSize(anythingOpen: boolean): TileSize {
  // Server render and first paint use the 1920 reference sizes; the effect
  // corrects them before anything is interactive.
  const [width, setWidth] = useState(1920);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return measure(width, anythingOpen);
}
