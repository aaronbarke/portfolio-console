import type { Trophy, TrophyTier } from "./types";

/**
 * Skills as a trophy list. Tier maps to depth, not preference:
 * platinum = daily drivers, gold = frameworks reached for by default,
 * silver = used in shipped work but not primary, bronze = actively learning.
 */
export const trophies: Trophy[] = [
  { name: "TypeScript", detail: "Primary language across every web build here", tier: "platinum" },
  { name: "Python", detail: "Every backend and research system on this page", tier: "platinum" },
  { name: "SQL", detail: "Schema design, migrations and query tuning on Postgres", tier: "platinum" },

  { name: "Next.js (App Router)", detail: "Five production frontends, versions 14 through 16", tier: "gold" },
  { name: "React", detail: "Component architecture, state modelling, animation", tier: "gold" },
  { name: "FastAPI", detail: "Backends for three of the systems shown here", tier: "gold" },
  { name: "PostgreSQL", detail: "Primary datastore, with Alembic and Drizzle migrations", tier: "gold" },
  { name: "Tailwind CSS", detail: "Design systems built on semantic tokens, no raw palette classes", tier: "gold" },
  { name: "SQLAlchemy 2.0", detail: "Typed ORM layer across the trading systems", tier: "gold" },
  { name: "Docker", detail: "Compose stacks running multi-service apps locally", tier: "gold" },

  { name: "Swift & SwiftUI", detail: "A shipped native iOS app on SwiftData", tier: "silver" },
  { name: "Framer Motion", detail: "Interface motion, including this site", tier: "silver" },
  { name: "Vitest & Playwright", detail: "Unit, integration and end-to-end suites", tier: "silver" },
  { name: "Drizzle & Zod", detail: "Typed schema and runtime validation on the Supabase stack", tier: "silver" },
  { name: "APScheduler", detail: "Scheduled ingestion and scan cadences in production", tier: "silver" },
  { name: "Redis", detail: "Caching layer on the fantasy football stack", tier: "silver" },

  { name: "Rust", detail: "Working through it for lower-level data tooling", tier: "bronze" },
  { name: "Kubernetes", detail: "Next step past Compose for multi-service deploys", tier: "bronze" },
];

export const tierOrder: TrophyTier[] = ["platinum", "gold", "silver", "bronze"];

export const tierLabels: Record<TrophyTier, string> = {
  platinum: "Platinum",
  gold: "Gold",
  silver: "Silver",
  bronze: "Bronze",
};

export const tierBlurbs: Record<TrophyTier, string> = {
  platinum: "Daily drivers",
  gold: "Reached for by default",
  silver: "Shipped with, not primary",
  bronze: "Actively learning",
};

export function trophiesByTier(tier: TrophyTier): Trophy[] {
  return trophies.filter((trophy) => trophy.tier === tier);
}
