"""HTML sources for every print piece (PDF) and digital image (PNG) in the brand kit.

Writes build/pages/<name>.html plus build/manifest.json; render_print.js turns them into files.
Print pieces are laid out in millimetres with 3 mm bleed where the piece is trimmed.
"""
import json
import os
import re
import sys

import qrcode
import qrcode.image.svg

sys.path.insert(0, os.path.dirname(__file__))
from brand import COLORS, EMAILS, HEX, PLACEHOLDER as PH, WEBSITE, rgb  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUILD = os.path.join(ROOT, 'build', 'pages')
FONTS = os.path.join(ROOT, 'out', '03-Typography', 'fonts')
LOGOS = os.path.join(ROOT, 'out', '01-Logos')
os.makedirs(BUILD, exist_ok=True)

RED, OBS, PAPER, WHITE = HEX['Signal Red'], HEX['Obsidian'], HEX['Paper'], HEX['White']
GRAPHITE, SLATE, STONE, ASH, DEEP, STEEL = HEX['Graphite'], HEX['Slate'], HEX['Stone'], HEX['Ash'], HEX['Deep Red'], HEX['Steel']
MARKETS = 'SG · VN · ID · MY · TH'


def font_faces():
    faces = []
    spec = [
        ('Space Grotesk', 'Space-Grotesk', [(300, 'SpaceGrotesk-300Light'), (400, 'SpaceGrotesk-400Regular'), (500, 'SpaceGrotesk-500Medium'), (600, 'SpaceGrotesk-600SemiBold'), (700, 'SpaceGrotesk-700Bold')]),
        ('Inter', 'Inter', [(400, 'Inter-400Regular'), (500, 'Inter-500Medium'), (600, 'Inter-600SemiBold'), (700, 'Inter-700Bold')]),
        ('JetBrains Mono', 'JetBrains-Mono', [(400, 'JetBrainsMono-400Regular'), (500, 'JetBrainsMono-500Medium')]),
    ]
    for family, folder, weights in spec:
        for w, f in weights:
            faces.append(f"@font-face{{font-family:'{family}';font-weight:{w};src:url('file://{FONTS}/{folder}/{f}.ttf')}}")
    return '\n'.join(faces)


BASE_CSS = font_faces() + f"""
*{{box-sizing:border-box}}
html,body{{margin:0;padding:0}}
body{{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
.page{{position:relative;overflow:hidden;break-after:page}}
.page:last-child{{break-after:auto}}
.disp{{font-family:'Space Grotesk',Arial,sans-serif}}
.body{{font-family:Inter,Arial,sans-serif}}
.mono{{font-family:'JetBrains Mono',Consolas,monospace}}
.abs{{position:absolute}}
.red{{color:{RED}}}
svg{{display:block}}
"""


def logo(lockup, variant, width, unit='mm'):
    """Inline vector logo at a given width; the height follows the artwork's proportions."""
    name = 'app-icon' if lockup == 'App-Icon' else lockup.lower()
    src = open(os.path.join(LOGOS, lockup, 'svg', f'logic-sonata-{name}-{variant}.svg')).read()
    _, _, vw, vh = map(float, re.search(r'viewBox="([^"]+)"', src).group(1).split())
    h = width * vh / vw
    src = re.sub(r'width="[^"]+" height="[^"]+"', f'width="{width:.3f}{unit}" height="{h:.3f}{unit}"', src, count=1)
    return re.sub(r'<title>.*?</title>', '', src)


def grid_bg(color, alpha, pitch, unit='mm'):
    c = 'rgba({},{},{},{})'.format(*rgb(color), alpha)
    return (f'background-image:linear-gradient({c} 1px,transparent 1px),linear-gradient(90deg,{c} 1px,transparent 1px);'
            f'background-size:{pitch}{unit} {pitch}{unit};')


def tagline(color, dot=RED):
    return ''.join(f'{w}<span style="color:{dot}">.</span> ' for w in ['INTELLIGENCE', 'HARMONY', 'IMPACT']).strip()


