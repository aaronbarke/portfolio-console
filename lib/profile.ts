import type { Profile } from "./types";

export const profile: Profile = {
  name: "Aaron Barke",
  onlineId: "aaronbarke",
  // Shown next to the avatar in the top bar, like a console status message.
  statusLine: "Open to internships",
  headline: "Computer science student building AI tooling and data-heavy products end to end.",
  bio: [
    "I'm a computer science student at the University of Minnesota, currently working as the sole engineer on an automated outbound sales pipeline at Walnut Insurance. Apollo, HubSpot, OpenAI and Microsoft Graph wired together, with an LLM qualification layer on top, deployed into a SOC 2-restricted environment.",
    "Outside of that I build systems that have to be right, not just working: products where the interesting part is the data model and the failure modes rather than the CRUD. Fantasy sports tooling with an AI layer that cites its sources, a price-comparison product built around exact-variant matching, and a set of quantitative research systems whose framework mostly exists to reject strategies that only looked good in sample.",
    "Before any of that I spent two years co-developing published Fortnite maps that reached over 1.2 million players, which is where I learned that shipping to real users teaches you things no amount of local testing does.",
    "The through-line is that I would rather ship something with hard invariants and a test suite behind it than something that demos well and quietly lies.",
  ],
  location: "Minneapolis, MN",
  email: "barke345@umn.edu",
  socials: [
    {
      id: "instagram",
      name: "Instagram",
      handle: "@aaron.barke",
      href: "https://instagram.com/aaron.barke",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      handle: "in/aaronbarke",
      href: "https://www.linkedin.com/in/aaronbarke",
    },
    {
      id: "github",
      name: "GitHub",
      handle: "@aaronbarke",
      href: "https://github.com/aaronbarke",
    },
    {
      id: "email",
      name: "Email",
      handle: "barke345@umn.edu",
      href: "mailto:barke345@umn.edu",
    },
  ],
};

/** Drives the notifications panel, the "what I'm working on now" feed. */
export const notifications: {
  id: string;
  kind: "trophy" | "activity" | "update";
  title: string;
  body: string;
  when: string;
}[] = [
  {
    id: "n1",
    kind: "activity",
    title: "Currently: AI Automation Engineer at Walnut Insurance",
    body: "Sole engineer on an end-to-end outbound pipeline: Apollo, HubSpot, OpenAI and Microsoft Graph, with an LLM qualification layer, running in a SOC 2-restricted production environment.",
    when: "Now",
  },
  {
    id: "n2",
    kind: "trophy",
    title: "Trophy unlocked: 1.2M+ players reached",
    body: "Two years co-developing published Fortnite maps in UEFN with a two-person team, writing game mechanics in Verse.",
    when: "2023 to 2025",
  },
  {
    id: "n3",
    kind: "activity",
    title: "PatternEdge paper book running",
    body: "17 trades, 11 wins, +14.65R. Circuit breaker built and armed before any real capital goes near it.",
    when: "Ongoing",
  },
  {
    id: "n4",
    kind: "update",
    title: "Building next",
    body: "An AI thesis layer for MarketEdge Terminal, and adaptation layers that let the quant platform retire its own strategies.",
    when: "Next",
  },
];
