"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";
import { TileArt } from "./TileArt";
import { ChevronIcon, FolderIcon } from "./Icons";
import type { Tile } from "@/lib/types";

interface TileCardProps {
  tile: Tile;
  focused: boolean;
  open: boolean;
  /** Tiles shrink once something is open, to leave the panel room. */
  size: { focused: number; resting: number };
  onFocus: () => void;
  onHover: () => void;
  onActivate: () => void;
}

/** A folder shows a 2x2 peek of the covers inside it. */
function FolderArt({ tile }: { tile: Extract<Tile, { kind: "folder" }> }) {
  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-[2px] bg-white/12 p-[2px]">
      {Array.from({ length: 4 }, (_, index) => {
        const card = tile.cards[index];
        return card ? (
          <TileArt
            key={card.id}
            motif={card.art.motif}
            from={card.art.from}
            to={card.art.to}
            monogram={card.art.monogram}
          accent={card.art.accent}
          image={card.art.image}
          imageFit={card.art.imageFit}
            className="h-full w-full overflow-hidden"
          />
        ) : (
          <span key={`empty-${index}`} className="h-full w-full bg-base-deep/70" />
        );
      })}
    </div>
  );
}

export const TileCard = forwardRef<HTMLButtonElement, TileCardProps>(function TileCard(
  { tile, focused, open, size, onFocus, onHover, onActivate },
  ref,
) {
  const title = tile.kind === "folder" ? tile.title : tile.card.title;
  const description = tile.kind === "folder" ? tile.tagline : tile.card.tagline;

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-expanded={open}
      aria-label={`${title}. ${description}`}
      tabIndex={focused ? 0 : -1}
      onFocus={onFocus}
      onMouseEnter={onHover}
      onClick={onActivate}
      // Without this the first paint has no width, so the intrinsic size of the
      // art (~600px) is what the spring animates down from, which flashes.
      initial={false}
      animate={{
        width: focused ? size.focused : size.resting,
        height: focused ? size.focused : size.resting,
      }}
      transition={{ type: "spring", stiffness: 240, damping: 30, mass: 0.9 }}
      className={[
        "relative shrink-0 self-start overflow-hidden rounded-[4px] ring-1 ring-white/12",
        "outline-none transition-shadow duration-200 ease-console",
        // Only one box-shadow utility at a time. Stylesheet order, not class
        // order, decides which wins if both are applied.
        focused ? "z-10 shadow-focus" : "shadow-tile opacity-[0.88] hover:opacity-100",
      ].join(" ")}
    >
      {tile.kind === "folder" ? (
        <FolderArt tile={tile} />
      ) : (
        <TileArt
          motif={tile.card.art.motif}
          from={tile.card.art.from}
          to={tile.card.art.to}
          monogram={tile.card.art.monogram}
          accent={tile.card.art.accent}
          image={tile.card.art.image}
          imageFit={tile.card.art.imageFit}
          className="h-full w-full"
        />
      )}

      {tile.kind === "folder" && !focused && (
        <span className="absolute bottom-1.5 right-1.5 flex items-center gap-1 rounded-sm bg-black/45 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-ink-soft backdrop-blur-sm">
          <FolderIcon className="h-3 w-3" />
          {tile.cards.length}
        </span>
      )}

      {/* The focused tile carries the affordance that says "this opens below". */}
      {focused && (
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.05 }}
          className="absolute inset-x-0 bottom-0 flex h-7 items-center justify-center border-t border-white/25 bg-white/30 backdrop-blur-sm"
        >
          <ChevronIcon
            strokeWidth={2.25}
            className={[
              "h-4 w-4 text-white transition-transform duration-300 ease-console",
              open ? "-rotate-90" : "rotate-90",
            ].join(" ")}
          />
        </motion.span>
      )}

      {/* Subtle top sheen that strengthens on focus, the "lit" state. */}
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 transition-opacity duration-300",
          focused ? "opacity-100" : "opacity-0",
          "bg-[linear-gradient(180deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_45%)]",
        ].join(" ")}
      />
    </motion.button>
  );
});
