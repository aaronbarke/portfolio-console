import type { Trophy, TrophyTier } from "./types";

/**
 * Skills as a trophy list. Tier maps to depth, not preference:
 * platinum = daily drivers, gold = frameworks reached for by default,
 * silver = used in shipped work but not primary, bronze = actively learning.
 */
export const trophies: Trophy[] = [
  { name: "Python", detail: "Every backend, automation and research system I've built", tier: "platinum" },
  { name: "TypeScript", detail: "Primary language across every web build on this site", tier: "platinum" },
  { name: "JavaScript", detail: "Automation glue, scripting and older frontend work", tier: "platinum" },
  { name: "SQL", detail: "Schema design, migrations and query tuning on Postgres", tier: "platinum" },

  { name: "React", detail: "Component architecture, state modelling, animation", tier: "gold" },
  { name: "Next.js (App Router)", detail: "Five production frontends, versions 14 through 16", tier: "gold" },
  { name: "FastAPI", detail: "Backends for three of the systems shown here", tier: "gold" },
  { name: "PostgreSQL", detail: "Primary datastore, with Alembic and Drizzle migrations", tier: "gold" },
  { name: "Anthropic & OpenAI APIs", detail: "LLM qualification in production, plus the AI layers here", tier: "gold" },
  { name: "Docker", detail: "Compose stacks running multi-service apps locally and in production", tier: "gold" },
  { name: "Git & GitHub", detail: "Branching, CI workflows and per-phase commit discipline", tier: "gold" },
  { name: "n8n", detail: "Workflow automation across CRM, email and messaging systems", tier: "gold" },
  { name: "Tailwind CSS", detail: "Design systems built on semantic tokens, no raw palette classes", tier: "gold" },

  { name: "Java", detail: "Coursework and data-structures work at Minnesota", tier: "silver" },
  { name: "HubSpot & Apollo", detail: "CRM and prospecting APIs behind a live sales pipeline", tier: "silver" },
  { name: "Microsoft Graph & Azure Entra", detail: "Outlook integration and auth in a SOC 2-restricted environment", tier: "silver" },
  { name: "Swift & SwiftUI", detail: "A shipped native iOS app on SwiftData", tier: "silver" },
  { name: "Verse (UEFN)", detail: "Game mechanics and interactive systems in Unreal Editor for Fortnite", tier: "silver" },
  { name: "Redis", detail: "Caching layer on the fantasy football stack", tier: "silver" },
  { name: "SQLAlchemy 2.0", detail: "Typed ORM layer across the trading systems", tier: "silver" },
  { name: "Drizzle & Zod", detail: "Typed schema and runtime validation on the Supabase stack", tier: "silver" },
  { name: "Vitest & Playwright", detail: "Unit, integration and end-to-end suites", tier: "silver" },
  { name: "Framer Motion", detail: "Interface motion, including this site", tier: "silver" },
  { name: "APScheduler", detail: "Scheduled ingestion and scan cadences in production", tier: "silver" },

  { name: "Rust", detail: "Working through it for lower-level data tooling", tier: "bronze" },
  { name: "Kubernetes", detail: "The next step past Compose for multi-service deploys", tier: "bronze" },
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
