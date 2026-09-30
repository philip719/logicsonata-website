"""Compose the Logic Sonata logo lockups from the traced master paths.

Writes tight-cropped SVGs for every lockup x colour variant to out/01-Logos/<Lockup>/svg/.
PNG and PDF versions are rendered from these SVGs by render_logos.js.
"""
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = json.load(open(os.path.join(ROOT, 'src/logo-parts.json')))
OUT = os.path.join(ROOT, 'out/01-Logos')

RED = '#FF3B30'
OBSIDIAN = '#0B0C11'
PAPER = '#F2F1EE'
STONE = '#A7A6A1'
ASH = '#5F5E5A'
WHITE = '#FFFFFF'

# Element colours per variant: L, S, LOGIC, SONATA, tagline text, tagline accents (dots and rules).
VARIANTS = {
    'on-dark': dict(L=RED, S=PAPER, logic=PAPER, sonata=RED, tag=STONE, accent=RED),
    'on-light': dict(L=RED, S=OBSIDIAN, logic=OBSIDIAN, sonata=RED, tag=ASH, accent=RED),
    'white': dict(L=WHITE, S=WHITE, logic=WHITE, sonata=WHITE, tag=WHITE, accent=WHITE),
    'black': dict(L=OBSIDIAN, S=OBSIDIAN, logic=OBSIDIAN, sonata=OBSIDIAN, tag=OBSIDIAN, accent=OBSIDIAN),
}

# Bounding boxes of the traced elements, in master (source pixel) units.
MARK = (523, 246, 1040, 547)
WORD = (186, 632, 1374, 709)
TAG = (191, 769, 1364, 793)


def group(names, c, transform=''):
    keys = {'markL': 'L', 'markS': 'S', 'logic': 'logic', 'sonata': 'sonata', 'tagText': 'tag', 'tagDots': 'accent', 'tagRules': 'accent'}
    paths = ''.join(f'<path d="{P[n]}" fill="{c[keys[n]]}"/>' for n in names)
    return f'<g transform="{transform}">{paths}</g>' if transform else paths


def svg(view, body, title):
    x, y, w, h = view
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x:g} {y:g} {w:g} {h:g}" width="{w:g}" height="{h:g}" '
        f'role="img" aria-label="{title}"><title>{title}</title>{body}</svg>\n'
    )


def lockups(c):
    mx0, my0, mx1, my1 = MARK
    wx0, wy0, wx1, wy1 = WORD
    mark_h = my1 - my0
    out = {}

    # Horizontal (primary): mark, then the wordmark at 34% of the mark height, vertically centred.
    wh = mark_h * 0.34
    s = wh / (wy1 - wy0)
    gap = mark_h * 0.28
    ww = (wx1 - wx0) * s
    tx = (mx1 - mx0) + gap - wx0 * s
    ty = (mark_h - wh) / 2 - wy0 * s
    body = group(['markL', 'markS'], c, f'translate({-mx0} {-my0})') + group(['logic', 'sonata'], c, f'translate({tx:.2f} {ty:.2f}) scale({s:.5f})')
    out['Horizontal'] = ((0, 0, round((mx1 - mx0) + gap + ww, 2), mark_h), body)

    # Stacked: the master arrangement, mark centred over the wordmark.
    body = group(['markL', 'markS', 'logic', 'sonata'], c)
    out['Stacked'] = ((wx0, my0, wx1 - wx0, wy1 - my0), body)

    # Stacked with tagline and its red rules.
    body = group(['markL', 'markS', 'logic', 'sonata', 'tagText', 'tagDots', 'tagRules'], c)
    out['Stacked-Tagline'] = ((wx0, my0, wx1 - wx0, TAG[3] - my0), body)

    # Symbol only.
    out['Mark'] = ((mx0, my0, mx1 - mx0, mark_h), group(['markL', 'markS'], c))

    # Wordmark only.
    out['Wordmark'] = ((wx0, wy0, wx1 - wx0, wy1 - wy0), group(['logic', 'sonata'], c))
    return out


def app_icon(tile, c, name):
    """Square icon: the mark centred on a tile at 62% width (rounded corners are applied by each platform)."""
    size = 1024
    mx0, my0, mx1, my1 = MARK
    s = size * 0.62 / (mx1 - mx0)
    tx = (size - (mx1 - mx0) * s) / 2 - mx0 * s
    ty = (size - (my1 - my0) * s) / 2 - my0 * s
    body = f'<rect width="{size}" height="{size}" fill="{tile}"/>' + group(['markL', 'markS'], c, f'translate({tx:.2f} {ty:.2f}) scale({s:.5f})')
    return svg((0, 0, size, size), body, f'Logic Sonata app icon, {name}')


def main():
    count = 0
    for variant, c in VARIANTS.items():
        for lockup, (view, body) in lockups(c).items():
            d = os.path.join(OUT, lockup, 'svg')
            os.makedirs(d, exist_ok=True)
            label = f'Logic Sonata {lockup.lower().replace("-", " ")} logo, {variant.replace("-", " ")}'
            open(os.path.join(d, f'logic-sonata-{lockup.lower()}-{variant}.svg'), 'w').write(svg(view, body, label))
            count += 1
    d = os.path.join(OUT, 'App-Icon', 'svg')
    os.makedirs(d, exist_ok=True)
    icons = {
        'obsidian': (OBSIDIAN, VARIANTS['on-dark']),
        'paper': (PAPER, VARIANTS['on-light']),
        'red': (RED, VARIANTS['white']),
    }
    for name, (tile, c) in icons.items():
        open(os.path.join(d, f'logic-sonata-app-icon-{name}.svg'), 'w').write(app_icon(tile, c, name))
        count += 1
    print(f'{count} SVG files written')


if __name__ == '__main__':
    main()
