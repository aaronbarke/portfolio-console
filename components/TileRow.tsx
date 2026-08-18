"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useCallback, useEffect, useRef } from "react";
import { TileCard } from "./TileCard";
import { ExpandPanel } from "./ExpandPanel";
import { FolderGrid } from "./FolderTile";
import { useHome } from "./HomeProvider";
import { allCards } from "@/lib/sections";
import { useTileSize } from "./useTileSize";

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

  // Only scroll when the focused tile would otherwise be off screen. Centring
  // on every move shifted the whole row for a single step, which fought the
  // resize animation and was most of what made moving around feel heavy.
  useEffect(() => {
    tileRefs.current[focusIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [focusIndex]);

  const openKey = expandedId ?? openFolderId;
  const anythingOpen = Boolean(openKey);

  const tileSize = useTileSize(anythingOpen);

  // Opening a tile resizes the row, which can slide a different tile under a
  // cursor that never moved. Hover only counts again after real movement.
  const hoverArmed = useRef(true);

  useEffect(() => {
    const rearm = () => {
      hoverArmed.current = true;
    };
    window.addEventListener("mousemove", rearm);
    return () => window.removeEventListener("mousemove", rearm);
  }, []);

  const handleHover = useCallback(
    (index: number) => {
      if (!hoverArmed.current) return;
      dispatch({ type: "focus", index });
    },
    [dispatch],
  );

  const handleActivate = useCallback(
    (index: number) => {
      hoverArmed.current = false;
      dispatch({ type: "activateTile", index });
    },
    [dispatch],
  );

  const expandedCard = expandedId ? (allCards.find((c) => c.id === expandedId) ?? null) : null;

  const openFolder =
    openFolderId != null
      ? tiles.find((tile) => tile.kind === "folder" && tile.id === openFolderId)
      : undefined;

  const headingTitle =
    focusedTile?.kind === "card" ? focusedTile.card.title : focusedTile?.title;
  const headingBlurb =
    focusedTile?.kind === "card" ? focusedTile.card.tagline : focusedTile?.tagline;

  return (
    <section ref={sectionRef} aria-label="Sections" className="w-full scroll-mt-6">
      <div
        role="group"
        aria-label="Sections"
        className="scrollbar-none flex items-start gap-2 overflow-x-auto scroll-px-4 px-4 pb-14 pt-12 sm:gap-2.5 sm:scroll-px-6 sm:px-6 sm:pt-14 lg:scroll-px-10 lg:px-10"
      >
        {tiles.map((tile, index) => {
          const id = tile.kind === "card" ? tile.card.id : tile.id;
          const focused = index === focusIndex;
          return (
            <Fragment key={id}>
              <TileCard
                ref={(node) => {
                  tileRefs.current[index] = node;
                }}
                tile={tile}
                focused={focused}
                size={tileSize}
                open={tile.kind === "folder" ? openFolderId === tile.id : expandedId === id}
                onFocus={() => dispatch({ type: "focus", index })}
                onHover={() => handleHover(index)}
                onActivate={() => handleActivate(index)}
              />

              {/* The highlighted tile is named beside it, the way a console does. */}
              {focused && (
                <span
                  key={`${id}-label`}
                  className="relative hidden w-0 shrink-0 self-end md:block"
                >
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-1 left-4 whitespace-nowrap text-3xl font-light tracking-tight text-shadow-soft"
                  >
                    {headingTitle}
                  </motion.span>
                </span>
              )}
            </Fragment>
          );
        })}
      </div>

      <div className="-mt-10 min-h-[44px] px-4 sm:px-6 lg:px-10">
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