def qr_svg(url, size, unit='mm', dark=OBS):
    img = qrcode.make(url, image_factory=qrcode.image.svg.SvgPathImage, border=0, error_correction=qrcode.constants.ERROR_CORRECT_M)
    s = img.to_string().decode()
    s = re.sub(r'width="[^"]+" height="[^"]+"', f'width="{size}{unit}" height="{size}{unit}"', s, count=1)
    return s.replace('<path ', f'<path fill="{dark}" ', 1).replace('<?xml version=\'1.0\' encoding=\'UTF-8\'?>', '')


MANIFEST = []


def doc(name, folder, kind, w, h, pages, unit='mm', previews=True):
    css = BASE_CSS
    if kind == 'pdf':
        css += f'@page{{size:{w}mm {h}mm;margin:0}}'
    css += f'.page{{width:{w}{unit};height:{h}{unit}}}'
    html = f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body>' + ''.join(pages) + '</body></html>'
    path = os.path.join(BUILD, f'{name}.html')
    open(path, 'w').write(html)
    MANIFEST.append({'name': name, 'folder': folder, 'kind': kind, 'w': w, 'h': h, 'unit': unit, 'pages': len(pages), 'html': path, 'previews': previews})


# ---------------------------------------------------------------- business cards
B = 3  # bleed, mm
CW, CH = 90 + 2 * B, 54 + 2 * B


def card_front(theme):
    dark = theme == 'dark'
    bg, grid_c, grid_a = (OBS, WHITE, 0.05) if dark else (PAPER, OBS, 0.05)
    variant = 'on-dark' if dark else 'on-light'
    tag_c = STONE if dark else ASH
    return f'''<div class="page" style="background:{bg};{grid_bg(grid_c, grid_a, 6)}background-position:{B}mm {B}mm">
      <div class="abs" style="left:0;right:0;top:{B + 17}mm;display:flex;justify-content:center">{logo('Horizontal', variant, 54)}</div>
      <div class="abs mono" style="left:0;right:0;top:{B + 31.5}mm;text-align:center;font-size:5.4pt;letter-spacing:.24em;color:{tag_c}">{tagline(tag_c)}</div>
    </div>'''


def card_back(theme):
    dark = theme == 'dark'
    bg = OBS if dark else WHITE
    ink, muted, label, line = (PAPER, STONE, RED, SLATE) if dark else (OBS, ASH, DEEP, '#DDDCD7')
    variant = 'on-dark' if dark else 'on-light'
    L = B + 7  # left text edge, 7 mm inside the trim
    rows = [('T', PH['phone']), ('E', PH['email']), ('W', WEBSITE)]
    contact = ''.join(f'<div><span style="color:{label};display:inline-block;width:3.6mm">{k}</span>{v}</div>' for k, v in rows)
    return f'''<div class="page" style="background:{bg}">
      <div class="abs" style="left:0;top:0;bottom:0;width:{B + 1.6}mm;background:{RED}"></div>
      <div class="abs" style="right:{B + 6}mm;top:{B + 6}mm">{logo('Mark', variant, 9.5)}</div>
      <div class="abs mono" style="left:{L}mm;top:{B + 6.3}mm;font-size:5.2pt;letter-spacing:.2em;color:{muted};display:flex;align-items:center;gap:1.6mm">
        <span style="width:1.5mm;height:1.5mm;background:{RED};display:inline-block"></span>PRIVATE AI</div>
      <div class="abs disp" style="left:{L}mm;top:{B + 13}mm;font-size:12.5pt;font-weight:600;letter-spacing:-.01em;color:{ink}">{PH['name']}</div>
      <div class="abs body" style="left:{L}mm;top:{B + 19.6}mm;font-size:7pt;color:{muted}">{PH['title']}</div>
      <div class="abs" style="left:{L}mm;right:{B + 6}mm;top:{B + 28}mm;height:.25mm;background:{line}"></div>
      <div class="abs mono" style="left:{L}mm;top:{B + 31.5}mm;font-size:6.3pt;line-height:1.75;color:{ink}">{contact}</div>
      <div class="abs mono" style="right:{B + 6}mm;bottom:{B + 6}mm;font-size:5pt;letter-spacing:.14em;color:{muted}">{MARKETS}</div>
    </div>'''


for theme in ['dark', 'light']:
    doc(f'business-card-{theme}', '04-Stationery/Business-Cards', 'pdf', CW, CH, [card_front(theme), card_back(theme)])

