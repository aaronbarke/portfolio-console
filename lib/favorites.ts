import type { Favorite } from "./types";

/**
 * TODO(content): the notes below are written from what the rest of the site
 * already says. Rewrite them in your own voice, they are the most personal
 * thing on the page and should sound like you.
 */
export const favorites: Favorite[] = [
  {
    id: "fortnite",
    name: "Fortnite",
    period: "2018 to now",
    note: [
      "The one that turned into work. I spent two years co-developing published maps in Unreal Editor for Fortnite with a two-person team, writing mechanics in Verse and watching real players break every assumption we had.",
      "Playing it is still the fastest way for me to think about game feel: why a loop keeps someone for twenty minutes and why another loses them in two.",
    ],
    stats: [
      { label: "Maps published", value: "Multiple" },
      { label: "Players reached", value: "1.2M+" },
    ],
    art: { motif: "storm", from: "#17408f", to: "#04123f", monogram: "FN" },
  },
  {
    id: "rocket-league",
    name: "Rocket League",
    period: "2016 to now",
    note: [
      "The cleanest ruleset in any game I play. Almost nothing to memorise and a skill ceiling you can chase for years, which is the same thing I want out of a codebase.",
      "Also the game I put on when a bug has beaten me and I need to stop staring at it.",
    ],
    art: { motif: "boost", from: "#173a86", to: "#050f36", monogram: "RL" },
  },
  {
    id: "minecraft",
    name: "Minecraft",
    period: "2012 to now",
    note: [
      "Where building things first clicked. Redstone was the first system I ever debugged, years before I knew that was what I was doing.",
      "Still the reference I reach for when I think about how much a simple set of rules can generate.",
    ],
    art: { motif: "blocks", from: "#17408f", to: "#050f36", monogram: "MC" },
  },
  {
    id: "nba-2k17",
    name: "NBA 2K17",
    period: "2016 to 2018",
    note: [
      "Pure nostalgia. The one I have the most hours in that has nothing to do with anything else on this page, which is exactly why it belongs here.",
    ],
    art: { motif: "court", from: "#173a86", to: "#04123f", monogram: "2K" },
  },
];
