import { allProjects, featuredProjects, experimentProjects } from "./projects";
import { education, experience } from "./experience";
import { favorites } from "./favorites";
import { posts } from "./blog";
import { profile } from "./profile";
import type { Card, Project, Tile } from "./types";

function projectCard(project: Project): Card {
  return {
    id: project.id,
    title: project.title,
    tagline: project.tagline,
    art: project.art,
    body: { type: "project", project },
  };
}

/** Strongest work first, then the rest, then the research labs. */
const projectCards: Card[] = [...featuredProjects, ...experimentProjects].map(projectCard);

const roleCards: Card[] = experience.map((entry, index) => ({
  id: `role-${index}`,
  title: entry.org,
  tagline: entry.role,
  art: {
    motif: index === 0 ? "bars" : "scatter",
    from: index === 0 ? "#1651a8" : "#1b459c",
    to: index === 0 ? "#022c8a" : "#122f83",
    monogram: entry.org
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
  },
  body: { type: "role", entry },
}));

const postCards: Card[] = posts.map((post) => ({
  id: post.id,
  title: post.title,
  tagline: `${post.outlet}, ${post.date}`,
  art: post.art,
  body: { type: "post", post },
}));

const favoriteCards: Card[] = favorites.map((favorite) => ({
  id: favorite.id,
  title: favorite.name,
  tagline: favorite.period,
  art: favorite.art,
  body: { type: "favorite", favorite },
}));

const aboutCard: Card = {
  id: "about",
  title: "About",
  tagline: profile.headline,
  art: { motif: "orbit", from: "#17408f", to: "#04123f", monogram: "AB" },
  body: { type: "about" },
};

const skillsCard: Card = {
  id: "skills",
  title: "Skills",
  tagline: "What I reach for, grouped by how deep it goes.",
  art: { motif: "grid", from: "#173a86", to: "#050f36", monogram: "SK" },
  body: { type: "skills" },
};

const educationCard: Card = {
  id: "education",
  title: education[0].org,
  tagline: `${education[0].role}, ${education[0].period}`,
  art: { motif: "cap", from: "#17408f", to: "#050f36", monogram: "UM" },
  body: { type: "education", entry: education[0] },
};

/**
 * The home row. Everything the site has to say is a tile here; nothing is
 * hidden behind the status bar.
 */
export const homeTiles: Tile[] = [
  { kind: "card", card: aboutCard },
  {
    kind: "folder",
    id: "favorites",
    title: "Favorites",
    tagline: "The games I keep coming back to",
    cards: favoriteCards,
  },
  {
    kind: "folder",
    id: "projects",
    title: "Projects",
    tagline: "Everything I have built, best first",
    cards: projectCards,
  },
  {
    kind: "folder",
    id: "experience",
    title: "Work Experience",
    tagline: "Where I have worked",
    cards: roleCards,
  },
  { kind: "card", card: educationCard },
  { kind: "card", card: skillsCard },
  {
    kind: "folder",
    id: "writing",
    title: "Writing",
    tagline: "Published work and notes",
    cards: postCards,
  },
];

/** Flat lookup for anything that can be expanded. */
export const allCards: Card[] = homeTiles.flatMap((tile) =>
  tile.kind === "card" ? [tile.card] : tile.cards,
);

export { allProjects };