# ---------------------------------------------------------------- letterhead
def letterhead_page(first=True):
    line = '#DDDCD7'
    head = f'''<div class="abs" style="left:20mm;top:17mm">{logo('Horizontal', 'on-light', 58)}</div>
      <div class="abs mono" style="right:20mm;top:16.5mm;text-align:right;font-size:7pt;line-height:1.7;color:{ASH}">
        <div>{WEBSITE}</div><div>{EMAILS['sales']}</div><div>{PH['phone']}</div></div>
      <div class="abs" style="left:20mm;top:34mm;width:12mm;height:.9mm;background:{RED}"></div>''' if first else f'''
      <div class="abs" style="left:20mm;top:15mm">{logo('Mark', 'on-light', 11)}</div>
      <div class="abs mono" style="right:20mm;top:16mm;font-size:7pt;color:{ASH}">{WEBSITE}</div>'''
    foot = f'''<div class="abs" style="left:20mm;right:20mm;bottom:19mm;height:.2mm;background:{line}"></div>
      <div class="abs body" style="left:20mm;bottom:12mm;font-size:6.8pt;line-height:1.5;color:{ASH}">
        {PH['address'][0]} · {PH['address'][1]}, {PH['address'][2]}<br>{PH['reg']}</div>
      <div class="abs mono" style="right:20mm;bottom:12.6mm;font-size:6.5pt;letter-spacing:.14em;color:{ASH}">
        <span style="display:inline-block;width:1.4mm;height:1.4mm;background:{RED};margin-right:1.6mm"></span>{MARKETS}</div>'''
    return f'<div class="page" style="background:{WHITE}">{head}{foot}</div>'


doc('letterhead-a4', '04-Stationery/Letterhead', 'pdf', 210, 297, [letterhead_page(True), letterhead_page(False)])

# ---------------------------------------------------------------- envelope DL
env = f'''<div class="page" style="background:{WHITE}">
  <div class="abs" style="left:15mm;top:13mm">{logo('Horizontal', 'on-light', 48)}</div>
  <div class="abs body" style="left:15mm;top:25mm;font-size:6.8pt;line-height:1.55;color:{ASH}">{'<br>'.join(PH['address'])}</div>
  <div class="abs" style="left:15mm;bottom:13mm;width:14mm;height:.8mm;background:{RED}"></div>
  <div class="abs mono" style="left:33mm;bottom:12.2mm;font-size:6.3pt;letter-spacing:.14em;color:{ASH}">{WEBSITE}</div>
</div>'''
doc('envelope-dl', '04-Stationery/Envelope', 'pdf', 220, 110, [env])

# ---------------------------------------------------------------- name badge
NBW, NBH = 100 + 2 * B, 70 + 2 * B
badge = f'''<div class="page" style="background:{WHITE}">
  <div class="abs" style="left:0;right:0;top:0;height:{B + 24}mm;background:{OBS};{grid_bg(WHITE, 0.05, 6)}"></div>
  <div class="abs" style="left:{B + 7}mm;top:{B + 8.5}mm">{logo('Horizontal', 'on-dark', 46)}</div>
  <div class="abs" style="left:0;right:0;top:{B + 24}mm;height:1.2mm;background:{RED}"></div>
  <div class="abs disp" style="left:{B + 7}mm;top:{B + 33}mm;font-size:19pt;font-weight:600;letter-spacing:-.015em;color:{OBS}">{PH['name']}</div>
  <div class="abs body" style="left:{B + 7}mm;top:{B + 43.5}mm;font-size:9.5pt;color:{ASH}">{PH['title']}</div>
  <div class="abs mono" style="left:{B + 7}mm;bottom:{B + 6}mm;font-size:7pt;letter-spacing:.18em;color:{DEEP}">SINGAPORE</div>
  <div class="abs mono" style="right:{B + 7}mm;bottom:{B + 6}mm;font-size:7pt;letter-spacing:.14em;color:{ASH}">{WEBSITE}</div>
</div>'''
doc('name-badge', '08-Events', 'pdf', NBW, NBH, [badge])

