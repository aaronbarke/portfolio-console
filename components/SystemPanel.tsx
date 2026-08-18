"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { CloseIcon } from "./Icons";
import { useHome } from "./HomeProvider";
import { ProfileCard } from "./ProfileCard";
import { TrophyList } from "./TrophyList";
import { Notifications } from "./panels/Notifications";
import { Friends } from "./panels/Friends";
import { Timeline } from "./panels/Timeline";
import { Contact } from "./panels/Contact";
import { Settings } from "./panels/Settings";
import type { PanelKey } from "@/lib/types";

const panels: Record<PanelKey, { title: string; subtitle: string; body: () => JSX.Element }> = {
  profile: { title: "Profile", subtitle: "About", body: ProfileCard },
  notifications: { title: "Notifications", subtitle: "Currently building", body: Notifications },
  contact: { title: "Messages", subtitle: "Get in touch", body: Contact },
  friends: { title: "Friends", subtitle: "Find me elsewhere", body: Friends },
  calendar: { title: "Calendar", subtitle: "Experience", body: Timeline },
  trophies: { title: "Trophies", subtitle: "Skills", body: TrophyList },
  settings: { title: "Settings", subtitle: "Resume & site info", body: Settings },
};

/**
 * Top-bar destinations open as an overlay sheet. Focus moves in on open and
 * returns to the trigger on close, so keyboard users are never stranded.
 */
export function SystemPanel() {
  const { panel, dispatch } = useHome();
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (panel) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      // Wait for the enter animation to mount the button before focusing it.
      const id = window.requestAnimationFrame(() => closeRef.current?.focus());
      document.body.style.overflow = "hidden";
      return () => {
        window.cancelAnimationFrame(id);
        document.body.style.overflow = "";
      };
    }
    returnFocusRef.current?.focus();
    return undefined;
  }, [panel]);

  const active = panel ? panels[panel] : null;
  const Body = active?.body;

  return (
    <AnimatePresence>
      {active && Body && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <button
            type="button"
            aria-label="Close panel"
            tabIndex={-1}
            onClick={() => dispatch({ type: "closePanel" })}
            className="absolute inset-0 cursor-default bg-base-deep/72 backdrop-blur-md"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="system-panel-title"
            initial={{ opacity: 0, y: 14, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.995 }}
            transition={{ type: "spring", stiffness: 240, damping: 30 }}
            className="relative my-auto w-full max-w-3xl rounded-xl border border-white/12 bg-[linear-gradient(180deg,rgba(10,36,60,0.94)_0%,rgba(5,18,31,0.94)_100%)] shadow-panel"
          >
            <header className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                  {active.subtitle}
                </p>
                <h2 id="system-panel-title" className="mt-1 text-xl font-semibold tracking-tight">
                  {active.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => dispatch({ type: "closePanel" })}
                className="rounded-full border border-white/15 p-2 text-ink-soft transition-colors duration-200 hover:border-white/35 hover:text-ink focus-visible:shadow-focus"
              >
                <CloseIcon className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </header>

            <div className="px-6 py-6 sm:px-8 sm:py-7">
              <Body />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
