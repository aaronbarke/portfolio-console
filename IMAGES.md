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

Logos, centred on the tile's gradient rather than cropped. PNG with a
transparent background works best.

| File | Tile |
| --- | --- |
| `public/covers/walnut-insurance.*` | Walnut Insurance |
| `public/covers/genesisx.*` | GenesisX |
| `public/covers/target.*` | Target |
| `public/covers/lake-marion.*` | Lake Marion Collision Center |

## Education folder

Same treatment as the logos above.

| File | Tile |
| --- | --- |
| `public/covers/umn.*` | University of Minnesota |
| `public/covers/lakeville-south.*` | Lakeville South High School |

## Tiles with no image slot

These keep their drawn art on purpose, since there is no photograph of them:
the eleven Projects cards, Skills, Writing, and the two decorative system tiles.

To give one a real image, add `image: "/covers/whatever.png"` to its `art`
object in `lib/projects.ts`, and `imageFit: "contain"` if it is a logo rather
than full-bleed art.

## Changing fit

`imageFit: "cover"` fills the tile edge to edge and crops. `imageFit: "contain"`
centres the image at about 72% size over the gradient, which is what the logos
use. The default is `"cover"`.
