# Images to add

Nothing here is required. Every tile draws its own cover, and a missing file
falls back to that drawing rather than breaking, so these can be added one at a
time and each tile will flip over as its file appears.

All paths are relative to the repo root. **The extension does not matter.**
Filenames are resolved against what is actually on disk, so `fortnite.png`,
`fortnite.jpg`, `fortnite.webp` and `fortnite.avif` all work. Only the base
name has to match.

## Your photo

| File | Used by | Notes | Status |
| --- | --- | --- | --- |
| `public/me.*` | About tile and the status-bar avatar | Any aspect ratio. Square crops are anchored to the top so a portrait keeps the face in frame. Falls back to an "AB" monogram. | **done** |

## Favorites folder

Full-bleed cover art. Square, 512x512 or larger.

| File | Tile | Status |
| --- | --- | --- |
| `public/covers/fortnite.*` | Fortnite | **done** |
| `public/covers/rocket-league.*` | Rocket League | **done** |
| `public/covers/minecraft.*` | Minecraft | **done** |
| `public/covers/nba-2k17.*` | NBA 2K17 | **done** |

## Work Experience folder

| File | Tile | Status |
| --- | --- | --- |
| `public/covers/walnut-insurance.*` | Walnut Insurance | **done** |
| `public/covers/genesisx.*` | GenesisX | **done** |
| `public/covers/target.*` | Target | **done** |
| `public/covers/lake-marion.*` | Lake Marion Collision Center | **done**, low resolution |

## Education folder

| File | Tile | Status |
| --- | --- | --- |
| `public/covers/umn.*` | University of Minnesota | **done** |
| `public/covers/lakeville-south.*` | Lakeville South High School | **done** |

## Tiles with no image slot

These keep their drawn art on purpose, since there is no photograph of them:
the eleven Projects cards, Skills, Writing, and the two decorative system tiles.

To give one a real image, add `image: "/covers/whatever.png"` to its `art`
object in `lib/projects.ts`, and `imageFit: "contain"` if it is a logo rather
than full-bleed art.

## Changing fit

`imageFit: "cover"` is the default and fills the tile edge to edge, cropping to
square. It is right for anything that already carries its own background, which
includes every logo here: they read as app icons rather than as stickers on a
blue field.

`imageFit: "contain"` centres the image instead, and needs `imageBackground` set
to a colour that matches the artwork so the letterboxing is invisible. Use it
when an image has transparency, or an aspect ratio far enough from square that
cropping would cut something important. Lake Marion is the only one here that
needs it, at 1.48:1.

`imagePosition: "top"` anchors a cover crop to the top instead of the centre.
The headshot uses it, so a portrait keeps the face rather than filling the tile
with a tie.

## Replacing a weak asset

`lake-marion.jpg` is 225x152, so it upscales on a 336px tile and looks soft. A
larger source would sharpen it, and a square one would let it drop the contain
treatment and fill the tile like the rest.
