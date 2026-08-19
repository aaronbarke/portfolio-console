"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { CoverMap } from "@/lib/assets";

interface Assets {
  covers: CoverMap;
  resumeHref: string | null;
}

const AssetContext = createContext<Assets>({ covers: {}, resumeHref: null });

export function CoverProvider({
  covers,
  resumeHref,
  children,
}: {
  covers: CoverMap;
  resumeHref: string | null;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ covers, resumeHref }), [covers, resumeHref]);
  return <AssetContext.Provider value={value}>{children}</AssetContext.Provider>;
}

/** The resume PDF's real path, or null when no PDF is present. */
export function useResumeHref(): string | null {
  return useContext(AssetContext).resumeHref;
}

/** Returns the real path for an image key, or null when no file exists yet. */
export function useCoverSrc(key: string | undefined): string | null {
  const { covers } = useContext(AssetContext);
  if (!key) return null;
  return covers[key.toLowerCase()] ?? null;
}
