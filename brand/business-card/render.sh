#!/usr/bin/env bash
# Render the business card to print-ready PDFs — one per printer profile — plus
# CMYK conversions (Ghostscript) and 300 dpi PNG previews (poppler) when those
# tools are installed. Needs a Chrome/Chromium binary.
#
#   brand/business-card/render.sh              → every profile
#   brand/business-card/render.sh moo          → one profile
#   CHROME=/path/to/chromium ./render.sh       → use a specific binary
#
# PROFILES — bleed, page size (trim 3.5 × 2 in + 2 × bleed), corner-line size:
#   default   0.125 in   3.75 × 2.25 in   6.5 pt   Vistaprint, Jukebox, Primoprint, most shops
#   moo       0.08 in    3.66 × 2.16 in   8 pt     Moo's bleed box; Moo asks for 8 pt text minimum
#
# Outputs: lentago-business-card.pdf, lentago-business-card-moo.pdf, and a
# .cmyk.pdf beside each. Upload the .cmyk.pdf; keep the RGB one as the master.
set -euo pipefail
cd "$(dirname "$0")"

CHROME="${CHROME:-$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)}"
if [[ -z "$CHROME" ]]; then
  echo "render.sh: no Chrome/Chromium found; set CHROME=/path/to/binary" >&2
  exit 1
fi

declare -A BLEED=( [default]=0.125in [moo]=0.08in )
declare -A PAGE=(  [default]="3.75in 2.25in" [moo]="3.66in 2.16in" )
declare -A CORNER=( [default]=6.5pt [moo]=8pt )

trap 'rm -f .render-*.html' EXIT

render() {
  local profile="$1" src="index.html" pdf="lentago-business-card.pdf"
  [[ -v "BLEED[$profile]" ]] || { echo "render.sh: unknown profile '$profile'" >&2; exit 1; }

  if [[ "$profile" != default ]]; then
    pdf="lentago-business-card-$profile.pdf"
    src=".render-$profile.html"   # same directory, so the relative token/font paths still resolve
    local w h; read -r w h <<< "${PAGE[$profile]}"
    sed -e "s|--bleed: 0.125in; --page-w: 3.75in; --page-h: 2.25in;|--bleed: ${BLEED[$profile]}; --page-w: $w; --page-h: $h;|" \
        -e "s|@page { size: 3.75in 2.25in;|@page { size: $w $h;|" \
        -e "s|font-size: 6.5pt; /\* CORNER-SIZE \*/|font-size: ${CORNER[$profile]}; /* CORNER-SIZE */|" \
        index.html > "$src"
    if ! grep -q -- "--bleed: ${BLEED[$profile]}" "$src" || ! grep -q "size: $w $h" "$src"; then
      echo "render.sh: profile substitution failed — did the GEOMETRY block in index.html change?" >&2
      exit 1
    fi
  fi

  "$CHROME" --headless=new --disable-gpu --allow-file-access-from-files \
    --no-pdf-header-footer --virtual-time-budget=5000 \
    --print-to-pdf="$PWD/$pdf" "file://$PWD/$src" 2>/dev/null
  echo "wrote $pdf"

  if command -v gs >/dev/null; then
    gs -q -o "${pdf%.pdf}.cmyk.pdf" -sDEVICE=pdfwrite -dPDFSETTINGS=/prepress \
       -sColorConversionStrategy=CMYK -dProcessColorModel=/DeviceCMYK "$pdf"
    echo "wrote ${pdf%.pdf}.cmyk.pdf"
  else
    echo "gs not found; skipped CMYK conversion for $pdf" >&2
  fi
}

profiles=("$@")
[[ ${#profiles[@]} -gt 0 ]] || profiles=(default moo)
for p in "${profiles[@]}"; do render "$p"; done

if command -v pdftoppm >/dev/null && [[ -f lentago-business-card.pdf ]]; then
  mkdir -p out
  pdftoppm -r 300 -png lentago-business-card.pdf out/face
  mv out/face-1.png out/front.png
  mv out/face-2.png out/back.png
  echo "wrote out/front.png out/back.png (300 dpi previews, default profile)"
else
  echo "pdftoppm not found; skipped PNG previews" >&2
fi
