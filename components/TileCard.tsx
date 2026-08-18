"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";
import { TileArt } from "./TileArt";
import { FolderIcon } from "./Icons";
import type { Tile } from "@/lib/types";

interface TileCardProps {
  tile: Tile;
  focused: boolean;
  open: boolean;
  onFocus: () => void;
  onActivate: () => void;
}

/** A folder shows a 2×2 peek of the covers inside it. */
function FolderArt({ tile }: { tile: Extract<Tile, { kind: "folder" }> }) {
  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-[2px] bg-white/10 p-[2px]">
      {tile.projects.slice(0, 4).map((project) => (
        <TileArt
          key={project.id}
          motif={project.art.motif}
          from={project.art.from}
          to={project.art.to}
          monogram={project.art.monogram}
          className="h-full w-full overflow-hidden"
        />
      ))}
    </div>
  );
}

export const TileCard = forwardRef<HTMLButtonElement, TileCardProps>(function TileCard(
  { tile, focused, open, onFocus, onActivate },
  ref,
) {
  const title = tile.kind === "folder" ? tile.title : tile.project.title;
  const description = tile.kind === "folder" ? tile.blurb : tile.project.tagline;

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-expanded={open}
      aria-label={`${title} — ${description}`}
      tabIndex={focused ? 0 : -1}
      onFocus={onFocus}
      onMouseEnter={onFocus}
      onClick={onActivate}
      animate={{
        width: focused ? 176 : 128,
        height: focused ? 176 : 128,
      }}
      transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.7 }}
      className={[
        "relative shrink-0 self-end overflow-hidden rounded-[6px]",
        "outline-none transition-shadow duration-200 ease-console",
        // Only one box-shadow utility at a time — stylesheet order, not class
        // order, decides which wins if both are applied.
        focused ? "z-10 shadow-focus" : "shadow-tile opacity-[0.86] hover:opacity-100",
      ].join(" ")}
    >
      {tile.kind === "folder" ? (
        <FolderArt tile={tile} />
      ) : (
        <TileArt
          motif={tile.project.art.motif}
          from={tile.project.art.from}
          to={tile.project.art.to}
          monogram={tile.project.art.monogram}
          className="h-full w-full"
        />
      )}

      {tile.kind === "folder" && (
        <span className="absolute bottom-1.5 right-1.5 flex items-center gap-1 rounded-sm bg-black/55 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-ink-soft backdrop-blur-sm">
          <FolderIcon className="h-3 w-3" />
          {tile.projects.length}
        </span>
      )}

      {/* Subtle top sheen that strengthens on focus — the "lit" state. */}
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 transition-opacity duration-300",
          focused ? "opacity-100" : "opacity-0",
          "bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0)_45%)]",
        ].join(" ")}
      />
    </motion.button>
  );
});
