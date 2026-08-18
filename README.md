# portfolio-console

A personal portfolio delivered as a console-style home screen: a horizontal row of
project tiles, a status bar whose icons are real destinations, and a detail panel
that expands downward in place instead of navigating away.

The interface is an original take on the visual language of mid-2010s console home
screens: the layout, the focus glow, the wave background, the way selection opens
downward. No manufacturer's artwork, iconography or naming is used. The glyphs in
`components/Icons.tsx` and the cover art in `components/TileArt.tsx` are drawn in
code in this repository.

## Stack

Next.js 14 (App Router), TypeScript, Tailwind CSS and Framer Motion. No data
fetching and no backend. Everything renders from typed content files in `lib/`.

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
| `Esc` / `↑` | Back out one level: panel, then folder item, then folder, then detail |
| `Tab` | Move through links and buttons normally |

Mouse hover produces the same focused state as keyboard focus, so both routes
behave identically. Tiles use a roving tab index, the overlay moves focus in and
returns it to the trigger on close, and every icon has a real label. All motion is
disabled under `prefers-reduced-motion`.

## Content

All content lives in `lib/` as typed data, checked against `lib/types.ts`:

- `projects.ts` sets the home row and the Experiments folder. Move a project
  between `featuredProjects` and `experimentProjects` to change which tiles are
  on the main row.
- `trophies.ts` is skills by tier, `experience.ts` is employment, education and
  writing, `profile.ts` is identity, socials and the notification feed.
- `public/resume.pdf` backs the download in the settings panel. Replace the file
  to update it; the link comes from `resumeHref` in `profile.ts`.
- `statusLine` in `profile.ts` is the message next to the avatar in the status
  bar. It currently reads "Available for hire".

Cover art and icons are generated in code (`TileArt.tsx`, `Icons.tsx`), so
adding a project needs no image assets, just a motif, two colours and a
monogram.

## Deploying

Static output, no environment variables. `vercel` or a GitHub import both work as is.
