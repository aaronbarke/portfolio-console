# Images to add

Nothing here is required. Every tile draws its own cover, and a missing file
falls back to that drawing rather than breaking, so these can be added one at a
time and each tile will flip over as its file appears.

All paths are relative to the repo root.

## Your photo

| File | Used by | Notes |
| --- | --- | --- |
| `public/me.jpg` | About tile and the status-bar avatar | Square, 512x512 or larger. Falls back to an "AB" monogram. |

## Favorites folder

Full-bleed cover art. Square, 512x512 or larger.

| File | Tile |
| --- | --- |
| `public/covers/fortnite.jpg` | Fortnite |
| `public/covers/rocket-league.jpg` | Rocket League |
| `public/covers/minecraft.jpg` | Minecraft |
| `public/covers/nba-2k17.jpg` | NBA 2K17 |

## Work Experience folder

Logos, centred on the tile's gradient rather than cropped. PNG with a
transparent background works best.

| File | Tile |
| --- | --- |
| `public/covers/walnut-insurance.png` | Walnut Insurance |
| `public/covers/genesisx.png` | GenesisX |
| `public/covers/target.png` | Target |
| `public/covers/lake-marion.png` | Lake Marion Collision Center |

## Education folder

Same treatment as the logos above.

| File | Tile |
| --- | --- |
| `public/covers/umn.png` | University of Minnesota |
| `public/covers/lakeville-south.png` | Lakeville South High School |

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
