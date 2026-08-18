"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TileArt } from "./TileArt";
import { ExpandPanel } from "./ExpandPanel";
import type { Project } from "@/lib/types";

/**
 * A folder opens into a grid in place, matching how the tile row behaves.
 * Selecting a project inside it expands the same detail panel one level down.
 */
interface FolderGridProps {
  title: string;
  projects: Project[];
  focusIndex: number;
  selectedId: string | null;
  onFocusItem: (index: number) => void;
  onSelectItem: (index: number) => void;
}

export function FolderGrid({
  title,
  projects,
  focusIndex,
  selectedId,
  onFocusItem,
  onSelectItem,
}: FolderGridProps) {
  const selected = projects.find((project) => project.id === selectedId) ?? null;

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
      <div className="mt-5 border-t border-white/12 pt-5">
        <div className="flex items-center gap-3 px-1">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-ink-muted">{title}</h2>
          <span className="h-px flex-1 bg-white/10" />
          <span className="shrink-0 text-xs text-ink-muted tabular-nums">
            {projects.length} items
          </span>
        </div>

        <ul
          role="group"
          aria-label={title}
          className="scrollbar-none mt-4 flex gap-3 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:gap-4 sm:overflow-visible"
        >
          {projects.map((project, index) => {
            const focused = index === focusIndex;
            const open = project.id === selectedId;
            return (
              <li key={project.id}>
                <motion.button
                  type="button"
                  aria-expanded={open}
                  tabIndex={focused ? 0 : -1}
                  onFocus={() => onFocusItem(index)}
                  onMouseEnter={() => onFocusItem(index)}
                  onClick={() => onSelectItem(index)}
                  animate={{ scale: focused ? 1.04 : 1 }}
                  transition={{ type: "spring", stiffness: 240, damping: 28 }}
                  className={[
                    "group flex w-[112px] shrink-0 flex-col gap-2 rounded-md outline-none sm:w-[124px]",
                    focused ? "" : "opacity-80 hover:opacity-100",
                  ].join(" ")}
                >
                  <TileArt
                    motif={project.art.motif}
                    from={project.art.from}
                    to={project.art.to}
                    monogram={project.art.monogram}
                    className={[
                      "aspect-square w-full overflow-hidden rounded-[5px] transition-shadow duration-200",
                      focused ? "shadow-focus" : "shadow-tile",
                    ].join(" ")}
                  />
                  <span className="text-left text-xs font-medium leading-snug text-ink-soft">
                    {project.title}
                  </span>
                </motion.button>
              </li>
            );
          })}
        </ul>

        <AnimatePresence initial={false} mode="wait">
          {selected && <ExpandPanel key={selected.id} project={selected} />}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
