# Cover images

Any file dropped here replaces the generated art for that tile. If a file is
missing the tile falls back to its drawn cover, so nothing breaks while these
are empty.

Square images, 512x512 or larger, JPG or PNG.

| File | Tile |
| --- | --- |
| `fortnite.jpg` | Favorites, Fortnite |
| `rocket-league.jpg` | Favorites, Rocket League |
| `minecraft.jpg` | Favorites, Minecraft |
| `nba-2k17.jpg` | Favorites, NBA 2K17 |
| `walnut-insurance.png` | Work Experience, Walnut Insurance |
| `genesisx.png` | Work Experience, GenesisX |
| `target.png` | Work Experience, Target |
| `lake-marion.png` | Work Experience, Lake Marion Collision Center |
| `umn.png` | Education, University of Minnesota |
| `lakeville-south.png` | Education, Lakeville South High School |

Logos use `imageFit: "contain"` so they sit centred on the tile's gradient
rather than being cropped. Game covers use `"cover"` and fill the tile.

Your photo goes at `public/me.jpg` and is used by both the About tile and the
status-bar avatar.
