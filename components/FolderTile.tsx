"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TileArt } from "./TileArt";
import { ExpandPanel } from "./ExpandPanel";
import type { Card } from "@/lib/types";

/**
 * A folder opens into a row in place, matching how the tile row behaves.
 * Selecting a card inside it expands the same detail panel one level down.
 */
interface FolderGridProps {
  title: string;
  cards: Card[];
  focusIndex: number;
  selectedId: string | null;
  onFocusItem: (index: number) => void;
  onSelectItem: (index: number) => void;
}

export function FolderGrid({
  title,
  cards,
  focusIndex,
  selectedId,
  onFocusItem,
  onSelectItem,
}: FolderGridProps) {
  const selected = cards.find((card) => card.id === selectedId) ?? null;

  return (
    <motion.section
      aria-label={`${title} folder`}
      initial={{ opacity: 0, height: 0, y: -4 }}
      animate={{ opacity: 1, height: "auto", y: 0 }}
      exit={{ opacity: 0, height: 0, y: -4 }}
      transition={{
        height: { type: "spring", stiffness: 200, damping: 34 },
        opacity: { duration: 0.26, ease: "easeOut" },
      }}
      className="overflow-hidden"
    >
      <div className="mt-5 border-t border-white/14 pt-5">
        <div className="flex items-center gap-3 px-1">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-ink-muted">{title}</h2>
          <span className="h-px flex-1 bg-white/12" />
          <span className="shrink-0 text-xs text-ink-muted tabular-nums">{cards.length} items</span>
        </div>

        <ul
          role="group"
          aria-label={title}
          className="scrollbar-none mt-4 flex gap-3 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:gap-4 sm:overflow-visible"
        >
          {cards.map((card, index) => {
            const focused = index === focusIndex;
            const open = card.id === selectedId;
            return (
              <li key={card.id}>
                <motion.button
                  type="button"
                  aria-expanded={open}
                  tabIndex={focused ? 0 : -1}
                  onFocus={() => onFocusItem(index)}
                  onMouseEnter={() => onFocusItem(index)}
                  onClick={() => onSelectItem(index)}
                  animate={{ scale: focused ? 1.04 : 1 }}
                  transition={{ type: "spring", stiffness: 240, damping: 28 }}
                  className="group flex w-[112px] shrink-0 flex-col gap-2 rounded-md outline-none sm:w-[124px]"
                >
                  <TileArt
                    motif={card.art.motif}
                    from={card.art.from}
                    to={card.art.to}
                    monogram={card.art.monogram}
                    className={[
                      "aspect-square w-full overflow-hidden rounded-[4px] transition-shadow duration-200",
                      focused ? "shadow-focus" : "shadow-tile opacity-90 group-hover:opacity-100",
                    ].join(" ")}
                  />
                  <span className="text-left text-xs font-medium leading-snug text-ink-soft">
                    {card.title}
                  </span>
                </motion.button>
              </li>
            );
          })}
        </ul>

        <AnimatePresence initial={false} mode="wait">
          {selected && <ExpandPanel key={selected.id} card={selected} />}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
