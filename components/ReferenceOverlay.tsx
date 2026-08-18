"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Development-only pixel-matching aid. Renders a reference screenshot fixed
 * over the viewport so misalignment against the live layout is obvious, rather
 * than something you try to hold in your head while alt-tabbing.
 *
 * Any image dropped into public/reference/ is picked up automatically, so the
 * filename does not matter.
 */
const BLEND_MODES = ["normal", "difference"] as const;

export function ReferenceOverlay() {
  const [images, setImages] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [opacity, setOpacity] = useState(0.5);
  const [blend, setBlend] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/reference")
      .then((response) => response.json())
      .then((data: { images?: string[] }) => {
        if (!cancelled) setImages(data.images ?? []);
      })
      .catch(() => {
        if (!cancelled) setImages([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
        setIndex((value) => value - 1);
        break;
      case ".":
        setIndex((value) => value + 1);
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

  // Wrap in both directions so , and . cycle regardless of how many files exist.
  const count = images.length;
  const source = count > 0 ? images[((index % count) + count) % count] : null;

  return (
    <>
      {visible && (
        <div className="pointer-events-none fixed inset-0 z-[100]">
          {source ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={source}
              alt=""
              style={{ opacity, mixBlendMode: BLEND_MODES[blend] }}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-x-0 top-1/3 mx-auto max-w-md rounded-lg bg-black/80 p-5 text-center text-sm text-white">
              <p className="font-semibold">Nothing in public/reference/</p>
              <p className="mt-2 text-white/70">
                Drop an image in there and reload. Any filename works.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="pointer-events-none fixed bottom-3 left-3 z-[101] rounded-md bg-black/70 px-3 py-2 font-mono text-[11px] leading-relaxed text-white/80 backdrop-blur-sm">
        {visible ? (
          <>
            <span className="text-white">reference on</span> ·{" "}
            {source ? source.split("/").pop() : "no images"} · {Math.round(opacity * 100)}% ·{" "}
            {BLEND_MODES[blend]}
            {count > 1 && ` · ${(((index % count) + count) % count) + 1}/${count}`}
            <br />
            <span className="text-white/55">r hide · [ ] opacity · , . image · b blend</span>
          </>
        ) : (
          <span className="text-white/55">
            press r for reference overlay{count > 0 ? ` (${count})` : ""}
          </span>
        )}
      </div>
    </>
  );
}