# ---------------------------------------------------------------- roll-up banner
RW, RH = 850 + 2 * B, 2000 + 2 * B
products = [('PAI-KB', 'Private Knowledge Assistant'), ('PAI-VISION', 'Private Vision Intelligence'), ('PAI-CODE', 'Private Coding Assistant'),
            ('PAI-AGENT', 'Private AI Agent Platform'), ('PAI-IMG', 'Private Image Generation Studio')]
prod_rows = ''.join(f'<div style="display:flex;gap:18mm;align-items:baseline;padding:9mm 0;border-top:.6mm solid {SLATE}"><span class="mono" style="color:{RED};font-size:15mm;width:150mm;letter-spacing:.04em">{c}</span><span class="disp" style="font-size:24mm;font-weight:500;color:{PAPER}">{n}</span></div>' for c, n in products)
rollup = f'''<div class="page" style="background:{OBS};{grid_bg(WHITE, 0.045, 48)}">
  <div class="abs" style="left:{B + 60}mm;top:{B + 90}mm">{logo('Stacked-Tagline', 'on-dark', 480)}</div>
  <div class="abs disp" style="left:{B + 60}mm;right:{B + 60}mm;top:{B + 470}mm;font-size:104mm;font-weight:700;line-height:.98;letter-spacing:-.035em;color:{PAPER}">
    Private AI,<br>built inside<br><span class="red">your walls.</span></div>
  <div class="abs body" style="left:{B + 60}mm;right:{B + 100}mm;top:{B + 820}mm;font-size:21mm;line-height:1.4;color:{STONE}">
    Hardware, software, company knowledge, access controls, training and ongoing support. One accountable partner across Southeast Asia.</div>
  <div class="abs" style="left:{B + 60}mm;right:{B + 60}mm;top:{B + 1060}mm">{prod_rows}<div style="border-top:.6mm solid {SLATE}"></div></div>
  <div class="abs" style="left:{B + 60}mm;top:{B + 1420}mm;display:flex;gap:30mm;align-items:center">
    <div style="background:{WHITE};padding:12mm">{qr_svg('https://www.logicsonata.com/contact', 150)}</div>
    <div><div class="mono" style="font-size:12mm;letter-spacing:.2em;color:{STONE}">SCAN TO BOOK</div>
      <div class="disp" style="font-size:30mm;font-weight:600;color:{PAPER};margin-top:6mm;line-height:1.1">A Private AI<br>Consultation</div>
      <div class="mono" style="font-size:13mm;color:{RED};margin-top:10mm">{WEBSITE}</div></div></div>
  <div class="abs mono" style="left:{B + 60}mm;top:{B + 1720}mm;font-size:13mm;letter-spacing:.3em;color:{STONE}">{MARKETS}</div>
</div>'''
doc('roll-up-banner-850x2000', '08-Events', 'pdf', RW, RH, [rollup])

# ---------------------------------------------------------------- quick reference (A4 landscape)
def swatch(name, hexcode, cmyk, pms, dark_text):
    fg = OBS if dark_text else PAPER
    r, g, b = rgb(hexcode)
    border = f'border:.25mm solid #DDDCD7;' if hexcode in (WHITE, PAPER) else ''
    return f'''<div style="display:flex;flex-direction:column;border-radius:1mm;overflow:hidden;{border}">
      <div style="background:{hexcode};height:22mm;padding:3mm;color:{fg}" class="disp"><b style="font-size:10pt;font-weight:600">{name}</b></div>
      <div class="mono" style="background:{WHITE};padding:2.5mm 3mm;font-size:6.4pt;line-height:1.6;color:{OBS}">
        {hexcode}<br>RGB {r} {g} {b}<br>CMYK {cmyk}<br><span style="color:{ASH}">{pms}</span></div></div>'''


def section_label(text, color=ASH):
    return f'<div class="mono" style="font-size:7pt;letter-spacing:.2em;color:{color};display:flex;align-items:center;gap:2mm;margin-bottom:4mm"><span style="width:1.8mm;height:1.8mm;background:{RED}"></span>{text}</div>'


