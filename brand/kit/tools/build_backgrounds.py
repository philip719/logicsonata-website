"""Background images used by the Office templates (slides, business cards, proposal cover)."""
import os

from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'build', 'office')
OBS, PAPER, RED = (11, 12, 17), (242, 241, 238), (255, 59, 48)
MM = 300 / 25.4  # pixels per millimetre at 300 dpi


def grid(size, bg, line, alpha, pitch, offset=0.0, width=1):
    im = Image.new('RGB', size, bg)
    ov = Image.new('RGBA', size, (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    x = offset
    while x < size[0]:
        d.line([(round(x), 0), (round(x), size[1])], fill=line + (alpha,), width=width)
        x += pitch
    y = offset
    while y < size[1]:
        d.line([(0, round(y)), (size[0], round(y))], fill=line + (alpha,), width=width)
        y += pitch
    im.paste(ov, (0, 0), ov)
    return im


def main():
    os.makedirs(OUT, exist_ok=True)
    grid((1920, 1080), OBS, (255, 255, 255), 14, 64).save(os.path.join(OUT, 'slide-bg-dark.png'))
    grid((1920, 1080), PAPER, OBS, 16, 64).save(os.path.join(OUT, 'slide-bg-light.png'))
    card = (round(96 * MM), round(60 * MM))  # 90 x 54 mm card plus 3 mm bleed
    grid(card, OBS, (255, 255, 255), 13, 6 * MM, 3 * MM, 2).save(os.path.join(OUT, 'card-bg-dark.png'), dpi=(300, 300))
    grid(card, PAPER, OBS, 13, 6 * MM, 3 * MM, 2).save(os.path.join(OUT, 'card-bg-light.png'), dpi=(300, 300))

    w, h = round(210 * MM), round(118 * MM)
    cover = grid((w, h), OBS, (255, 255, 255), 13, 8 * MM, 0, 2)
    logo = Image.open(os.path.join(ROOT, 'out', '01-Logos', 'Horizontal', 'png', 'logic-sonata-horizontal-on-dark-3000px.png'))
    lw = round(70 * MM)
    logo = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
    cover.paste(logo, (round(20 * MM), round(22 * MM)), logo)
    ImageDraw.Draw(cover).rectangle([0, h - round(2.2 * MM), w, h], fill=RED)
    cover.save(os.path.join(OUT, 'proposal-cover-band.png'), dpi=(300, 300))
    Image.new('RGB', (round(12 * MM), round(0.9 * MM)), RED).save(os.path.join(OUT, 'red-rule.png'), dpi=(300, 300))
    print('backgrounds written to', OUT)


if __name__ == '__main__':
    main()
