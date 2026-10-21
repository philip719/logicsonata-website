"""Layout guide for the stack 3D world: seven spaced slabs drawn with the same isometric maths as
src/components/graphics/StackWorld.tsx (keep the constants in sync). Output 1024 x 1216 (viewBox 640 x 760 at 1.6x)."""
import math, sys
from PIL import Image, ImageDraw, ImageFilter

S, SIZE, GAP, THICK, OX, OY = 1.2, 92, 82, 8, 190, 640
K = 1.6
C30 = math.cos(math.pi / 6)
iso = lambda x, y, z: ((OX + (x - y) * C30 * S) * K, (OY + ((x + y) / 2 - z) * S) * K)

im = Image.new('RGB', (1024, 1216), (5, 9, 11))
d = ImageDraw.Draw(im)
for i in range(7):
    z = i * GAP
    t = z + THICK
    top = [iso(0, 0, t), iso(SIZE, 0, t), iso(SIZE, SIZE, t), iso(0, SIZE, t)]
    left = [iso(0, SIZE, t), iso(SIZE, SIZE, t), iso(SIZE, SIZE, z), iso(0, SIZE, z)]
    right = [iso(SIZE, 0, t), iso(SIZE, SIZE, t), iso(SIZE, SIZE, z), iso(SIZE, 0, z)]
    d.polygon(left, fill=(16, 32, 36)); d.polygon(right, fill=(9, 20, 23)); d.polygon(top, fill=(24, 52, 57), outline=(62, 200, 190))
    # a simple block on each floor so the model reads it as a stage for a scene
    bx, by, w, h = 30, 30, 32, 24
    d.polygon([iso(bx, by + w, t + h), iso(bx + w, by + w, t + h), iso(bx + w, by + w, t), iso(bx, by + w, t)], fill=(70, 90, 92))
    d.polygon([iso(bx + w, by, t + h), iso(bx + w, by + w, t + h), iso(bx + w, by + w, t), iso(bx + w, by, t)], fill=(45, 60, 62))
    d.polygon([iso(bx, by, t + h), iso(bx + w, by, t + h), iso(bx + w, by + w, t + h), iso(bx, by + w, t + h)], fill=(120, 150, 150))
im.filter(ImageFilter.GaussianBlur(0.6)).save(sys.argv[1] if len(sys.argv) > 1 else '/home/user/comfy/raw/stack-world-base.png')