qr1 = f'''<div class="page" style="background:{PAPER};padding:16mm 18mm">
  <div style="display:flex;justify-content:space-between;align-items:flex-start">
    <div><div class="disp" style="font-size:24pt;font-weight:700;letter-spacing:-.02em;color:{OBS}">Brand quick reference</div>
      <div class="body" style="font-size:9pt;color:{ASH};margin-top:2mm">Logo, colour and type essentials for anyone producing Logic Sonata materials.</div></div>
    {logo('Mark', 'on-light', 16)}</div>
  <div style="display:grid;grid-template-columns:1.25fr 1fr;gap:10mm;margin-top:10mm">
    <div>{section_label('PRIMARY LOGO')}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4mm">
        <div style="background:{OBS};height:34mm;display:flex;align-items:center;justify-content:center">{logo('Horizontal', 'on-dark', 60)}</div>
        <div style="background:{WHITE};height:34mm;display:flex;align-items:center;justify-content:center;border:.25mm solid #DDDCD7">{logo('Horizontal', 'on-light', 60)}</div>
        <div style="background:{RED};height:34mm;display:flex;align-items:center;justify-content:center">{logo('Horizontal', 'white', 60)}</div>
        <div style="background:{WHITE};height:34mm;display:flex;align-items:center;justify-content:center;border:.25mm solid #DDDCD7">{logo('Horizontal', 'black', 60)}</div></div>
      <div class="body" style="font-size:7.5pt;line-height:1.55;color:{OBS};margin-top:4mm">
        Full colour on Obsidian or dark photography · Full colour on Paper or White · White on Signal Red · Black for single-colour print.</div></div>
    <div>{section_label('CLEAR SPACE AND MINIMUM SIZE')}
      <div style="background:{WHITE};border:.25mm solid #DDDCD7;height:48mm;display:flex;align-items:center;justify-content:center;position:relative">
        <div style="position:relative;padding:6.2mm;outline:.3mm dashed {RED}">{logo('Horizontal', 'on-light', 56)}</div></div>
      <div class="body" style="font-size:7.5pt;line-height:1.6;color:{OBS};margin-top:4mm">
        Keep clear space equal to the height of the wordmark letters (x) on every side.<br>
        Minimum width: horizontal logo 30 mm / 120 px · stacked logo 20 mm / 90 px · mark 8 mm / 24 px.</div></div></div>
  <div style="margin-top:9mm">{section_label('DO NOT')}
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:4mm">
      {''.join(f'<div><div style="background:{bg};border:.25mm solid #DDDCD7;height:22mm;display:flex;align-items:center;justify-content:center;overflow:hidden"><div style="{st}">{logo("Horizontal", "on-light", 34)}</div></div><div class="body" style="font-size:6.8pt;color:{OBS};margin-top:1.8mm">{t}</div></div>' for bg, st, t in [
          (WHITE, 'transform:scaleX(1.35)', 'Stretch or squash it'),
          (WHITE, 'transform:rotate(-12deg)', 'Rotate it'),
          (WHITE, 'filter:hue-rotate(160deg)', 'Change its colours'),
          (RED, '', 'Use full colour on red'),
          (WHITE, 'filter:drop-shadow(1.2mm 1.2mm .8mm rgba(0,0,0,.55))', 'Add effects or shadows')])}
    </div></div>
</div>'''

