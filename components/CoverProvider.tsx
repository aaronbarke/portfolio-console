"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { CoverMap } from "@/lib/covers";

const CoverContext = createContext<CoverMap>({});

export function CoverProvider({ covers, children }: { covers: CoverMap; children: ReactNode }) {
  return <CoverContext.Provider value={covers}>{children}</CoverContext.Provider>;
}

/** Returns the real path for an image key, or null when no file exists yet. */
export function useCoverSrc(key: string | undefined): string | null {
  const covers = useContext(CoverContext);
  if (!key) return null;
  return covers[key.toLowerCase()] ?? null;
}
