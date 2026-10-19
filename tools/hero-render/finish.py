"""Turns the raw render into the site's hero images.

Usage: python3 finish.py <render.png> <labels.json> <public/images dir>
Writes hero-render.webp (1200x900) and hero-render@2x.webp (2400x1800) with labels, the label-free square
phone crop hero-render-mobile.webp (640) and @2x (1280), and hero-appliance-exploded.webp for /solutions.
"""
import os
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image

render, labels, outdir = sys.argv[1], sys.argv[2], Path(sys.argv[3])
HERE = Path(__file__).resolve().parent
BG = np.array([11, 12, 17], dtype=np.float32)  # page background #0b0c11


def vignette(im, cy, rx, ry, d0, d1):
    """Elliptical falloff into the page colour."""
    a = np.asarray(im.convert('RGB'), dtype=np.float32)
    h, w = a.shape[:2]
    yy, xx = np.mgrid[0:h, 0:w]
    d = np.sqrt(((xx / w - 0.5) / rx) ** 2 + ((yy / h - cy) / ry) ** 2)
    t = np.clip((d - d0) / (d1 - d0), 0, 1)
    wgt = (t * t * (3 - 2 * t))[..., None]
    return Image.fromarray((a * (1 - wgt) + BG * wgt).round().clip(0, 255).astype(np.uint8))


raw = Image.open(render).convert('RGB')
# Slightly wider than tall so the label columns sit on dark.
base = vignette(raw, 0.47, 0.52, 0.6, 0.58, 1.02)

with tempfile.TemporaryDirectory() as tmp:
    plain = Path(tmp) / 'plain.png'
    labelled = Path(tmp) / 'labelled.png'
    base.save(plain)
    env = dict(os.environ)
    env.setdefault('PLAYWRIGHT', '/opt/node22/lib/node_modules/playwright')
    env.setdefault('CHROME', '/opt/pw-browsers/chromium-1194/chrome-linux/chrome')
    subprocess.run(['node', str(HERE / 'compose.js'), str(plain), labels, str(labelled)], check=True, env=env)
    lab = Image.open(labelled).convert('RGB').resize((2400, 1800), Image.LANCZOS)

    lab.save(outdir / 'hero-render@2x.webp', quality=84, method=6)
    small = lab.resize((1200, 900), Image.LANCZOS)
    small.save(outdir / 'hero-render.webp', quality=86, method=6)
    small.save(outdir / 'hero-appliance-exploded.webp', quality=86, method=6)

    # Phones: tighter square around the parts, no labels.
    sq = vignette(raw.resize((2400, 1800), Image.LANCZOS).crop((500, 150, 1900, 1550)), 0.48, 0.56, 0.56, 0.6, 1.0)
    sq.resize((1280, 1280), Image.LANCZOS).save(outdir / 'hero-render-mobile@2x.webp', quality=82, method=6)
    sq.resize((640, 640), Image.LANCZOS).save(outdir / 'hero-render-mobile.webp', quality=84, method=6)

for f in sorted(outdir.glob('hero-render*')) + [outdir / 'hero-appliance-exploded.webp']:
    print(f.name, f.stat().st_size // 1024, 'KB')
