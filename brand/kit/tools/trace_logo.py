"""Trace the raster master logo into clean vector paths, one path per element.

Input: the original dark-background lockup (brand/logo-lockup-source.png in the website repo).
Output: src/logo-parts.json with SVG path data (in source-pixel units) for each element.
"""
import json
import sys
import numpy as np
import potrace
from PIL import Image

SRC = sys.argv[1]
UP = 6  # trace at 6x for smooth curves

img = Image.open(SRC).convert('RGB')
big = np.asarray(img.resize((img.width * UP, img.height * UP), Image.LANCZOS)).astype(float)
R, G, B = big[..., 0], big[..., 1], big[..., 2]
bg = 12.0
red_cov = np.clip((R - np.maximum(G, B) - 10) / (205 - 10), 0, 1)       # red strength
white_cov = np.clip((np.minimum(np.minimum(R, G), B) - bg) / (235 - bg), 0, 1) * (1 - red_cov)

def region(mask, box):
    x0, y0, x1, y1 = [v * UP for v in box]
    out = np.zeros_like(mask, dtype=bool)
    out[y0:y1, x0:x1] = mask[y0:y1, x0:x1]
    return out

def trace(mask, turd=40):
    bm = potrace.Bitmap(~mask)  # potracer fills False pixels, so invert
    path = bm.trace(turdsize=turd, turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY, alphamax=1.0, opticurve=True, opttolerance=0.2)
    f = lambda p: f'{p.x / UP:.2f} {p.y / UP:.2f}'
    parts = []
    for curve in path:
        d = [f'M{f(curve.start_point)}']
        for seg in curve:
            if seg.is_corner:
                d.append(f'L{f(seg.c)}L{f(seg.end_point)}')
            else:
                d.append(f'C{f(seg.c1)} {f(seg.c2)} {f(seg.end_point)}')
        d.append('Z')
        parts.append(''.join(d))
    return ''.join(parts)

red = red_cov > 0.5
white = white_cov > 0.5
parts = {
    'markL': trace(region(red, (480, 220, 800, 570))),
    'markS': trace(region(white, (700, 220, 1080, 570))),
    'logic': trace(region(white, (150, 610, 700, 740))),
    'sonata': trace(region(red, (700, 610, 1420, 740))),
    'tagText': trace(region(white | (white_cov > 0.35), (360, 745, 1180, 815)), turd=8),
    'tagDots': trace(region(red, (360, 745, 1200, 815)), turd=4),
    'tagRules': trace(region(red_cov > 0.35, (150, 770, 1400, 790)) & ~region(red, (360, 745, 1200, 815)), turd=4),
}
json.dump(parts, open('src/logo-parts.json', 'w'))
print({k: len(v) for k, v in parts.items()})
