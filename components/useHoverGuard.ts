"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Guards against hover events the user did not perform.
 *
 * Focusing or opening a tile resizes the row, which can slide a different tile
 * under a cursor that never moved. The browser then reports that as a hover,
 * and focus jumps to whatever landed under the pointer.
 *
 * Watching for mousemove is not enough on its own: Chrome dispatches a
 * mousemove when content shifts beneath a stationary pointer, which looks
 * identical to real movement. The coordinates are the tell, so the guard only
 * re-arms when the pointer is actually somewhere new.
 */
export function useHoverGuard() {
  const armed = useRef(true);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const previous = lastPoint.current;
      const moved = !previous || previous.x !== event.clientX || previous.y !== event.clientY;
      lastPoint.current = { x: event.clientX, y: event.clientY };
      if (moved) armed.current = true;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /** Call from a layout effect whenever the layout is about to change. */
  const disarm = useCallback(() => {
    armed.current = false;
  }, []);

  return { armed, disarm };
}
