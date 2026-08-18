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
    art: { motif: "storm", from: "#5b2fc9", to: "#160a3d", monogram: "FN", image: "/covers/fortnite.jpg", accent: "#a78bfa" },
  },
  {
    id: "rocket-league",
    name: "Rocket League",
    period: "2016 to now",
    note: [
      "The cleanest ruleset in any game I play. Almost nothing to memorise and a skill ceiling you can chase for years, which is the same thing I want out of a codebase.",
      "Also the game I put on when a bug has beaten me and I need to stop staring at it.",
    ],
    art: { motif: "boost", from: "#1479d0", to: "#07203f", monogram: "RL", image: "/covers/rocket-league.jpg", accent: "#ffb347" },
  },
  {
    id: "minecraft",
    name: "Minecraft",
    period: "2012 to now",
    note: [
      "Where building things first clicked. Redstone was the first system I ever debugged, years before I knew that was what I was doing.",
      "Still the reference I reach for when I think about how much a simple set of rules can generate.",
    ],
    art: { motif: "blocks", from: "#3f8f3a", to: "#14290f", monogram: "MC", image: "/covers/minecraft.jpg", accent: "#b7e08a" },
  },
  {
    id: "nba-2k17",
    name: "NBA 2K17",
    period: "2016 to 2018",
    note: [
      "Pure nostalgia. The one I have the most hours in that has nothing to do with anything else on this page, which is exactly why it belongs here.",
    ],
    art: { motif: "court", from: "#d2691e", to: "#2b1005", monogram: "2K", image: "/covers/nba-2k17.jpg", accent: "#ffd08a" },
  },
];
