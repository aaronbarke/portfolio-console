"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar } from "./Avatar";
import { Clock } from "./Clock";
import { useHome } from "./HomeProvider";
import {
  CalendarIcon,
  MenuIcon,
  MessageIcon,
  NotificationIcon,
  PartyIcon,
  ProfileIcon,
  SettingsIcon,
  TrophyIcon,
} from "./Icons";
import { profile } from "@/lib/profile";
import type { PanelKey } from "@/lib/types";

interface BarItem {
  key: PanelKey;
  label: string;
  icon: (props: { className?: string }) => JSX.Element;
  /** Kept in the collapsed mobile bar rather than hidden behind the menu. */
  alwaysVisible?: boolean;
}

const items: BarItem[] = [
  { key: "profile", label: "About", icon: ProfileIcon },
  { key: "notifications", label: "Currently building", icon: NotificationIcon },
  { key: "contact", label: "Contact", icon: MessageIcon },
  { key: "friends", label: "Links", icon: PartyIcon },
  { key: "calendar", label: "Experience", icon: CalendarIcon },
  { key: "trophies", label: "Skills", icon: TrophyIcon, alwaysVisible: true },
  { key: "settings", label: "Resume & site", icon: SettingsIcon },
];

function BarButton({
  item,
  onSelect,
  active,
}: {
  item: BarItem;
  onSelect: () => void;
  active: boolean;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onSelect}
      title={item.label}
      aria-label={item.label}
      aria-haspopup="dialog"
      className={[
        "group relative rounded-md p-2 transition-colors duration-200",
        active ? "text-ink" : "text-ink-muted hover:text-ink",
        "focus-visible:shadow-focus",
      ].join(" ")}
    >
      <Icon className="h-[22px] w-[22px]" />
      <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-base-deep/95 px-2 py-1 text-[11px] font-medium text-ink-soft opacity-0 shadow-lg ring-1 ring-white/10 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
        {item.label}
      </span>
    </button>
  );
}

export function TopBar() {
  const { panel, dispatch } = useHome();
  const [menuOpen, setMenuOpen] = useState(false);

  function open(key: PanelKey) {
    setMenuOpen(false);
    dispatch({ type: "openPanel", panel: key });
  }

  return (
    <header className="flex items-center gap-2 px-1 py-4 sm:gap-4">
      <button
        type="button"
        onClick={() => open("profile")}
        className="group flex min-w-0 items-center gap-3 rounded-md px-1 py-1 text-left transition-colors duration-200 focus-visible:shadow-focus"
      >
        <Avatar />
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold leading-tight">
            {profile.onlineId}
          </span>
          <span className="block truncate text-xs leading-tight text-ink-muted transition-colors group-hover:text-ink-soft">
            {profile.statusLine}
          </span>
        </span>
      </button>

      <div className="flex-1" />

      <nav aria-label="Sections" className="hidden items-center gap-0.5 md:flex">
        {items.map((item) => (
          <BarButton
            key={item.key}
            item={item}
            active={panel === item.key}
            onSelect={() => open(item.key)}
          />
        ))}
      </nav>

      {/* Collapsed bar: keep the trophy shortcut, put the rest behind a menu. */}
      <div className="relative flex items-center gap-0.5 md:hidden">
        {items
          .filter((item) => item.alwaysVisible)
          .map((item) => (
            <BarButton
              key={item.key}
              item={item}
              active={panel === item.key}
              onSelect={() => open(item.key)}
            />
          ))}

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-label="More sections"
          className="rounded-md p-2 text-ink-muted transition-colors hover:text-ink focus-visible:shadow-focus"
        >
          <MenuIcon className="h-[22px] w-[22px]" />
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="absolute right-0 top-full z-40 mt-2 w-56 overflow-hidden rounded-lg border border-white/12 bg-base-deep/95 py-1.5 shadow-panel backdrop-blur-xl"
            >
              {items
                .filter((item) => !item.alwaysVisible)
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.key}>
                      <button
                        type="button"
                        onClick={() => open(item.key)}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-ink-soft transition-colors hover:bg-white/[0.07] hover:text-ink focus-visible:shadow-focus"
                      >
                        <Icon className="h-[18px] w-[18px]" />
                        {item.label}
                      </button>
                    </li>
                  );
                })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div className="shrink-0 border-l border-white/12 pl-3 sm:ml-1 sm:pl-4">
        <Clock />
      </div>
    </header>
  );
}
