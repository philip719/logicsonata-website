# Logic Sonata brand kit generator

Rebuilds the complete brand kit (logos, colours, fonts, stationery, templates, social images) from code, so
every file stays consistent with the brand values in `tools/brand.py`.

The vector logo in `src/logo-parts.json` was traced from `../logo-lockup-source.png`. Rerun the trace only if
the master artwork changes.

## Requirements

- Python 3 with `python-docx python-pptx potracer pillow numpy qrcode fonttools`
- Node.js with `playwright-core` and a Chromium build (set `CHROME=/path/to/chrome` if it is not at the default path)
- The desktop TTF fonts in `out/03-Typography/fonts` (Space Grotesk, Inter, JetBrains Mono, Noto Sans Thai),
  for example from the `@expo-google-fonts/*` npm packages

## Build

```bash
python3 tools/trace_logo.py ../logo-lockup-source.png   # only when the master logo changes
python3 tools/build_logos.py                             # logo SVGs
node tools/render_logos.js                               # logo PNGs and vector PDFs
python3 tools/build_foundations.py <folder with TTFs>    # swatches, fonts, graphics
python3 tools/build_print.py && node tools/render_print.js   # print PDFs and digital PNGs
python3 tools/build_backgrounds.py                       # slide, card and cover backgrounds
python3 tools/build_pptx.py && python3 tools/build_docx.py   # PowerPoint and Word templates
python3 tools/build_guide.py && MANIFEST=build/manifest-guide.json node tools/render_print.js   # brand guidelines PDF
```

The kit is written to `out/` (ignored by git); zip that folder to share it.
