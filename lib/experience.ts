import type { ExperienceEntry } from "./types";

/**
 * TODO(content): the two roles below are placeholders — real titles, dates and
 * responsibilities need filling in before this site goes live. Everything else
 * on the site is real; this file is the only thing that is not.
 */
export const experience: ExperienceEntry[] = [
  {
    org: "GenesisX",
    role: "ROLE TITLE — fill in",
    period: "20XX — 20XX",
    points: [
      "Replace with what you actually owned here.",
      "One line per outcome, with a number in it wherever possible.",
    ],
  },
  {
    org: "Walnut Insurance",
    role: "ROLE TITLE — fill in",
    period: "20XX — 20XX",
    points: [
      "Replace with what you actually owned here.",
      "One line per outcome, with a number in it wherever possible.",
    ],
  },
];

/** Self-directed work, shown alongside the employment timeline. */
export const independentWork: ExperienceEntry[] = [
  {
    org: "Independent builds",
    role: "Full-stack & systems work",
    period: "2026 — present",
    points: [
      "Designed and shipped ten independent systems spanning full-stack web, native iOS and quantitative research.",
      "Built production-shaped infrastructure end to end: Postgres schemas, scheduled ingestion, Docker Compose stacks, CI and alerting.",
      "Wrote the test suites to match — 562 tests on the quant platform, 222 plus end-to-end coverage on ScentScout.",
      "Treated safety as a design constraint: manual promotion gates, fail-closed admin checks and kill switches on anything that could touch money.",
    ],
  },
];
