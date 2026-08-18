import type { Profile } from "./types";

export const profile: Profile = {
  name: "Aaron Barke",
  onlineId: "aaronbarke",
  // Shown next to the avatar in the top bar, like a console status message.
  statusLine: "Available for hire",
  headline: "Full-stack engineer building data-heavy products end to end.",
  bio: [
    "I build systems that have to be right, not just working — products where the interesting part is the data model and the failure modes rather than the CRUD.",
    "Most of what is on this page is self-directed: fantasy sports tooling with an AI layer that cites its sources, a price-comparison product built around exact-variant matching, and a set of quantitative research systems where the framework's main job is rejecting strategies that only looked good in sample.",
    "The through-line is that I would rather ship something with hard invariants and a test suite behind it than something that demos well and quietly lies.",
  ],
  location: "United States",
  email: "barkeaaron@gmail.com",
  // TODO(content): drop a resume PDF at public/resume.pdf and set this to
  // "/resume.pdf". Left null so the settings panel says "available on request"
  // rather than offering a link that 404s.
  resumeHref: null,
  socials: [
    {
      id: "github",
      name: "GitHub",
      handle: "@aaronbarke",
      href: "https://github.com/aaronbarke",
      status: "online",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      // TODO(content): confirm the real LinkedIn vanity URL.
      handle: "@aaronbarke",
      href: "https://www.linkedin.com/in/aaronbarke",
      status: "online",
    },
    {
      id: "email",
      name: "Email",
      handle: "barkeaaron@gmail.com",
      href: "mailto:barkeaaron@gmail.com",
      status: "online",
    },
  ],
};

/** Drives the notifications panel — the "what I'm working on now" feed. */
export const notifications: {
  id: string;
  kind: "trophy" | "activity" | "update";
  title: string;
  body: string;
  when: string;
}[] = [
  {
    id: "n1",
    kind: "trophy",
    title: "Trophy unlocked — Shipped ScentScout Phase 7",
    body: "Second retailer adapter live, with a measured presentation convention behind the adapter boundary.",
    when: "Recently",
  },
  {
    id: "n2",
    kind: "activity",
    title: "PatternEdge paper book running",
    body: "17 trades, 11 wins, +14.65R. Circuit breaker built and armed before any real capital.",
    when: "Ongoing",
  },
  {
    id: "n3",
    kind: "update",
    title: "Currently building",
    body: "An AI thesis layer for MarketEdge Terminal, and adaptation layers that let the quant platform retire its own strategies.",
    when: "Now",
  },
];
