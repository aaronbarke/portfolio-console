"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { TileCard } from "./TileCard";
import { ExpandPanel } from "./ExpandPanel";
import { FolderGrid } from "./FolderTile";
import { useHome } from "./HomeProvider";
import { allProjects } from "@/lib/projects";

export function TileRow() {
  const {
    tiles,
    focusIndex,
    expandedId,
    openFolderId,
    folderFocusIndex,
    folderSelectedId,
    dispatch,
  } = useHome();

  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const focusedTile = tiles[focusIndex];

  // Keep the focused tile on screen when the row overflows (mobile especially).
  useEffect(() => {
    tileRefs.current[focusIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [focusIndex]);

  const openKey = expandedId ?? openFolderId;

  useEffect(() => {
    if (!openKey) return;
    // Let the height spring get underway before measuring where to scroll.
    const id = window.setTimeout(() => {
      // Pin the row near the top so the panel below it has room, rather than
      // letting the expansion open entirely below the fold.
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 220);
    return () => window.clearTimeout(id);
  }, [openKey]);

  const expandedProject = expandedId
    ? (allProjects.find((project) => project.id === expandedId) ?? null)
    : null;

  const openFolder =
    openFolderId != null
      ? tiles.find((tile) => tile.kind === "folder" && tile.id === openFolderId)
      : undefined;

  const headingTitle =
    focusedTile?.kind === "folder"
      ? focusedTile.title
      : focusedTile?.project.title;
  const headingBlurb =
    focusedTile?.kind === "folder"
      ? focusedTile.blurb
      : focusedTile?.project.tagline;

  return (
    <section
      ref={sectionRef}
      aria-label="Featured work"
      className="w-full scroll-mt-6"
    >
      <div className="mb-3 flex items-baseline gap-3 px-1">
        <span className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
          Featured work
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <div
        role="group"
        aria-label="Featured work"
        className="scrollbar-none flex min-h-[168px] items-end gap-3 overflow-x-auto px-1 pb-1 pt-5 sm:min-h-[196px] sm:gap-4 sm:pt-6"
      >
        {tiles.map((tile, index) => {
          const id = tile.kind === "folder" ? tile.id : tile.project.id;
          return (
            <TileCard
              key={id}
              ref={(node) => {
                tileRefs.current[index] = node;
              }}
              tile={tile}
              focused={index === focusIndex}
              open={
                tile.kind === "folder"
                  ? openFolderId === tile.id
                  : expandedId === id
              }
              onFocus={() => dispatch({ type: "focus", index })}
              onActivate={() => dispatch({ type: "activateTile", index })}
            />
          );
        })}
      </div>

      {/* Focused-tile caption, mirroring how a console names the highlighted item. */}
      <div className="mt-4 min-h-[52px] px-1">
        <motion.div
          key={headingTitle}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-xl font-semibold tracking-tight text-shadow-soft sm:text-2xl">
            {headingTitle}
          </h1>
          <p className="mt-0.5 text-sm text-ink-soft">{headingBlurb}</p>
        </motion.div>
      </div>

      <AnimatePresence initial={false} mode="wait">
        {expandedProject ? (
          <ExpandPanel key={expandedProject.id} project={expandedProject} />
        ) : openFolder && openFolder.kind === "folder" ? (
          <FolderGrid
            key={openFolder.id}
            title={openFolder.title}
            projects={openFolder.projects}
            focusIndex={folderFocusIndex}
            selectedId={folderSelectedId}
            onFocusItem={(index) =>
              dispatch({ type: "focusFolderItem", index })
            }
            onSelectItem={(index) =>
              dispatch({ type: "selectFolderItem", index })
            }
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
