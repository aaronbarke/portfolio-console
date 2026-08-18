/** Shared content types. Every data file in /lib is typed against these. */

/** Art motif rendered behind a tile's monogram. Keeps cover art code-generated. */
export type ArtMotif = "grid" | "wave" | "orbit" | "peaks" | "scatter" | "bars";

export interface ProjectLink {
  label: string;
  href: string;
  /** Rendered as the primary "Start" action on the detail panel. */
  primary?: boolean;
}

export interface Project {
  id: string;
  title: string;
  /** Short line under the title on the home row and detail panel. */
  tagline: string;
  /** One paragraph, shown in the expanded detail panel. */
  summary: string;
  stack: string[];
  features: string[];
  links: ProjectLink[];
  /** Shown as a stat strip in the detail panel. */
  metrics?: { label: string; value: string }[];
  /** Source is private; the panel says so instead of offering a dead link. */
  privateSource?: boolean;
  art: { motif: ArtMotif; from: string; to: string; monogram: string };
}

/** A home-row entry is either a single project or a folder of them. */
export type Tile =
  | { kind: "project"; project: Project }
  | { kind: "folder"; id: string; title: string; blurb: string; projects: Project[] };

export type TrophyTier = "platinum" | "gold" | "silver" | "bronze";

export interface Trophy {
  name: string;
  /** What the skill was actually used for — keeps the list evidence-based. */
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

export interface SocialLink {
  id: string;
  name: string;
  handle: string;
  href: string;
  status: "online" | "away";
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

/** Top-bar destinations. Each maps to a real panel, none are decorative. */
export type PanelKey =
  | "profile"
  | "notifications"
  | "contact"
  | "friends"
  | "calendar"
  | "trophies"
  | "settings";
