"""Procedural textures for the photoreal hero render (run with system Python + Pillow).

Usage: python3 textures.py <outdir>
"""
import math
import random
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT = Path(sys.argv[1] if len(sys.argv) > 1 else 'tex')
OUT.mkdir(parents=True, exist_ok=True)
HERE = Path(__file__).resolve().parent
MONO = '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'
SANS = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'


def grille():
    """Slotted grille mask: white = metal, black = open slot. Diagonal break echoes the LS mark."""
    w, h = 2048, 608
    im = Image.new('L', (w, h), 255)
    d = ImageDraw.Draw(im)
    slot_h, pitch, slot_w, gap = 18, 42, 128, 24
    slash_x, slope = 1400, math.tan(math.pi / 6)
    row, y = 0, 28
    while y < h - 20:
        x = 32 + (row % 2) * ((slot_w + gap) // 2)
        while x < w - 32:
            cx = slash_x + (h / 2 - (y + slot_h / 2)) * slope
            x2 = min(x + slot_w, w - 32)
            if x2 - x >= 40 and not (x2 > cx - 36 and x < cx + 36):
                d.rounded_rectangle([x, y, x2, y + slot_h], radius=slot_h // 2, fill=0)
            x += slot_w + gap
        row += 1
        y += pitch
    im.save(OUT / 'grille.png')


def pcb():
    """Mainboard top: solder mask colour, exposed-copper mask and silkscreen."""
    s = 2048
    r = random.Random(7)
    col = Image.new('RGB', (s, s), (10, 22, 17))
    metal = Image.new('L', (s, s), 0)
    dc, dm = ImageDraw.Draw(col), ImageDraw.Draw(metal)
    trace = (22, 46, 34)
    # Routed traces: orthogonal runs with 45 degree joints, often in parallel buses.
    for _ in range(170):
        x, y = r.randrange(s), r.randrange(s)
        lanes = r.choice([1, 1, 2, 4, 6, 8])
        width = r.choice([3, 4, 5])
        segs = []
        for _ in range(r.randint(2, 5)):
            ang = r.choice([0, 90, 180, 270, 45, 135, 225, 315])
            ln = r.randint(60, 420)
            nx = x + ln * math.cos(math.radians(ang))
            ny = y + ln * math.sin(math.radians(ang))
            segs.append((x, y, nx, ny))
            x, y = nx, ny
        for k in range(lanes):
            off = k * (width + 6)
            for (x1, y1, x2, y2) in segs:
                dc.line([x1 + off, y1 + off, x2 + off, y2 + off], fill=trace, width=width)
        ex, ey = segs[-1][2], segs[-1][3]
        dc.ellipse([ex - 7, ey - 7, ex + 7, ey + 7], fill=(150, 120, 60))
        dm.ellipse([ex - 7, ey - 7, ex + 7, ey + 7], fill=255)
    # Vias
    for _ in range(900):
        x, y = r.randrange(s), r.randrange(s)
        dc.ellipse([x - 5, y - 5, x + 5, y + 5], fill=(36, 60, 46))
        dc.ellipse([x - 2, y - 2, x + 2, y + 2], fill=(6, 10, 8))
    # Gold pad arrays (component footprints)
    for _ in range(120):
        x, y = r.randrange(40, s - 40), r.randrange(40, s - 40)
        n = r.randint(2, 10)
        horiz = r.random() > 0.5
        for i in range(n):
            px, py = (x + i * 14, y) if horiz else (x, y + i * 14)
            dc.rectangle([px, py, px + 8, py + 16], fill=(176, 142, 74))
            dm.rectangle([px, py, px + 8, py + 16], fill=255)
    # Silkscreen outlines and reference designators
    font = ImageFont.truetype(MONO, 22)
    for _ in range(140):
        x, y = r.randrange(s - 80), r.randrange(s - 40)
        w, h = r.randint(30, 110), r.randint(20, 70)
        if r.random() < 0.55:
            dc.rectangle([x, y, x + w, y + h], outline=(205, 210, 205), width=2)
        dc.text((x, y + h + 4), r.choice('RCULQJDT') + str(r.randint(1, 499)), fill=(200, 205, 200), font=font)
    # Mounting holes with plated rings
    for (x, y) in [(70, 70), (s - 70, 70), (70, s - 70), (s - 70, s - 70)]:
        dc.ellipse([x - 38, y - 38, x + 38, y + 38], fill=(190, 160, 90))
        dm.ellipse([x - 38, y - 38, x + 38, y + 38], fill=255)
        dc.ellipse([x - 20, y - 20, x + 20, y + 20], fill=(2, 2, 2))
        dm.ellipse([x - 20, y - 20, x + 20, y + 20], fill=0)
    col = col.filter(ImageFilter.GaussianBlur(0.6))
    col.save(OUT / 'pcb_color.png')
    metal.save(OUT / 'pcb_metal.png')


def chip_print(name, lines, size=(512, 512), bg=(14, 14, 16), fg=(150, 150, 150), dot=True):
    im = Image.new('RGB', size, bg)
    d = ImageDraw.Draw(im)
    font = ImageFont.truetype(MONO, size[1] // 11)
    y = size[1] * 0.32
    for ln in lines:
        d.text((size[0] * 0.12, y), ln, fill=fg, font=font)
        y += size[1] * 0.14
    if dot:
        d.ellipse([size[0] * 0.08, size[1] * 0.08, size[0] * 0.16, size[1] * 0.16], outline=fg, width=3)
    im.save(OUT / name)


def ssd_label():
    w, h = 1024, 512
    im = Image.new('RGB', (w, h), (22, 23, 27))
    d = ImageDraw.Draw(im)
    big = ImageFont.truetype(SANS, 64)
    small = ImageFont.truetype(MONO, 30)
    d.text((48, 50), 'NVMe  M.2', fill=(232, 232, 228), font=big)
    d.text((48, 140), 'PCIe Gen4 x4   2 TB', fill=(170, 170, 168), font=small)
    d.rectangle([48, 196, 210, 202], fill=(255, 59, 48))
    r = random.Random(3)
    x = 48
    while x < 640:
        bw = r.choice([3, 3, 6, 9])
        d.rectangle([x, 300, x + bw, 420], fill=(225, 225, 222))
        x += bw + r.choice([3, 6])
    d.text((48, 435), 'S/N 0019-4471-2208', fill=(150, 150, 148), font=small)
    im.save(OUT / 'ssd_label.png')


def logo():
    src = Image.open(HERE.parent / 'hero-video' / 'logo-mark.png').convert('RGBA')
    a = src.split()[-1]
    big = a.resize((src.width * 6, src.height * 6), Image.LANCZOS)
    pad = Image.new('L', (big.width + 40, big.height + 40), 0)
    pad.paste(big, (20, 20))
    pad.save(OUT / 'logo_mask.png')


grille()
pcb()
chip_print('mem_print.png', ['LP5X 16G', 'D4-8533', '2614 KR'])
chip_print('soc_print.png', ['LS-AI 01', 'X2K-118', '2620'], fg=(120, 120, 124))
chip_print('nic_print.png', ['NET 400G', 'A1 2611'])
ssd_label()
logo()
print('textures written to', OUT)
