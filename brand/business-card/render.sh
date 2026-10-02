#!/usr/bin/env bash
# Render the business card to a print-ready PDF, plus PNG previews when
# pdftoppm (poppler-utils) is installed. Needs a Chrome/Chromium binary.
#
#   brand/business-card/render.sh            → lentago-business-card.pdf, out/front.png, out/back.png
#   CHROME=/path/to/chromium ./render.sh     → use a specific binary
set -euo pipefail
cd "$(dirname "$0")"

CHROME="${CHROME:-$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)}"
if [[ -z "$CHROME" ]]; then
  echo "render.sh: no Chrome/Chromium found; set CHROME=/path/to/binary" >&2
  exit 1
fi

PDF="lentago-business-card.pdf"
"$CHROME" --headless=new --disable-gpu --allow-file-access-from-files \
  --no-pdf-header-footer --virtual-time-budget=5000 \
  --print-to-pdf="$PWD/$PDF" "file://$PWD/index.html" 2>/dev/null
echo "wrote $PDF"

if command -v pdftoppm >/dev/null; then
  mkdir -p out
  pdftoppm -r 300 -png "$PDF" out/face
  mv out/face-1.png out/front.png
  mv out/face-2.png out/back.png
  echo "wrote out/front.png out/back.png (300 dpi previews)"
else
  echo "pdftoppm not found; skipped PNG previews" >&2
fi
