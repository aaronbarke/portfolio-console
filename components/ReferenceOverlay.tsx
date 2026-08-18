"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Development-only pixel-matching aid. Renders a reference screenshot fixed
 * over the viewport so misalignment against the live layout is obvious, rather
 * than something you try to hold in your head while alt-tabbing.
 *
 * Drop 1920x1080 PNGs into public/reference/ and list them here.
 */
const REFERENCE_IMAGES = [
  "/reference/home.png",
  "/reference/folder.png",
  "/reference/background.png",
];

const BLEND_MODES = ["normal", "difference"] as const;

export function ReferenceOverlay() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [opacity, setOpacity] = useState(0.5);
  const [blend, setBlend] = useState(0);
  const [failed, setFailed] = useState(false);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    const target = event.target;
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      (target instanceof HTMLElement && target.isContentEditable)
    ) {
      return;
    }
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    switch (event.key) {
      case "r":
        setVisible((value) => !value);
        break;
      case "[":
        setOpacity((value) => Math.max(0.05, Number((value - 0.05).toFixed(2))));
        break;
      case "]":
        setOpacity((value) => Math.min(1, Number((value + 0.05).toFixed(2))));
        break;
      case ",":
        setFailed(false);
        setIndex((value) => (value - 1 + REFERENCE_IMAGES.length) % REFERENCE_IMAGES.length);
        break;
      case ".":
        setFailed(false);
        setIndex((value) => (value + 1) % REFERENCE_IMAGES.length);
        break;
      case "b":
        setBlend((value) => (value + 1) % BLEND_MODES.length);
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const source = REFERENCE_IMAGES[index];

  return (
    <>
      {visible && (
        <div className="pointer-events-none fixed inset-0 z-[100]">
          {failed ? (
            <div className="absolute inset-x-0 top-1/3 mx-auto max-w-md rounded-lg bg-black/80 p-5 text-center text-sm text-white">
              <p className="font-semibold">No reference image at {source}</p>
              <p className="mt-2 text-white/70">
                Save a 1920x1080 screenshot there, or press . to try the next one.
              </p>
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={source}
              alt=""
              onError={() => setFailed(true)}
              style={{ opacity, mixBlendMode: BLEND_MODES[blend] }}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      )}

      <div className="pointer-events-none fixed bottom-3 left-3 z-[101] rounded-md bg-black/70 px-3 py-2 font-mono text-[11px] leading-relaxed text-white/80 backdrop-blur-sm">
        {visible ? (
          <>
            <span className="text-white">reference on</span> · {source.split("/").pop()} ·{" "}
            {Math.round(opacity * 100)}% · {BLEND_MODES[blend]}
            <br />
            <span className="text-white/55">
              r hide · [ ] opacity · , . image · b blend
            </span>
          </>
        ) : (
          <span className="text-white/55">press r for reference overlay</span>
        )}
      </div>
    </>
  );
}
