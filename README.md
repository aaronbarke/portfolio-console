# portfolio-console

A personal portfolio delivered as a console-style home screen: a horizontal row of
project tiles, a status bar whose icons are real destinations, and a detail panel
that expands downward in place instead of navigating away.

The interface is an original take on the visual language of mid-2010s console home
screens — the layout, the focus glow, the wave background, the way selection opens
downward. No manufacturer's artwork, iconography or naming is used; the glyphs in
`components/Icons.tsx` and the cover art in `components/TileArt.tsx` are drawn in
code in this repository.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion. No data
fetching and no backend — everything renders from typed content files in `lib/`.

```bash
npm install
npm run dev        # http://localhost:3005
npm run build
npm run lint
npm run typecheck
```

## Layout

```
app/
  layout.tsx           Global shell, background, metadata
  page.tsx             Renders the home screen
components/
  HomeProvider.tsx     Selection/expansion state + the global keyboard model
  HomeScreen.tsx       Composition root for the screen
  TopBar.tsx           Status bar: profile, section icons, clock
  TileRow.tsx          The home row, caption and detail area
  TileCard.tsx         One tile (project or folder)
  FolderTile.tsx       A folder opened in place as a grid
  ExpandPanel.tsx      Project detail, expanded downward
  SystemPanel.tsx      Overlay for the top-bar destinations
  TrophyList.tsx       Skills, as a trophy list
  ProfileCard.tsx      About
  BackgroundWave.tsx   Animated background
  ControllerHints.tsx  Keyboard hints, reflecting current state
  panels/              Notifications, friends, timeline, contact, settings
lib/
  types.ts             Content types every data file is checked against
  projects.ts          Featured projects and the Experiments folder
  trophies.ts          Skills by tier
  experience.ts        Employment timeline
  profile.ts           Name, status line, socials, notification feed
```

## Interaction model

| Input | Action |
| --- | --- |
| `←` `→` | Move between tiles (or within an open folder) |
| `Enter` / `↓` | Open the highlighted tile |
| `Esc` / `↑` | Back out one level: panel → folder item → folder → detail |
| `Tab` | Move through links and buttons normally |

Mouse hover produces the same focused state as keyboard focus, so both routes
behave identically. Tiles use a roving tab index, the overlay moves focus in and
returns it to the trigger on close, and every icon has a real label. All motion is
disabled under `prefers-reduced-motion`.

## Content still to fill in

Everything on the site is real except the items below.

1. **`lib/experience.ts`** — the GenesisX and Walnut Insurance entries are
   placeholders (`ROLE TITLE — fill in`, `20XX — 20XX`). They render as written,
   so they need real titles, dates and responsibilities before launch.
2. **`public/resume.pdf`** — not present. Add it, then set `resumeHref` in
   `lib/profile.ts` to `"/resume.pdf"`; until then the settings panel says the
   resume is available on request.
3. **`lib/profile.ts`** — confirm the LinkedIn URL, and swap the generated
   monogram avatar in `components/Avatar.tsx` for a real photo if wanted.
4. **`lib/profile.ts`** — `statusLine` currently reads "Available for hire";
   change it if that is not the message you want in the status bar.

## Deploying

Static output, no environment variables. `vercel` or a GitHub import both work as-is.
