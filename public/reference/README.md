# Reference screenshots

Drop 1920x1080 PNGs here to compare the live layout against a real screen.
The overlay only exists in `npm run dev`, never in a production build.

Expected filenames (edit the list in `components/ReferenceOverlay.tsx` to change):

- `home.png`
- `folder.png`
- `background.png`

Controls, with the site focused:

| Key | Action |
| --- | --- |
| `r` | Show or hide the overlay |
| `[` `]` | Opacity down or up |
| `,` `.` | Previous or next image |
| `b` | Toggle difference blend, which makes misalignment obvious |

Difference blend is the useful one: matching areas go black, so anything still
glowing is out of position. Toggling it jumps opacity to 100% automatically,
since the effect only reads at full strength, and back to 50% on the way out.
