# Business card

The Lentago Labs business card, built the same way the site is: one HTML file
on the design-system tokens and self-hosted fonts, rendered to a print-ready
PDF by headless Chrome. [`index.html`](index.html) is the source of truth;
[`lentago-business-card.pdf`](lentago-business-card.pdf) is what you hand to a
printer.

- **Size:** US 3.5 × 2 in trim, with 0.125 in bleed on every side (the PDF
  page is 3.75 × 2.25 in) and a 0.125 in safe inset inside the trim.
- **Front:** a deep-teal band bleeding off the left edge carries the chip mark
  over faint contours; the limestone column beside it holds the wordmark as
  the headline, the practice line, then name, email, location. Gold appears
  only in the mark's anthers.
- **Back:** the hero's dark field (contours + ghost blossom), the gold ▲
  `lentago` field prompt, `lentago.dev`, `github.com/lentago`.

Both faces follow [`/BRAND.md`](../../BRAND.md). This folder sits outside
`src/` and `public/`, so nothing here ships with the site.

## Render

```sh
brand/business-card/render.sh
```

Writes the PDF next to `index.html`, and 300 dpi PNG previews to `out/`
(gitignored) when `pdftoppm` is installed. Open `index.html` in a browser to
see both faces with trim and safe-area guides; the guides don't print.

## Sending it to a printer

- The PDF is **RGB**. Online printers (Moo, Vistaprint, and most others)
  accept RGB and convert it. If a shop insists on CMYK:
  `gs -o cmyk.pdf -sDEVICE=pdfwrite -sColorConversionStrategy=CMYK lentago-business-card.pdf`
- Expect the gold (`#E0A81C`) to print a little flatter than it looks on
  screen. It is not metallic without a foil option.
- Dark areas are solid teal, not the site's gradient (narrow gradients band on
  digital presses), and the contours and ghost blossom are set stronger than on
  screen so they survive conversion. Still: order a small run or a printed proof
  before a big box.
- Full-bleed dark shows the paper's white core at the cut edges. Painted-edge
  or dark-core stock avoids it; a matte or soft-touch finish hides scuffs.
- Page 1 is the front, page 2 the back. Bleed is already included; ask for
  "no additional bleed" if the upload form offers to add it.
