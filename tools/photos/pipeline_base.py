"""Layout guide for the product pipeline worlds: a long glass platform inside a low boundary wall, five evenly spaced
stations joined by a data path. Station centres land at 10%, 30%, 50%, 70% and 90% of the width, so the HTML label
columns below the image line up. Output 1536 x 640. Usage: python pipeline_base.py out.png"""
import math, sys
from PIL import Image, ImageDraw, ImageFilter

W, H = 1536, 640
A, B = 0.0, math.radians(38)   # x axis level (stations in a straight line), y axis receding up-left
KX = W * 0.8 / 4 / math.cos(A) / 200        # station spacing 200 world units -> 20% of the width


def P(x, y, z=0):
    sx = W * 0.10 + (x - 100) * math.cos(A) * KX - (y - 100) * math.cos(B) * KX * 0.9
    sy = H * 0.66 + (x - 100) * math.sin(A) * KX * -1 - (y - 100) * math.sin(B) * KX * 0.9 - z * KX
    return sx, sy


im = Image.new('RGB', (W, H), (5, 9, 11)); d = ImageDraw.Draw(im)
# platform slab
x0, x1, y0, y1, t = 50, 950, 50, 150, 10
d.polygon([P(x0, y1, 0), P(x1, y1, 0), P(x1, y1, -t), P(x0, y1, -t)], fill=(14, 30, 33))
d.polygon([P(x0, y0, 0), P(x1, y0, 0), P(x1, y1, 0), P(x0, y1, 0)], fill=(22, 46, 50), outline=(62, 200, 190))
# low boundary wall (back and right edges, translucent red)
for a, b in (((x0, y0), (x1, y0)), ((x1, y0), (x1, y1)), ((x0, y0), (x0, y1))):
    d.polygon([P(*a, 0), P(*b, 0), P(*b, 18), P(*a, 18)], fill=(60, 18, 18), outline=(255, 59, 48))
# data path
pts = [P(100 + i * 200, 100, 1) for i in range(5)]
d.line(pts, fill=(62, 240, 224), width=4)
# stations: pad + block
for i in range(5):
    cx = 100 + i * 200
    pad = [P(cx - 50, 100 - 45, 1), P(cx + 50, 100 - 45, 1), P(cx + 50, 100 + 45, 1), P(cx - 50, 100 + 45, 1)]
    d.polygon(pad, fill=(30, 62, 66), outline=(62, 240, 224))
    bx, by, w, h = cx - 22, 100 - 20, 44, 40
    d.polygon([P(bx, by + w, h), P(bx + w, by + w, h), P(bx + w, by + w, 0), P(bx, by + w, 0)], fill=(80, 100, 102))
    d.polygon([P(bx + w, by, h), P(bx + w, by + w, h), P(bx + w, by + w, 0), P(bx + w, by, 0)], fill=(50, 66, 68))
    d.polygon([P(bx, by, h), P(bx + w, by, h), P(bx + w, by + w, h), P(bx, by + w, h)], fill=(130, 160, 160))
im.filter(ImageFilter.GaussianBlur(0.6)).save(sys.argv[1])
print([round(P(100 + i * 200, 100)[0] / W, 3) for i in range(5)])
