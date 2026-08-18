/** Shared content types. Every data file in /lib is typed against these. */

/** Art motif rendered behind a tile's monogram. Cover art is code-generated. */
export type ArtMotif =
  | "grid"
  | "wave"
  | "orbit"
  | "peaks"
  | "scatter"
  | "bars"
  | "blocks"
  | "court"
  | "boost"
  | "storm"
  | "page"
  | "cap";

export interface Art {
  motif: ArtMotif;
  from: string;
  to: string;
  monogram: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  /** Rendered as the primary action on the detail panel. */
  primary?: boolean;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  summary: string;
  stack: string[];
  features: string[];
  links: ProjectLink[];
  metrics?: { label: string; value: string }[];
  /** Source is private; the panel says so instead of offering a dead link. */
  privateSource?: boolean;
  art: Art;
}

export type TrophyTier = "platinum" | "gold" | "silver" | "bronze";

export interface Trophy {
  name: string;
  /** What the skill was actually used for, which keeps the list evidence-based. */
  detail: string;
  tier: TrophyTier;
}

export interface ExperienceEntry {
  org: string;
  role: string;
  period: string;
  location?: string;
  points: string[];
}

export interface Favorite {
  id: string;
  name: string;
  period: string;
  /** Why it matters, in the first person. */
  note: string[];
  stats?: { label: string; value: string }[];
  art: Art;
}

export interface Post {
  id: string;
  title: string;
  outlet: string;
  date: string;
  summary: string;
  body: string[];
  href?: string;
  art: Art;
}

export interface SocialLink {
  id: string;
  name: string;
  handle: string;
  href: string;
}

export interface Profile {
  name: string;
  onlineId: string;
  statusLine: string;
  headline: string;
  bio: string[];
  location: string;
  email: string;
  resumeHref: string | null;
  socials: SocialLink[];
}

/**
 * Every destination on the home screen is a card. The body tag decides which
 * renderer the detail panel uses, so adding a new kind of section means adding
 * one variant here and one branch in the panel, not a new navigation concept.
 */
export type CardBody =
  | { type: "project"; project: Project }
  | { type: "about" }
  | { type: "skills" }
  | { type: "role"; entry: ExperienceEntry }
  | { type: "education"; entry: ExperienceEntry }
  | { type: "post"; post: Post }
  | { type: "favorite"; favorite: Favorite };

export interface Card {
  id: string;
  title: string;
  tagline: string;
  art: Art;
  body: CardBody;
}

/** A home-row entry is either a single card or a folder of them. */
export type Tile =
  | { kind: "card"; card: Card }
  | { kind: "folder"; id: string; title: string; tagline: string; cards: Card[] };
