"""Colour swatches (ASE, CSS, JSON), fonts, and brand graphic elements."""
import glob
import json
import os
import shutil
import struct
import sys

sys.path.insert(0, os.path.dirname(__file__))
from brand import COLORS, HEX, rgb  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'out')
TTF = sys.argv[1] if len(sys.argv) > 1 else None


def ase(path):
    """Adobe Swatch Exchange file, readable by Illustrator, InDesign, Photoshop and Affinity."""
    blocks = []

    def block(kind, payload):
        blocks.append(struct.pack('>HI', kind, len(payload)) + payload)

    def name_bytes(n):
        return struct.pack('>H', len(n) + 1) + (n + '\0').encode('utf-16-be')

    block(0xC001, name_bytes('Logic Sonata'))
    for name, hexcode, *_ in COLORS:
        r, g, b = (c / 255 for c in rgb(hexcode))
        block(0x0001, name_bytes(f'LS {name}') + b'RGB ' + struct.pack('>fffH', r, g, b, 0))
    block(0xC002, b'')
    with open(path, 'wb') as f:
        f.write(b'ASEF' + struct.pack('>HHI', 1, 0, len(blocks)) + b''.join(blocks))


def main():
    d = os.path.join(OUT, '02-Colours')
    os.makedirs(d, exist_ok=True)
    ase(os.path.join(d, 'logic-sonata-colours.ase'))
    data = [
        {'name': n, 'hex': h, 'rgb': ' '.join(map(str, rgb(h))), 'cmyk': cmyk, 'pantone': pms, 'group': grp, 'usage': use}
        for n, h, cmyk, pms, grp, use in COLORS
    ]
    json.dump({'brand': 'Logic Sonata', 'colours': data}, open(os.path.join(d, 'logic-sonata-colours.json'), 'w'), indent=2)
    css = ':root {\n' + ''.join(f'  --ls-{n.lower().replace(" ", "-")}: {h}; /* {grp} */\n' for n, h, _c, _p, grp, _u in COLORS) + '}\n'
    open(os.path.join(d, 'logic-sonata-colours.css'), 'w').write(css)

    if TTF:
        fd = os.path.join(OUT, '03-Typography', 'fonts')
        keep = {
            'Space Grotesk': ['SpaceGrotesk_300Light', 'SpaceGrotesk_400Regular', 'SpaceGrotesk_500Medium', 'SpaceGrotesk_600SemiBold', 'SpaceGrotesk_700Bold'],
            'Inter': ['Inter_400Regular', 'Inter_500Medium', 'Inter_600SemiBold', 'Inter_700Bold'],
            'JetBrains Mono': ['JetBrainsMono_400Regular', 'JetBrainsMono_500Medium'],
            'Noto Sans Thai': ['NotoSansThai_400Regular', 'NotoSansThai_600SemiBold'],
        }
        for family, files in keep.items():
            fam_dir = os.path.join(fd, family.replace(' ', '-'))
            os.makedirs(fam_dir, exist_ok=True)
            for f in files:
                src = glob.glob(os.path.join(TTF, '**', f + '.ttf'), recursive=True)[0]
                shutil.copy(src, os.path.join(fam_dir, f.replace('_', '-') + '.ttf'))
            lic = glob.glob(os.path.join(TTF, '*' + family.lower().replace(' ', '-') + '*', 'package', 'LICENSE_FONT'))
            if lic:
                shutil.copy(lic[0], os.path.join(fam_dir, 'OFL-LICENSE.txt'))

    g = os.path.join(OUT, '10-Graphics')
    os.makedirs(g, exist_ok=True)
    red, obs, paper, slate = HEX['Signal Red'], HEX['Obsidian'], HEX['Paper'], HEX['Slate']
    graphics = {
        # Technical grid used behind heroes and covers (48-unit pitch), for dark and light grounds.
        'grid-pattern-on-dark.svg': f'<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480"><defs><pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#FFFFFF" stroke-opacity="0.06" stroke-width="1"/></pattern></defs><rect width="480" height="480" fill="{obs}"/><rect width="480" height="480" fill="url(#g)"/></svg>',
        'grid-pattern-on-light.svg': f'<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480"><defs><pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="{obs}" stroke-opacity="0.07" stroke-width="1"/></pattern></defs><rect width="480" height="480" fill="{paper}"/><rect width="480" height="480" fill="url(#g)"/></svg>',
        # Corner brackets: frame a photo, a panel or a key figure.
        'corner-brackets-red.svg': f'<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300" fill="none" stroke="{red}" stroke-width="2"><path d="M1 21V1h20M379 1h20v20M399 279v20h-20M21 299H1v-20"/></svg>',
        # Signal rule: the red line from the tagline lockup, fading at both ends.
        'signal-rule-red.svg': f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="4" viewBox="0 0 600 4"><defs><linearGradient id="r" x1="0" x2="1"><stop offset="0" stop-color="{red}" stop-opacity="0"/><stop offset="0.2" stop-color="{red}"/><stop offset="0.8" stop-color="{red}"/><stop offset="1" stop-color="{red}" stop-opacity="0"/></linearGradient></defs><rect y="1" width="600" height="2" fill="url(#r)"/></svg>',
        # Boundary: dashed frame meaning "inside your walls" in diagrams.
        'boundary-frame-red.svg': f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300"><rect x="1" y="1" width="598" height="298" rx="4" fill="{red}" fill-opacity="0.06" stroke="{red}" stroke-opacity="0.6" stroke-width="2" stroke-dasharray="8 8"/></svg>',
        # Dot grid for backgrounds of data slides and social posts.
        'dot-grid-on-dark.svg': f'<svg xmlns="http://www.w3.org/2000/svg" width="336" height="336" viewBox="0 0 336 336"><defs><pattern id="d" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="1" fill="{paper}" fill-opacity="0.14"/></pattern></defs><rect width="336" height="336" fill="{obs}"/><rect width="336" height="336" fill="url(#d)"/></svg>',
        # Eyebrow marker: the small red square that precedes section labels.
        'eyebrow-marker-red.svg': f'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><rect width="12" height="12" fill="{red}"/></svg>',
        # Hairline divider for dark layouts.
        'hairline-on-dark.svg': f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="2" viewBox="0 0 600 2"><rect width="600" height="1" fill="{slate}"/></svg>',
    }
    for name, content in graphics.items():
        open(os.path.join(g, name), 'w').write(content + '\n')
    print('colours, fonts and', len(graphics), 'graphics written')


if __name__ == '__main__':
    main()
