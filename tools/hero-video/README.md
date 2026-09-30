# Hero video renderer

Renders the homepage video: a 3D model of a DGX Spark-class compact AI supercomputer that explodes into its
components (chassis, metal-foam panels, cooling, mainboard, memory, SSD, networking), holds with labels, and
reassembles. It is an 8-second seamless loop at 30 fps.

- `scene.js`: three.js model, materials, lighting, timeline and labels. Change label text in `LABELS`,
  timing in `OUT` / `IN`, explosion distances in each `part(...)` call.
- `capture.js`: drives headless Chromium and saves each frame.
- `encode.sh`: builds the web media (requires `ffmpeg` with libx264, libvpx-vp9 and libwebp).

## Regenerate

```bash
cd tools/hero-video
npm install
npm run serve &          # render page on http://localhost:4180
npm run frames           # about 6 minutes: labelled desktop frames + label-free mobile frames
npm run encode
npm run install-media    # copies into public/videos and public/images
```

`capture.js` expects Chromium at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; point
`executablePath` at your own Chrome or Chromium if it lives elsewhere.

## Outputs

| File | Use |
| --- | --- |
| `hero-spark.mp4` / `.webm` | Desktop, 1200×900, with labels |
| `hero-spark-mobile.mp4` / `.webm` | Phones, 640×640, tighter crop, no labels |
| `hero-spark-poster.webp`, `hero-spark-poster-mobile.webp` | Placeholder shown until the video starts |
| `hero-spark-exploded.webp` | Labelled still used on the Solutions page |

The encode applies a small brightness lift so the video background decodes to exactly `#0b0c11`, the page
background, which lets the feathered edges disappear into the page.
