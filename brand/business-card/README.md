# Business card

The Lentago Labs business card, built the same way the site is: one HTML file
on the design-system tokens and self-hosted fonts, rendered to print-ready
PDFs by headless Chrome. [`index.html`](index.html) is the source of truth;
the PDFs beside it are what you hand to a printer.

- **Size:** US 3.5 × 2 in trim, plus a bleed that depends on the printer (see
  the files below), and a 0.125 in safe inset inside the trim.
- **Front:** a deep-teal band bleeding off the left edge carries the chip mark
  over faint contours; the limestone column beside it holds the wordmark as
  the headline, the practice line, then name, email, location. Gold appears
  only in the mark's anthers.
- **Back:** the dark field (contours + ghost blossom), the gold ▲ `lentago`
  field prompt, `lentago.dev`, `github.com/lentago`.

Both faces follow [`/BRAND.md`](../../BRAND.md). This folder sits outside
`src/` and `public/`, so nothing here ships with the site.

## Which file to upload

| File | Bleed | Page | For |
|---|---|---|---|
| `lentago-business-card.cmyk.pdf` | 0.125 in | 3.75 × 2.25 in | Vistaprint, Jukebox, Primoprint, most shops |
| `lentago-business-card-moo.cmyk.pdf` | 0.08 in | 3.66 × 2.16 in | Moo (their bleed box; corner line raised to 8 pt to meet their text minimum) |

The `.cmyk.pdf` files are the ones to upload: Moo and Vistaprint both ask for
CMYK, and converting here (Ghostscript) beats trusting the shop's conversion.
The RGB `.pdf` next to each is the master; its `.cmyk.pdf` is regenerated from
it on every render. Page 1 is the front, page 2 the back.

## Render

```sh
brand/business-card/render.sh        # every profile
brand/business-card/render.sh moo    # one profile
```

Profiles (bleed, page size, corner-line size) live at the top of `render.sh`;
it rewrites the `GEOMETRY` block of `index.html` into a temporary copy for
each non-default profile, so adding a printer is one line per table. Needs
Chrome/Chromium; `gs` for the CMYK files; `pdftoppm` for the 300 dpi PNG
previews in `out/` (gitignored). Open `index.html` in a browser to see both
faces with trim and safe-area guides; the guides don't print.

## Before you print

- Dark areas are solid teal, not the site's gradient (narrow gradients band on
  digital presses), and the contours and ghost blossom are set stronger than on
  screen so they survive conversion. Still: order a small run or a printed proof
  before a big box.
- Full-bleed dark shows the paper's white core at the cut edges. A colored
  seam (Moo Luxe) or painted edge (Vistaprint, Jukebox) turns that into a
  feature; a matte or soft-touch finish hides scuffs.
- Expect the gold (`#E0A81C`) to print a little flatter than it looks on
  screen. It is not metallic without a foil or metallic-edge option.
- Bleed is already included; ask for "no additional bleed" if the upload form
  offers to add it.