light_text = {'Paper', 'White', 'Stone', 'Amber', 'Ember'}
swatches = ''.join(swatch(n, h, c, p, n in light_text) for n, h, c, p, *_ in COLORS)
qr2 = f'''<div class="page" style="background:{PAPER};padding:16mm 18mm">
  {section_label('COLOUR')}
  <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:3.5mm">{swatches}</div>
  <div class="body" style="font-size:7.3pt;line-height:1.55;color:{OBS};margin-top:3.5mm">
    Balance: about 60% Obsidian or Paper, 30% neutrals, 10% Signal Red. Signal Red is legible as text on Obsidian; on light grounds use it at 24 px / 18 pt and above and use Deep Red for small text.
    CMYK and Pantone values are closest matches: always approve a printed proof.</div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8mm;margin-top:8mm">
    <div>{section_label('HEADLINES')}<div class="disp" style="font-size:26pt;font-weight:700;letter-spacing:-.03em;line-height:1;color:{OBS}">Space Grotesk</div>
      <div class="body" style="font-size:7.5pt;color:{ASH};margin-top:2mm">Bold 700 and SemiBold 600, tight tracking. Headlines, names, big numbers.</div></div>
    <div>{section_label('BODY TEXT')}<div class="body" style="font-size:22pt;font-weight:500;line-height:1.05;color:{OBS}">Inter</div>
      <div class="body" style="font-size:7.5pt;color:{ASH};margin-top:2mm">Regular 400 for reading, Medium and SemiBold for emphasis. Documents, slides, web.</div></div>
    <div>{section_label('LABELS AND DATA')}<div class="mono" style="font-size:18pt;font-weight:500;line-height:1.1;color:{OBS}">JetBrains Mono</div>
      <div class="body" style="font-size:7.5pt;color:{ASH};margin-top:2mm">Uppercase labels with wide tracking, product codes, contact details, figures.</div></div></div>
  <div class="body" style="font-size:7.3pt;color:{ASH};margin-top:6mm">Chinese: Noto Sans SC · Thai: Noto Sans Thai · When the brand fonts are unavailable (email, shared files): Arial.
    <span class="mono" style="float:right;color:{OBS}">{WEBSITE}</span></div>
</div>'''
doc('brand-quick-reference', '', 'pdf', 297, 210, [qr1, qr2])


# ---------------------------------------------------------------- digital images (px)
def social(name, folder, w, h, inner, bg=OBS, grid=True, pitch=48):
    g = grid_bg(WHITE if bg == OBS else OBS, 0.05, pitch, 'px') if grid else ''
    doc(name, folder, 'png', w, h, [f'<div class="page" style="background:{bg};{g}">{inner}</div>'], unit='px')


social('linkedin-banner-1584x396', '07-Social', 1584, 396, f'''
  <div class="abs" style="right:0;top:0;bottom:0;width:560px;background:linear-gradient(90deg,rgba(11,12,17,0),rgba(255,59,48,.10))"></div>
  <div class="abs disp" style="left:540px;top:118px;font-size:62px;font-weight:700;letter-spacing:-.03em;line-height:1;color:{PAPER}">Private AI, built inside <span class="red">your walls.</span></div>
  <div class="abs mono" style="left:543px;top:212px;font-size:17px;letter-spacing:.22em;color:{STONE}">{tagline(STONE)}</div>
  <div class="abs mono" style="left:543px;top:290px;font-size:15px;letter-spacing:.2em;color:{STONE};display:flex;gap:26px">
    <span style="color:{RED}">{WEBSITE.upper()}</span><span>{MARKETS}</span></div>''')
social('linkedin-profile-400x400', '07-Social', 400, 400, f'<div class="abs" style="left:76px;top:111px">{logo("Mark", "on-dark", 248, "px")}</div>', grid=False)
social('post-announcement-1200x1200', '07-Social', 1200, 1200, f'''
  <div class="abs" style="left:96px;top:96px">{logo('Horizontal', 'on-dark', 330, 'px')}</div>
  <div class="abs mono" style="left:96px;top:420px;font-size:24px;letter-spacing:.22em;color:{STONE};display:flex;align-items:center;gap:16px"><span style="width:14px;height:14px;background:{RED}"></span>ANNOUNCEMENT</div>
  <div class="abs disp" style="left:96px;right:96px;top:480px;font-size:104px;font-weight:700;letter-spacing:-.035em;line-height:.98;color:{PAPER}">Your headline goes <span class="red">here.</span></div>
  <div class="abs body" style="left:96px;right:200px;top:830px;font-size:34px;line-height:1.4;color:{STONE}">One or two lines of supporting copy that explain the news and why it matters.</div>
  <div class="abs mono" style="left:96px;bottom:90px;font-size:22px;letter-spacing:.18em;color:{RED}">{WEBSITE.upper()}</div>''')
