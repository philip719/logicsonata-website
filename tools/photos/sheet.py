"""Contact sheet: one row per shot, takes side by side. Usage: python sheet.py out.jpg SHOT [SHOT ...]"""
import sys, glob, os
from PIL import Image, ImageDraw

RAW = '/home/user/comfy/raw'
out, shots = sys.argv[1], sys.argv[2:]
TW, TH = 640, 360
rows = []
for s in shots:
    files = sorted(f for f in glob.glob(f'{RAW}/{s}_*.png') if os.path.basename(f).split('_s')[0] == s or '_owner' in f)
    rows.append((s, files))
cols = max(len(f) for _, f in rows)
sheet = Image.new('RGB', (cols * (TW + 8) + 8, len(rows) * (TH + 30) + 8), (20, 20, 20))
d = ImageDraw.Draw(sheet)
for r, (s, files) in enumerate(rows):
    for c, f in enumerate(files):
        im = Image.open(f).convert('RGB').resize((TW, TH))
        x, y = 8 + c * (TW + 8), 8 + r * (TH + 30)
        sheet.paste(im, (x, y + 22)); d.text((x, y + 4), os.path.basename(f)[:-4], fill=(255, 255, 255))
sheet.save(out, quality=82)
