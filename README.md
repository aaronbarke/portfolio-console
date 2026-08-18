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
  TopBar.tsx           Status bar: identity, social links, resume, clock
  TileRow.tsx          The home row, its inline label and the detail area
  TileCard.tsx         One tile (card or folder)
  FolderTile.tsx       A folder opened in place as a row
  ExpandPanel.tsx      The detail panel shell and its action column
  CardBodies.tsx       One renderer per card body type
  TrophyList.tsx       Skills, as a trophy list
  TileArt.tsx          Generated cover art
  BackgroundWave.tsx   Animated background
  ControllerHints.tsx  Keyboard hints, reflecting current state
lib/
  types.ts             Content types every data file is checked against
  sections.ts          Assembles the home row from everything below
  projects.ts          Project data
  favorites.ts         The Favorites folder
  blog.ts              Writing
  trophies.ts          Skills by tier
  experience.ts        Employment, education and publications
  profile.ts           Name, status line, socials
```

## The home row

Every section is a tile; nothing is hidden behind the status bar.

| Tile | Contents |
| --- | --- |
| About | Bio, location, email, resume download |
| Favorites | The games that matter, as a folder |
| Projects | All eleven builds, strongest first |
| Work Experience | One card per role |
| Education | University of Minnesota |
| Skills | Trophy list by tier |
| Writing | Published work |

The status bar holds identity and follow links only: Instagram, LinkedIn,
GitHub, email and the resume download.

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

- `sections.ts` builds the home row. Reorder `homeTiles` to change the tile
  order, or move a card between folders.
- `projects.ts` order decides project order inside the Projects folder, so the
  first entry is the one shown first.
- `trophies.ts` is skills by tier, `experience.ts` is employment and education,
  `favorites.ts` and `blog.ts` back their own folders.
- `public/resume.pdf` backs the download in the settings panel. Replace the file
  to update it; the link comes from `resumeHref` in `profile.ts`.
- `statusLine` in `profile.ts` is the message next to the avatar in the status
  bar. It currently reads "Available for hire".
- Two things in `lib/` are marked `TODO(content)`: the Instagram handle in
  `profile.ts` is a guess, and the notes in `favorites.ts` were drafted from
  what the rest of the site says and should be rewritten in your own voice.

Cover art and icons are generated in code (`TileArt.tsx`, `Icons.tsx`), so
adding a project needs no image assets, just a motif, two colours and a
monogram.

## Images

Nothing here requires an image. Every tile draws its own cover, and any file you
drop in replaces it. A missing file falls back to the drawn art rather than
breaking, so you can add them one at a time.

- `public/me.jpg` backs the About tile and the status-bar avatar.
- `public/covers/` holds tile artwork. See the README in that folder for the
  filename each tile looks for.
- Logos use `imageFit: "contain"` and sit centred on the tile's gradient. Game
  and project art uses `"cover"` and fills the tile edge to edge.

## Reference overlay

`npm run dev` only, stripped from production builds. Put a screenshot in
`public/reference/` and press `r` to lay it over the running site.

| Key | Action |
| --- | --- |
| `r` | Show or hide |
| `[` `]` | Opacity |
| `,` `.` | Previous or next reference image |
| `b` | Toggle difference blend |

Difference blend is the one worth knowing: matching pixels go black, so whatever
is still glowing is out of position. It switches to full opacity on its own,
because the effect does not read through a 50% overlay.

## Deploying

Static output, no environment variables. `vercel` or a GitHub import both work as is.