social('post-quote-1200x1200', '07-Social', 1200, 1200, f'''
  <div class="abs disp" style="left:96px;top:120px;font-size:260px;font-weight:700;line-height:1;color:{RED}">&ldquo;</div>
  <div class="abs disp" style="left:96px;right:96px;top:380px;font-size:66px;font-weight:600;letter-spacing:-.02em;line-height:1.15;color:{PAPER}">A customer or partner quote, in their own words, set large and kept short.</div>
  <div class="abs" style="left:96px;top:860px;width:80px;height:6px;background:{RED}"></div>
  <div class="abs disp" style="left:96px;top:900px;font-size:34px;font-weight:600;color:{PAPER}">Name Surname</div>
  <div class="abs body" style="left:96px;top:950px;font-size:26px;color:{STONE}">Title, Company</div>
  <div class="abs" style="right:96px;bottom:96px">{logo('Mark', 'on-dark', 110, 'px')}</div>''', bg=GRAPHITE, grid=False)
social('post-stat-1200x1200', '07-Social', 1200, 1200, f'''
  <div class="abs mono" style="left:96px;top:110px;font-size:24px;letter-spacing:.22em;color:{PAPER};display:flex;align-items:center;gap:16px"><span style="width:14px;height:14px;background:{OBS}"></span>BY THE NUMBERS</div>
  <div class="abs disp" style="left:88px;top:260px;font-size:420px;font-weight:700;letter-spacing:-.05em;line-height:1;color:{WHITE}">100%</div>
  <div class="abs disp" style="left:96px;right:96px;top:720px;font-size:62px;font-weight:600;letter-spacing:-.02em;line-height:1.1;color:{OBS}">of your data stays under your control.</div>
  <div class="abs" style="left:96px;bottom:96px">{logo('Horizontal', 'white', 300, 'px')}</div>''', bg=RED, grid=False)
social('link-card-1200x627', '07-Social', 1200, 627, f'''
  <div class="abs" style="left:72px;top:64px">{logo('Horizontal', 'on-dark', 260, 'px')}</div>
  <div class="abs disp" style="left:72px;right:72px;top:210px;font-size:74px;font-weight:700;letter-spacing:-.03em;line-height:1;color:{PAPER}">Article or event title, <span class="red">set in two lines.</span></div>
  <div class="abs mono" style="left:72px;bottom:62px;font-size:20px;letter-spacing:.2em;color:{STONE}">{WEBSITE.upper()}</div>''')
social('story-1080x1920', '07-Social', 1080, 1920, f'''
  <div class="abs" style="left:90px;top:150px">{logo('Horizontal', 'on-dark', 380, 'px')}</div>
  <div class="abs disp" style="left:90px;right:90px;top:620px;font-size:128px;font-weight:700;letter-spacing:-.035em;line-height:.98;color:{PAPER}">Story headline, <span class="red">big and bold.</span></div>
  <div class="abs body" style="left:90px;right:120px;top:1110px;font-size:40px;line-height:1.4;color:{STONE}">Supporting line with one clear message and a call to action.</div>
  <div class="abs mono" style="left:90px;bottom:180px;font-size:28px;letter-spacing:.2em;color:{RED}">{WEBSITE.upper()}</div>''')
social('email-header-1200x300', '09-Digital', 1200, 300, f'''
  <div class="abs" style="left:64px;top:112px">{logo('Horizontal', 'on-dark', 320, 'px')}</div>
  <div class="abs mono" style="right:64px;top:132px;font-size:18px;letter-spacing:.22em;color:{STONE}">{tagline(STONE)}</div>''')
social('virtual-background-dark-1920x1080', '09-Digital', 1920, 1080, f'''
  <div class="abs" style="left:0;right:0;bottom:0;height:420px;background:linear-gradient(180deg,rgba(11,12,17,0),rgba(255,59,48,.08))"></div>
  <div class="abs" style="right:96px;top:80px">{logo('Horizontal', 'on-dark', 360, 'px')}</div>
  <div class="abs mono" style="right:98px;bottom:70px;font-size:20px;letter-spacing:.24em;color:{STONE}">{tagline(STONE)}</div>''', pitch=64)
social('virtual-background-light-1920x1080', '09-Digital', 1920, 1080, f'''
  <div class="abs" style="right:96px;top:80px">{logo('Horizontal', 'on-light', 360, 'px')}</div>
  <div class="abs" style="right:98px;bottom:80px;width:120px;height:6px;background:{RED}"></div>''', bg=PAPER, pitch=64)

json.dump(MANIFEST, open(os.path.join(ROOT, 'build', 'manifest.json'), 'w'), indent=1)
print(len(MANIFEST), 'documents prepared')
