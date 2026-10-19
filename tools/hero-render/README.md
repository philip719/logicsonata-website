# Hero render

Photoreal still for the homepage hero: a vendor-neutral private AI appliance with its parts separated
(aluminium chassis, slotted grilles, fan, fin stack with heat pipes, vapor chamber, mainboard with the AI
superchip, memory, networking, NVMe SSD), path-traced with Blender Cycles on a dark studio set.

- `textures.py`: procedural textures (PCB traces, grille slots, chip prints, SSD label, logo mask). Pillow.
- `render.py`: builds the scene with the `bpy` module and renders it. Layout and label anchors follow
  `tools/hero-video/scene.js`. Lights and exposure can be tuned from the command line (`key=`, `fill=`,
  `topl=`, `rim=`, `glow=`, `exposure=`, `fstop=`).
- `compose.js`: adds the part labels with the site fonts (from a built `out/`) at 2x.
- `finish.py`: edge vignette into the page colour, labelled desktop files, square mobile crop, WebP export.

## Regenerate

```bash
cd tools/hero-render
python3 -m venv .venv && .venv/bin/pip install bpy==4.2.0     # Python 3.11
python3 textures.py tex
.venv/bin/python render.py out=render.png w=2400 h=1800 samples=160 labels=labels.json   # ~15 min on 4 cores
python3 finish.py render.png labels.json ../../public/images    # needs Node, Playwright and a built site (npm run build)
```

Text for the labels lives in `compose.js`.
