"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useRef } from "react";
import { TileCard } from "./TileCard";
import { ExpandPanel } from "./ExpandPanel";
import { FolderGrid } from "./FolderTile";
import { useHome } from "./HomeProvider";
import { allCards } from "@/lib/sections";

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

  // Keep the focused tile on screen when the row overflows.
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
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 220);
    return () => window.clearTimeout(id);
  }, [openKey]);

  const expandedCard = expandedId ? (allCards.find((c) => c.id === expandedId) ?? null) : null;

  const openFolder =
    openFolderId != null
      ? tiles.find((tile) => tile.kind === "folder" && tile.id === openFolderId)
      : undefined;

  const headingTitle = focusedTile?.kind === "folder" ? focusedTile.title : focusedTile?.card.title;
  const headingBlurb =
    focusedTile?.kind === "folder" ? focusedTile.tagline : focusedTile?.card.tagline;

  return (
    <section ref={sectionRef} aria-label="Sections" className="w-full scroll-mt-6">
      <div
        role="group"
        aria-label="Sections"
        className="scrollbar-none flex min-h-[168px] items-end gap-3 overflow-x-auto px-1 pb-1 pt-5 sm:min-h-[200px] sm:gap-4 sm:pt-6"
      >
        {tiles.map((tile, index) => {
          const id = tile.kind === "folder" ? tile.id : tile.card.id;
          const focused = index === focusIndex;
          return (
            <Fragment key={id}>
              <TileCard
                ref={(node) => {
                  tileRefs.current[index] = node;
                }}
                tile={tile}
                focused={focused}
                open={tile.kind === "folder" ? openFolderId === tile.id : expandedId === id}
                onFocus={() => dispatch({ type: "focus", index })}
                onActivate={() => dispatch({ type: "activateTile", index })}
              />

              {/* The highlighted tile is named beside it, the way a console does. */}
              {focused && (
                <motion.span
                  key={`${id}-label`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="hidden shrink-0 self-center pb-2 pl-1 pr-3 text-xl font-medium tracking-tight text-shadow-soft md:block"
                >
                  {headingTitle}
                </motion.span>
              )}
            </Fragment>
          );
        })}
      </div>

      <div className="mt-4 min-h-[44px] px-1">
        <motion.div
          key={headingTitle}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-lg font-semibold tracking-tight text-shadow-soft md:sr-only">
            {headingTitle}
          </h1>
          <p className="mt-0.5 text-sm text-ink-soft">{headingBlurb}</p>
        </motion.div>
      </div>

      <AnimatePresence initial={false} mode="wait">
        {expandedCard ? (
          <ExpandPanel key={expandedCard.id} card={expandedCard} />
        ) : openFolder && openFolder.kind === "folder" ? (
          <FolderGrid
            key={openFolder.id}
            title={openFolder.title}
            cards={openFolder.cards}
            focusIndex={folderFocusIndex}
            selectedId={folderSelectedId}
            onFocusItem={(index) => dispatch({ type: "focusFolderItem", index })}
            onSelectItem={(index) => dispatch({ type: "selectFolderItem", index })}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
