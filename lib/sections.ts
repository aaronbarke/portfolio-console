import { allProjects, featuredProjects, experimentProjects } from "./projects";
import { education, experience } from "./experience";
import { favorites } from "./favorites";
import { posts } from "./blog";
import { profile } from "./profile";
import type { Art, Card, Project, Tile } from "./types";

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

const roleArt: Art[] = [
  { motif: "bars", from: "#1d4ed8", to: "#0a1b4d", monogram: "WI" },
  { motif: "orbit", from: "#3b2a8c", to: "#130d38", monogram: "GX" },
  { motif: "scatter", from: "#b3241f", to: "#3a0b09", monogram: "TG" },
  { motif: "grid", from: "#155e75", to: "#062330", monogram: "LM" },
];

const roleCards: Card[] = experience.map((entry, index) => ({
  id: `role-${index}`,
  title: entry.org,
  tagline: entry.employment ? `${entry.role} · ${entry.employment}` : entry.role,
  art: roleArt[index] ?? { motif: "grid", from: "#17408f", to: "#04123f", monogram: "WK" },
  body: { type: "role", entry },
}));

const educationArt: Art[] = [
  { motif: "cap", from: "#7a0019", to: "#2c0009", monogram: "UM" },
  { motif: "page", from: "#8c1d2f", to: "#2e0a11", monogram: "LS" },
];

const educationCards: Card[] = education.map((entry, index) => ({
  id: `education-${index}`,
  title: entry.org,
  tagline: `${entry.role}, ${entry.period}`,
  art: educationArt[index] ?? { motif: "cap", from: "#17408f", to: "#04123f", monogram: "ED" },
  body: { type: "education", entry },
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
  {
    kind: "folder",
    id: "education",
    title: "Education",
    tagline: "Where I studied",
    cards: educationCards,
  },
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
