"""The Logic Sonata brand guidelines as a printable A4 landscape PDF (brand book).

Writes build/pages/logic-sonata-brand-guidelines.html and build/manifest-guide.json;
render with: MANIFEST=build/manifest-guide.json node tools/render_print.js
"""
import json
import os
import re
import sys

from PIL import Image

sys.path.insert(0, os.path.dirname(__file__))
from brand import COLORS, HEX, WEBSITE, rgb  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUILD = os.path.join(ROOT, 'build')
PREV = os.path.join(BUILD, 'previews')
JPG = os.path.join(BUILD, 'guide-img')
FONTS = os.path.join(ROOT, 'out', '03-Typography', 'fonts')
LOGOS = os.path.join(ROOT, 'out', '01-Logos')
GRAPHICS = os.path.join(ROOT, 'out', '10-Graphics')
os.makedirs(JPG, exist_ok=True)

RED, OBS, PAPER, WHITE = HEX['Signal Red'], HEX['Obsidian'], HEX['Paper'], HEX['White']
GRAPHITE, SLATE, STONE, ASH, DEEP, STEEL, AMBER = HEX['Graphite'], HEX['Slate'], HEX['Stone'], HEX['Ash'], HEX['Deep Red'], HEX['Steel'], HEX['Amber']
HAIR = '#DDDCD7'
MARKETS = 'SG · VN · ID · MY · TH'


def img(name, maxw=1500):
    """JPEG copy of a preview (smaller PDF) and its file URL."""
    src = os.path.join(PREV, name + '.png')
    dst = os.path.join(JPG, name + '.jpg')
    if not os.path.exists(dst):
        im = Image.open(src).convert('RGB')
        if im.width > maxw:
            im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
        im.save(dst, quality=86)
    return 'file://' + dst


def logo(lockup, variant, width, unit='mm'):
    name = 'app-icon' if lockup == 'App-Icon' else lockup.lower()
    src = open(os.path.join(LOGOS, lockup, 'svg', f'logic-sonata-{name}-{variant}.svg')).read()
    _, _, vw, vh = map(float, re.search(r'viewBox="([^"]+)"', src).group(1).split())
    src = re.sub(r'width="[^"]+" height="[^"]+"', f'width="{width:.2f}{unit}" height="{width * vh / vw:.2f}{unit}"', src, count=1)
    return re.sub(r'<title>.*?</title>', '', src)


def faces():
    spec = [('Space Grotesk', 'Space-Grotesk', [(300, 'SpaceGrotesk-300Light'), (400, 'SpaceGrotesk-400Regular'), (500, 'SpaceGrotesk-500Medium'), (600, 'SpaceGrotesk-600SemiBold'), (700, 'SpaceGrotesk-700Bold')]),
            ('Inter', 'Inter', [(400, 'Inter-400Regular'), (500, 'Inter-500Medium'), (600, 'Inter-600SemiBold'), (700, 'Inter-700Bold')]),
            ('JetBrains Mono', 'JetBrains-Mono', [(400, 'JetBrainsMono-400Regular'), (500, 'JetBrainsMono-500Medium')])]
    return '\n'.join(f"@font-face{{font-family:'{f}';font-weight:{w};src:url('file://{FONTS}/{d}/{n}.ttf')}}" for f, d, ws in spec for w, n in ws)


def grid(color, alpha, pitch=8):
    c = 'rgba({},{},{},{})'.format(*rgb(color), alpha)
    return f'background-image:linear-gradient({c} 1px,transparent 1px),linear-gradient(90deg,{c} 1px,transparent 1px);background-size:{pitch}mm {pitch}mm;'


CSS = faces() + f"""
@page{{size:297mm 210mm;margin:0}}
*{{box-sizing:border-box}} html,body{{margin:0}} body{{-webkit-print-color-adjust:exact;print-color-adjust:exact;font-family:Inter,Arial,sans-serif;color:{OBS}}}
.page{{width:297mm;height:210mm;position:relative;overflow:hidden;break-after:page;background:{PAPER};padding:16mm 18mm 20mm}}
.page:last-child{{break-after:auto}}
.dark{{background:{OBS};color:{PAPER}}}
.disp{{font-family:'Space Grotesk',Arial,sans-serif}} .mono{{font-family:'JetBrains Mono',Consolas,monospace}}
.eb{{font-family:'JetBrains Mono',monospace;font-size:7.5pt;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:{ASH};display:flex;align-items:center;gap:2.2mm}}
.dark .eb{{color:{STONE}}}
.eb i{{display:inline-block;width:2mm;height:2mm;background:{RED}}}
.eb b{{color:{DEEP};font-weight:500}} .dark .eb b{{color:{RED}}}
h1{{font-family:'Space Grotesk',Arial,sans-serif;font-size:30pt;font-weight:700;letter-spacing:-.03em;line-height:1.05;margin:4mm 0 0}}
h1 span,.r{{color:{RED}}}
h3{{font-family:'Space Grotesk',Arial,sans-serif;font-size:12pt;font-weight:600;margin:0 0 1.5mm;letter-spacing:-.01em}}
p,li,td{{font-size:9pt;line-height:1.55}}
p{{margin:0 0 2.5mm}}
.lead{{font-size:11pt;line-height:1.55;color:{ASH};max-width:175mm;margin-top:4mm}}
.dark .lead{{color:{STONE}}}
.muted{{color:{ASH}}} .dark .muted{{color:{STONE}}}
.foot{{position:absolute;left:18mm;right:18mm;bottom:9mm;display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:6.8pt;letter-spacing:.14em;color:{ASH}}}
.dark .foot{{color:{STONE}}}
.row{{display:grid;gap:6mm}}
.tile{{display:flex;align-items:center;justify-content:center;border:.25mm solid {HAIR}}}
.cap{{font-size:7.5pt;color:{ASH};margin-top:1.8mm}} .dark .cap{{color:{STONE}}}
table{{border-collapse:collapse;width:100%}}
th{{font-family:'JetBrains Mono',monospace;font-size:7pt;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:{ASH};text-align:left;padding:1.8mm 2.5mm;border-bottom:.3mm solid {OBS}}}
td{{padding:1.8mm 2.5mm;border-bottom:.25mm solid {HAIR};vertical-align:top;font-size:8.5pt}}
ul{{margin:0;padding-left:4.5mm}} li{{margin-bottom:1.2mm}}
.shot{{border:.25mm solid {HAIR};display:block;width:100%}}
.dark .shot{{border-color:{SLATE}}}
.no{{position:relative}} .no:after{{content:'';position:absolute;right:2mm;top:2mm;width:5mm;height:5mm;border-radius:50%;background:{RED};
  -webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M6 6l12 12M18 6L6 18' stroke='black' stroke-width='4'/%3E%3C/svg%3E") center/60% no-repeat}}
"""

N = {'n': 0}


def page(eyebrow, title, body, dark=False, section=''):
    N['n'] += 1
    cls = 'page dark' if dark else 'page'
    head = f'<div class="eb"><b>{section}</b><i></i>{eyebrow}</div><h1>{title}</h1>' if eyebrow else ''
    return f'''<div class="{cls}">{head}{body}
      <div class="foot"><span>LOGIC SONATA · BRAND GUIDELINES</span><span>{N["n"]:02d}</span></div></div>'''


pages = []

# 1 cover
N['n'] += 1
pages.append(f'''<div class="page dark" style="{grid(WHITE, .045, 12)}padding:0">
  <div style="position:absolute;left:20mm;top:22mm">{logo('Horizontal', 'on-dark', 70)}</div>
  <div style="position:absolute;left:20mm;bottom:40mm">
    <div class="eb" style="color:{STONE}"><i></i>BRAND GUIDELINES · VERSION 1.0 · 2026</div>
    <div class="disp" style="font-size:54pt;font-weight:700;letter-spacing:-.035em;line-height:.98;margin-top:6mm">Brand<br><span class="r">guidelines.</span></div>
    <p style="font-size:11pt;color:{STONE};margin-top:6mm;max-width:150mm">How we present Logic Sonata: logo, colour, typography, graphics, voice, stationery and templates.</p></div>
  <div style="position:absolute;right:20mm;bottom:40mm">{logo('Mark', 'on-dark', 62)}</div>
  <div style="position:absolute;left:0;right:0;bottom:0;height:2.2mm;background:{RED}"></div>
  <div class="mono" style="position:absolute;left:20mm;bottom:12mm;font-size:7pt;letter-spacing:.18em;color:{STONE}">{WEBSITE.upper()}</div>
  <div class="mono" style="position:absolute;right:20mm;bottom:12mm;font-size:7pt;letter-spacing:.18em;color:{STONE}">{MARKETS}</div></div>''')

# 2 contents
toc = [('01', 'Brand', 'Positioning, tagline and principles', 3), ('02', 'Logo', 'Lockups, colour versions, clear space, minimum size, misuse', 4),
       ('03', 'Colour', 'Palette, schemes by background, legibility', 9), ('04', 'Typography', 'Families, scale, rules, other scripts', 12),
       ('05', 'Graphics and imagery', 'Elements, icons, photography, layout', 14), ('06', 'Voice', 'How we write', 16),
       ('07', 'Stationery and templates', 'Print, Office, social, digital, events', 17), ('08', 'Files', 'The brand kit and how to use it', 23)]
rows = ''.join(f'<div style="display:grid;grid-template-columns:14mm 70mm 1fr 12mm;align-items:baseline;padding:3.2mm 0;border-top:.25mm solid {HAIR}"><span class="mono r" style="font-size:9pt">{n}</span><span class="disp" style="font-size:15pt;font-weight:600">{t}</span><span class="muted" style="font-size:9pt">{d}</span><span class="mono muted" style="font-size:8pt;text-align:right">{p:02d}</span></div>' for n, t, d, p in toc)
pages.append(page('Contents', 'What is inside.', f'<div style="margin-top:9mm">{rows}<div style="border-top:.25mm solid {HAIR}"></div></div>'))

# 3 brand
principles = [('Controlled', 'Generous space, a strict grid, few elements per layout. Nothing decorative that does not carry meaning.'),
              ('Technical, not cold', 'Engineering details (mono labels, product codes, grids) sit beside plain, human sentences.'),
              ('One signal', 'Signal Red marks the one thing to notice. If everything is red, nothing is.'),
              ('Dark first', 'Obsidian is home. Paper and White are for print, documents and light contexts.'),
              ('Vendor neutral', 'We work across NVIDIA, AMD and other platforms. Never borrow another company\'s colours or product imagery.')]
pr = ''.join(f'<div style="border-top:.6mm solid {RED};padding-top:3mm"><h3>{t}</h3><p class="muted">{d}</p></div>' for t, d in principles)
pages.append(page('Brand', 'Private AI, built inside <span>your walls.</span>', f'''
  <p class="lead">Logic Sonata delivers secure private AI to businesses in Singapore, Vietnam, Indonesia, Malaysia and Thailand: hardware, software, company knowledge, access controls, implementation, training and ongoing support, from one accountable partner. The brand has to feel like the product: precise, technical, calm and in control.</p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6mm;margin-top:8mm">
    <div><div class="eb"><i></i>TAGLINE</div><div class="disp" style="font-size:15pt;font-weight:600;margin-top:2mm">Intelligence. Harmony. Impact.</div></div>
    <div><div class="eb"><i></i>POSITIONING LINE</div><div class="disp" style="font-size:15pt;font-weight:600;margin-top:2mm">Private AI, built inside your walls.</div></div>
    <div><div class="eb"><i></i>CALL TO ACTION</div><div class="disp" style="font-size:15pt;font-weight:600;margin-top:2mm">Book a Private AI Consultation</div></div></div>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5mm;margin-top:10mm">{pr}</div>''', section='01'))

# 4 logo lockups
grid_cells = ''.join(f'<div><div class="tile" style="background:{OBS};border-color:{OBS};height:42mm;overflow:hidden;padding:4mm">{logo(l, "on-dark", w)}</div><h3 style="margin-top:3mm">{t}</h3><p class="muted">{d}</p></div>'
                     for l, t, d, w in [('Horizontal', 'Horizontal (primary)', 'Documents, slides, email, website, business cards. Use it first.', 56),
                                        ('Stacked', 'Stacked', 'Square and tall formats: social tiles, posters, backdrops.', 32),
                                        ('Stacked-Tagline', 'Stacked with tagline', 'Covers, banners, events. At least 60 mm / 300 px wide.', 34),
                                        ('Mark', 'Mark', 'App icons, avatars, favicons, slide footers, small spaces.', 20),
                                        ('Wordmark', 'Wordmark', 'Only where the mark already appears nearby.', 42)])
pages.append(page('Logo', 'Five lockups, one logo.', f'''
  <p class="lead">The LS mark (a red L locked to an S by a shared diagonal cut) and the LOGIC SONATA wordmark are custom artwork: never retype the name in a font. Always place the supplied files.</p>
  <div style="display:grid;grid-template-columns:1.6fr 1fr 1fr .8fr 1.2fr;gap:5mm;margin-top:9mm">{grid_cells}</div>''', section='02'))

# 5 colour versions
vers = [('on-dark', OBS, 'Full colour on dark', 'Obsidian, Graphite, dark photography'),
        ('on-light', PAPER, 'Full colour on light', 'Paper, White, light photography'),
        ('white', RED, 'White', 'Signal Red, busy or mid-tone photography'),
        ('black', WHITE, 'Black', 'Single-colour print, stamps, embossing, fax')]
vc = ''.join(f'<div><div class="tile" style="background:{bg};height:46mm;{"border-color:" + bg if bg in (OBS, RED) else ""}">{logo("Horizontal", v, 50)}</div><h3 style="margin-top:3mm">{t}</h3><p class="muted">{d}</p></div>' for v, bg, t, d in vers)
vs = ''.join(f'<div class="tile" style="background:{bg};height:30mm;{"border-color:" + bg if bg in (OBS, RED) else ""}">{logo("Stacked", v, 34)}</div>' for v, bg, _, _ in vers)
pages.append(page('Logo · colour versions', 'The right version for every ground.', f'''
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5mm;margin-top:9mm">{vc}</div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5mm;margin-top:5mm">{vs}</div>
  <p class="muted" style="margin-top:5mm">On Signal Red always use the white version: the red parts of the full-colour logo disappear on a red ground.</p>''', section='02'))

# 6 clear space & min size
pages.append(page('Logo · clear space and size', 'Give it room.', f'''
  <div style="display:grid;grid-template-columns:1.25fr 1fr;gap:10mm;margin-top:9mm">
    <div><div class="tile" style="background:{WHITE};height:92mm;position:relative">
      <div style="position:relative;padding:9mm;outline:.35mm dashed {RED}">{logo('Horizontal', 'on-light', 110)}
        <span class="mono" style="position:absolute;left:1.5mm;top:1mm;font-size:7pt;color:{RED}">x</span>
        <span class="mono" style="position:absolute;right:1.5mm;bottom:1mm;font-size:7pt;color:{RED}">x</span></div></div>
      <p class="muted" style="margin-top:3mm">Keep a clear zone equal to <b>x</b>, the height of the wordmark letters, on every side. For the mark alone, keep a quarter of its height clear. Nothing enters the clear zone.</p></div>
    <div><table><tr><th>Lockup</th><th>Print</th><th>Screen</th></tr>
      <tr><td>Horizontal</td><td>30 mm</td><td>120 px</td></tr><tr><td>Stacked</td><td>20 mm</td><td>90 px</td></tr>
      <tr><td>Stacked with tagline</td><td>60 mm</td><td>300 px</td></tr><tr><td>Mark</td><td>8 mm</td><td>24 px (16 px favicon)</td></tr></table>
      <div class="eb" style="margin-top:8mm"><i></i>PLACEMENT</div>
      <ul style="margin-top:2.5mm"><li>Top left by default, aligned to the layout margin.</li><li>Centred only on covers, business card fronts and closing slides.</li><li>One logo per page or slide. Partner logos sit in a separate zone at equal or smaller weight.</li></ul></div></div>''', section='02'))

# 7 misuse
mis = [('transform:scaleX(1.4)', WHITE, 'Stretch or squash it'), ('transform:rotate(-12deg)', WHITE, 'Rotate or skew it'),
       ('filter:hue-rotate(160deg)', WHITE, 'Change its colours'), ('', RED, 'Use full colour on red'),
       ('filter:drop-shadow(1.2mm 1.2mm .8mm rgba(0,0,0,.55))', WHITE, 'Add shadows or effects'),
       (f'background-image:url({img("virtual-background-light-1920x1080-1")});background-size:cover', WHITE, 'Place it on busy imagery without contrast'),
       ('letter-spacing:0;transform:scale(.9)', WHITE, 'Rebuild it in a font'), ('opacity:.35', WHITE, 'Fade it or use low contrast')]
mc = ''
for i, (st, bg, t) in enumerate(mis):
    inner = f'<div class="disp" style="font-size:15pt;font-weight:600;letter-spacing:.2em">LOGIC <span class="r">SONATA</span></div>' if t.startswith('Rebuild') else f'<div style="{st if not t.startswith("Place") else ""}">{logo("Horizontal", "on-light", 50)}</div>'
    tile_style = st if t.startswith('Place') else ''
    mc += f'<div><div class="tile no" style="background:{bg};height:34mm;{tile_style}">{inner}</div><p style="margin-top:2mm">{t}</p></div>'
pages.append(page('Logo · misuse', 'Never alter the logo.', f'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6mm;margin-top:9mm">{mc}</div>', section='02'))

# 8 app icons / mark
icons = ''.join(f'<div style="text-align:center"><div style="width:34mm;height:34mm;border-radius:7.5mm;overflow:hidden;margin:0 auto;{"border:.25mm solid " + HAIR if n == "paper" else ""}">{logo("App-Icon", n, 34)}</div><p class="muted" style="margin-top:2.5mm">{t}</p></div>'
                for n, t in [('obsidian', 'Obsidian (default)'), ('paper', 'Paper'), ('red', 'Signal Red')])
pages.append(page('Logo · the mark', 'The mark on its own.', f'''
  <p class="lead">Use the LS mark alone where the full logo cannot fit or where the brand is already established: app icons, social avatars, favicons, slide footers and as a graphic device.</p>
  <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:10mm;margin-top:9mm;align-items:start">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6mm">{icons}</div>
    <div><ul><li>App icons: the mark centred at 62% width on a square tile. Platforms round the corners themselves.</li>
      <li>Supplied at 1024, 512, 180 and 32 px, plus SVG and PDF.</li><li>Social avatars use the Obsidian tile.</li>
      <li>Never add the wordmark inside an icon tile, and never place the mark inside a circle with other elements.</li></ul></div></div>''', section='02'))

# 9 palette
def sw(name, h, cmyk, pms, big=False):
    fg = OBS if name in ('Paper', 'White', 'Stone', 'Amber', 'Ember') else WHITE
    r, g, b = rgb(h)
    return f'''<div style="border:.25mm solid {HAIR if h in (WHITE, PAPER) else h};background:{WHITE}">
      <div style="background:{h};height:{30 if big else 20}mm;padding:3mm;color:{fg}"><span class="disp" style="font-size:{12 if big else 10}pt;font-weight:600">{name}</span></div>
      <div class="mono" style="padding:2.4mm 3mm;font-size:6.6pt;line-height:1.6">{h}<br>RGB {r} {g} {b}<br>CMYK {cmyk}<br><span style="color:{ASH}">{pms}</span></div></div>'''


core = ''.join(sw(n, h, c, p, True) for n, h, c, p, g, _ in COLORS if g == 'core')
neut = ''.join(sw(n, h, c, p) for n, h, c, p, g, _ in COLORS if g == 'neutral')
acc = ''.join(sw(n, h, c, p) for n, h, c, p, g, _ in COLORS if g == 'accent')
pages.append(page('Colour', 'A small palette, one bright signal.', f'''
  <div class="eb" style="margin-top:7mm"><i></i>CORE</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4mm;margin-top:2.5mm">{core}</div>
  <div style="display:grid;grid-template-columns:5fr 3fr;gap:6mm;margin-top:5mm">
    <div><div class="eb"><i></i>SUPPORTING NEUTRALS</div><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:3mm;margin-top:2.5mm">{neut}</div></div>
    <div><div class="eb"><i></i>ACCENTS</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:3mm;margin-top:2.5mm">{acc}</div></div></div>
  <p class="muted" style="margin-top:3.5mm;font-size:7.5pt">CMYK and Pantone values are closest matches: always approve a printed proof, especially for Signal Red.</p>''', section='03'))

# 10 schemes
schemes = [('Dark (default)', OBS, PAPER, STONE, RED, 'on-dark'), ('Dark raised', GRAPHITE, PAPER, STONE, RED, 'on-dark'),
           ('Light', PAPER, OBS, ASH, RED, 'on-light'), ('Document', WHITE, OBS, ASH, DEEP, 'on-light'),
           ('Signal', RED, WHITE, OBS, OBS, 'white'), ('Photography', '#1f2127', PAPER, STONE, RED, 'on-dark')]
sc = ''.join(f'''<div><div style="background:{bg};height:44mm;padding:5mm;position:relative;{"border:.25mm solid " + HAIR if bg in (WHITE, PAPER) else ""}">
  {logo("Horizontal", lv, 30)}
  <div class="disp" style="position:absolute;left:5mm;bottom:12mm;font-size:13pt;font-weight:700;letter-spacing:-.02em;color:{ink}">Headline with a <span style="color:{acc if n != "Signal" else OBS}">red phrase.</span></div>
  <div style="position:absolute;left:5mm;bottom:6mm;font-size:7pt;color:{mut}">Secondary text sits in the muted colour.</div></div>
  <h3 style="margin-top:2.5mm">{n}</h3></div>''' for n, bg, ink, mut, acc, lv in schemes)
bar = f'<div style="display:flex;height:9mm;margin-top:3mm"><div style="flex:6;background:{OBS};color:{PAPER};font-size:7pt;padding:2.6mm 3mm" class="mono">60% GROUND</div><div style="flex:3;background:{STONE};font-size:7pt;padding:2.6mm 3mm" class="mono">30% NEUTRALS</div><div style="flex:1;background:{RED};color:{WHITE};font-size:7pt;padding:2.6mm 2mm" class="mono">10%</div></div>'
pages.append(page('Colour · schemes', 'A scheme for every background.', f'''
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5mm;margin-top:7mm">{sc}</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10mm;margin-top:3mm;align-items:end">
    <div>{bar}</div><p class="muted" style="margin:0">Use Signal for moments, not pages: one divider slide, one statistic post. Over photography, add an Obsidian overlay at 50 to 70%.</p></div>''', section='03'))

# 11 legibility
leg = [('Paper on Obsidian', PAPER, OBS, '17.3:1', 'All text'), ('Obsidian on Paper', OBS, PAPER, '17.3:1', 'All text'), ('Stone on Obsidian', STONE, OBS, '8.0:1', 'Secondary text'),
       ('Ash on Paper', ASH, PAPER, '5.8:1', 'Secondary text'), ('Signal Red on Obsidian', RED, OBS, '5.5:1', 'Text of any size'), ('Deep Red on Paper', DEEP, PAPER, '5.0:1', 'Small red text on light'),
       ('Signal Red on Paper', RED, PAPER, '3.1:1', '24 px / 18 pt and up, graphics'), ('White on Signal Red', WHITE, RED, '3.6:1', '24 px / 18 pt and up'), ('Obsidian on Signal Red', OBS, RED, '5.5:1', 'Button labels, small text')]
lc = [f'<div style="display:grid;grid-template-columns:34mm 1fr;border-top:.25mm solid {HAIR};padding:2.2mm 0;align-items:center"><div style="background:{bg};color:{fg};padding:3mm;font-weight:600;font-size:9pt;{"border:.25mm solid " + HAIR if bg == PAPER else ""}" class="disp">Aa {r}</div><div style="padding-left:4mm"><b style="font-size:9pt">{n}</b><br><span class="muted" style="font-size:8pt">{u}</span></div></div>' for n, fg, bg, r, u in leg]
pages.append(page('Colour · legibility', 'Readable in every combination.', f'''
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6mm;margin-top:7mm">
    <div>{''.join(lc[0:3])}</div><div>{''.join(lc[3:6])}</div><div>{''.join(lc[6:9])}</div></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10mm;margin-top:6mm">
    <p class="muted">Amber always travels with a word or icon: never rely on colour alone to carry meaning. Keyboard focus on screen is a 2 px solid Signal Red ring, 3 px outside the element.</p>
    <p class="muted">Charts: Signal Red for the series that matters, Stone or Ash for comparison, Steel for a third series, Amber only to flag a value.</p></div>''', section='03'))

# 12 typography families
fam = [('Space Grotesk', "'Space Grotesk'", 700, 'Headlines, names, big numbers, slide titles', 'SemiBold 600 · Bold 700', 'Aa'),
       ('Inter', 'Inter', 500, 'Body copy, documents, forms, interfaces', 'Regular 400 · Medium 500 · SemiBold 600', 'Aa'),
       ('JetBrains Mono', "'JetBrains Mono'", 500, 'Eyebrow labels, product codes, contact details, figures', 'Regular 400 · Medium 500', 'Aa')]
fc = ''.join(f'''<div style="border-top:.6mm solid {RED};padding-top:4mm"><div style="font-family:{ff};font-weight:{w};font-size:64pt;line-height:1;letter-spacing:{"-.03em" if w == 700 else "0"}">{s}</div>
  <h3 style="margin-top:4mm;font-size:14pt">{n}</h3><p class="muted">{use}</p><p class="mono" style="font-size:7.5pt">{ws}</p>
  <p style="font-family:{ff};font-size:10pt;margin-top:3mm;line-height:1.4">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 · Ạ ắ ơ ư đ</p></div>''' for n, ff, w, use, ws, s in fam)
pages.append(page('Typography', 'Three families, clear roles.', f'''
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8mm;margin-top:8mm">{fc}</div>
  <p class="muted" style="margin-top:5mm">All three are free and open source (SIL Open Font License) and included in the brand kit. When brand fonts are unavailable, such as in email, use Arial.</p>''', section='04'))

# 13 type scale
scale = [('display-xl', '84 px · 36 to 54 pt', "font-family:'Space Grotesk';font-weight:700;font-size:26pt;letter-spacing:-.035em;line-height:1", 'Private AI, built inside <span class="r">your walls.</span>'),
         ('display-l', '52 px · 24 to 32 pt', "font-family:'Space Grotesk';font-weight:700;font-size:22pt;letter-spacing:-.03em", 'One partner. The complete stack.'),
         ('heading', '22 px · 12 to 14 pt', "font-family:'Space Grotesk';font-weight:600;font-size:13pt;letter-spacing:-.02em", 'Private Knowledge Assistant'),
         ('lead', '20 px · 12 pt', f"font-size:11pt;color:{ASH}", 'Your data never leaves your control.'),
         ('body', '16 px · 10 pt', 'font-size:9.5pt', 'Every answer cites its source and every user sees only what their role allows.'),
         ('eyebrow', '12 px · 7 pt', f"font-family:'JetBrains Mono';font-weight:500;font-size:7.5pt;letter-spacing:.18em;color:{ASH}", '<span style="display:inline-block;width:2mm;height:2mm;background:#FF3B30;margin-right:2mm"></span>WHO WE SERVE'),
         ('code', '13 px · 7 to 8 pt', "font-family:'JetBrains Mono';font-size:8.5pt", 'PAI-KB · sales@logicsonata.com')]
st = ''.join(f'<div style="display:grid;grid-template-columns:30mm 36mm 1fr;align-items:baseline;border-top:.25mm solid {HAIR};padding:2.6mm 0"><span class="mono r" style="font-size:8pt">{n}</span><span class="mono muted" style="font-size:7.5pt">{sz}</span><div style="{css}">{s}</div></div>' for n, sz, css, s in scale)
pages.append(page('Typography · scale and rules', 'Set type with discipline.', f'''
  <div style="display:grid;grid-template-columns:1.7fr 1fr;gap:10mm;margin-top:7mm">
    <div>{st}</div>
    <div><div class="eb"><i></i>RULES</div><ul style="margin-top:2.5mm">
      <li>Sentence case headlines, usually ending with a full stop, with one red phrase at the end.</li>
      <li>Running text around 62 characters per line.</li><li>Eyebrows: short, uppercase, mono.</li><li>Product codes always in mono.</li>
      <li>No more than two headline sizes per page or slide.</li></ul>
      <div class="eb" style="margin-top:6mm"><i></i>OTHER SCRIPTS</div><ul style="margin-top:2.5mm">
      <li>Chinese: Noto Sans SC, no tracking, headline line height 1.3.</li><li>Thai: Noto Sans Thai, no tracking, line height 1.4 (headlines) and 1.75 (body).</li>
      <li>Vietnamese, Bahasa Indonesia, Bahasa Melayu: the brand fonts as normal.</li></ul></div></div>''', section='04'))

# 14 graphic elements
ge = [('grid-pattern-on-dark', 'Technical grid', 'Heroes, covers, title slides, card fronts', OBS), ('dot-grid-on-dark', 'Dot grid', 'Data slides and social backgrounds', OBS),
      ('corner-brackets-red', 'Corner brackets', 'Frame one photo, panel or key figure', WHITE), ('signal-rule-red', 'Signal rule', 'Beside the tagline, under a cover title', WHITE),
      ('boundary-frame-red', 'Boundary frame', 'Diagrams: what runs inside your walls', WHITE), ('eyebrow-marker-red', 'Eyebrow marker', 'Before every eyebrow label', WHITE)]
gc = ''.join(f'<div><div class="tile" style="background:{bg};height:34mm;overflow:hidden;{"border-color:" + OBS if bg == OBS else ""}"><img src="file://{GRAPHICS}/{f}.svg" style="{"width:100%;height:100%;object-fit:cover" if "grid" in f else ("width:60%" if "rule" in f or "frame" in f or "brackets" in f else "width:8mm")}"></div><h3 style="margin-top:2.5mm">{t}</h3><p class="muted">{d}</p></div>' for f, t, d, bg in ge)
pages.append(page('Graphics', 'Elements with a purpose.', f'''
  <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:5mm;margin-top:9mm">{gc}</div>
  <p class="muted" style="margin-top:5mm">Never combine more than two elements in one layout, and never place them in the logo's clear space. Accent bar: a short solid red bar (12 mm / 80 px) under a letterhead logo or above a quote attribution.</p>''', section='05'))

# 15 imagery, icons, layout
pages.append(page('Imagery, icons and layout', 'Real, calm and uncluttered.', f'''
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8mm;margin-top:9mm">
    <div style="border-top:.6mm solid {RED};padding-top:4mm"><h3>Photography</h3><ul>
      <li>Real places and real work across Southeast Asia: factory floors, studios, warehouses, offices.</li><li>Natural light, uncluttered frames, calm composition.</li>
      <li>Hardware appears as a generic, vendor-neutral appliance.</li><li>No stock clichés: glowing brains, binary rain, robot handshakes, padlocks on circuits.</li>
      <li>Label renders honestly, for example "Illustrative render".</li></ul></div>
    <div style="border-top:.6mm solid {RED};padding-top:4mm"><h3>Iconography</h3><ul>
      <li>Simple line icons, 1.5 to 2 px stroke, square ends, on a 24 px grid.</li><li>In the ink colour, or Signal Red on a light red tint tile.</li>
      <li>No filled, 3D or emoji-style icons. No emoji as decoration.</li></ul>
      <div style="display:flex;gap:3mm;margin-top:4mm">{''.join(f'<div style="width:12mm;height:12mm;background:rgba(255,59,48,.14);display:flex;align-items:center;justify-content:center"><svg viewBox="0 0 24 24" width="6.5mm" height="6.5mm" fill="none" stroke="{RED}" stroke-width="1.8" stroke-linecap="square"><path d="{d}"/></svg></div>' for d in ["M4 5h11a2 2 0 0 1 2 2v12l-3-2-3 2-3-2-3 2V7a2 2 0 0 1 2-2z", "M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z", "M3 12h18M12 3v18", "M5 12h14M13 6l6 6-6 6"])}</div></div>
    <div style="border-top:.6mm solid {RED};padding-top:4mm"><h3>Layout</h3><ul>
      <li>A 12-column grid with generous margins; the technical grid sits behind, never in front.</li><li>Left-aligned text; centre only covers and closing moments.</li>
      <li>Square corners on cards, panels, images and colour blocks. Buttons and inputs take a 4 px radius.</li><li>One focal point per layout: usually a headline with its red phrase.</li></ul></div></div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5mm;margin-top:7mm">
    <img class="shot" src="{img('deck-title')}"><img class="shot" src="{img('post-announcement-1200x1200-1')}" style="height:46mm;object-fit:cover"><img class="shot" src="{img('deck-figures')}"></div>''', section='05'))

# 16 voice
pages.append(page('Voice', 'Confident, direct, specific.', f'''
  <p class="lead">Logic Sonata sounds like a senior engineer who is also good with customers: confident, direct and specific, never hyped.</p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8mm;margin-top:8mm">
    <div style="border-top:.6mm solid {RED};padding-top:4mm"><h3>How we write</h3><ul>
      <li><b>Plain and direct.</b> Short sentences, active voice, everyday words.</li><li><b>Specific over clever.</b> Name the document, the role, the number.</li>
      <li><b>Calm about risk.</b> State the problem clearly, without fear.</li><li><b>You and we.</b> Speak about the customer's business.</li>
      <li><b>Honest claims.</b> Only facts we can support. No prices until they are published.</li></ul></div>
    <div style="border-top:.6mm solid {RED};padding-top:4mm"><h3>Mechanics</h3><ul>
      <li>Sentence case for headlines, buttons and navigation.</li><li>British spelling: organisation, optimise, colour.</li>
      <li>Never use a long dash as punctuation: use a comma, colon or full stop.</li><li>Product names in full on first mention: Private Knowledge Assistant (PAI-KB).</li>
      <li>Markets in this order: Singapore, Vietnam, Indonesia, Malaysia, Thailand.</li></ul></div>
    <div style="border-top:.6mm solid {RED};padding-top:4mm"><h3>Say this</h3>
      <table><tr><td style="color:{DEEP}">Do</td><td>"Your data never leaves your control."</td></tr><tr><td class="muted">Not</td><td class="muted">"Leveraging sovereign data paradigms."</td></tr>
      <tr><td style="color:{DEEP}">Do</td><td>"SOPs, buyer requirements and costing sheets."</td></tr><tr><td class="muted">Not</td><td class="muted">"Your valuable information."</td></tr>
      <tr><td style="color:{DEEP}">Do</td><td>"Book a Private AI Consultation"</td></tr><tr><td class="muted">Not</td><td class="muted">"Unlock the future of AI today!"</td></tr></table></div></div>
  <p class="muted" style="margin-top:6mm">The website runs in English, Simplified Chinese, Bahasa Indonesia, Bahasa Melayu, Thai and Vietnamese. Translations are native adaptations; product codes, brand and technology names stay in English.</p>''', section='06'))

# 17 business cards
pages.append(page('Stationery · business cards', 'Business cards.', f'''
  <p class="lead">90 x 54 mm with 3 mm bleed. Dark edition as the default; light edition for conservative sectors. Print on 400 to 450 gsm uncoated or soft-touch stock.</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:6mm;margin-top:7mm">
    <img class="shot" src="{img('business-card-dark-1')}"><img class="shot" src="{img('business-card-dark-2')}">
    <img class="shot" src="{img('business-card-light-1')}"><img class="shot" src="{img('business-card-light-2')}"></div>''', section='07'))

# 18 letterhead, envelope, signature
pages.append(page('Stationery · correspondence', 'Letterhead, envelope, email.', f'''
  <div style="display:grid;grid-template-columns:52mm 52mm 1fr;gap:7mm;margin-top:8mm;align-items:start">
    <div><img class="shot" src="{img('letterhead-a4-1')}"><p class="cap">A4 letterhead, first page (print PDF and Word template)</p></div>
    <div><img class="shot" src="{img('letterhead-docx-1')}"><p class="cap">Word letter template with sample text</p></div>
    <div><img class="shot" src="{img('envelope-dl-1')}"><p class="cap">DL envelope, 220 x 110 mm</p>
      <div style="margin-top:6mm;border:.25mm solid {HAIR};background:{WHITE};padding:4mm"><img src="{img('email-signature')}" style="width:70%;display:block"></div>
      <p class="cap">Email signature: HTML with setup steps for Outlook, Gmail and Apple Mail. Logo hosted at www.logicsonata.com/brand.</p></div></div>''', section='07'))

# 19 presentation
pages.append(page('Templates · presentation', 'The presentation template.', f'''
  <p class="lead">PowerPoint, 16:9, 13 slides. Duplicate a slide to reuse its layout; speaker notes explain each one. Charts and tables are native and editable.</p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5mm;margin-top:7mm">
    {''.join(f'<img class="shot" src="{img(n)}">' for n in ['deck-title', 'deck-section', 'deck-figures', 'deck-chart', 'deck-light', 'deck-closing'])}</div>''', section='07'))

# 20 documents
pages.append(page('Templates · documents', 'Proposals and reports.', f'''
  <div style="display:grid;grid-template-columns:62mm 62mm 1fr;gap:8mm;margin-top:8mm;align-items:start">
    <img class="shot" src="{img('proposal-1')}"><img class="shot" src="{img('proposal-2')}">
    <div><p class="lead" style="margin-top:0">Word template with a dark cover band, title block, headings, callout, scope table, running header and page numbers.</p>
      <ul style="margin-top:4mm"><li>Use it for proposals, reports and briefing papers.</li><li>Headings in Space Grotesk, body in Inter 10 pt.</li>
      <li>Install the brand fonts first so layouts keep their proportions.</li><li>Replace every placeholder in brackets before sending.</li></ul></div></div>''', section='07'))

# 21 social & digital
pages.append(page('Templates · social and digital', 'Social and digital.', f'''
  <div style="display:grid;grid-template-columns:2fr 1fr;gap:5mm;margin-top:7mm">
    <div><img class="shot" src="{img('linkedin-banner-1584x396-1')}"><p class="cap">LinkedIn banner, 1584 x 396</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4mm;margin-top:3mm">
        <div><img class="shot" src="{img('post-announcement-1200x1200-1')}"><p class="cap">Announcement, 1200 x 1200</p></div>
        <div><img class="shot" src="{img('post-quote-1200x1200-1')}"><p class="cap">Quote</p></div>
        <div><img class="shot" src="{img('post-stat-1200x1200-1')}"><p class="cap">Statistic</p></div></div></div>
    <div><img class="shot" src="{img('link-card-1200x627-1')}"><p class="cap">Link card, 1200 x 627</p>
      <img class="shot" src="{img('virtual-background-dark-1920x1080-1')}" style="margin-top:3mm"><p class="cap">Video call background, 1920 x 1080 (dark and light)</p>
      <img class="shot" src="{img('email-header-1200x300-1')}" style="margin-top:3mm"><p class="cap">Newsletter header, 1200 x 300 · plus profile image and story</p></div></div>''', section='07'))

# 22 events
pages.append(page('Templates · events', 'Events.', f'''
  <div style="display:grid;grid-template-columns:66mm 1fr;gap:12mm;margin-top:7mm;align-items:start">
    <div><img class="shot" src="{img('roll-up-banner-850x2000-1', 700)}" style="height:148mm;width:auto"></div>
    <div><h3>Roll-up banner, 850 x 2000 mm</h3><p class="muted">Print PDF with 3 mm bleed. Keep the bottom 150 mm clear: it sits inside the stand. The QR code opens the consultation page.</p>
      <h3 style="margin-top:8mm">Name badge, 100 x 70 mm</h3><p class="muted">Print PDF and an editable PowerPoint: duplicate the slide for each person.</p>
      <img class="shot" src="{img('name-badge-1')}" style="width:80mm;margin-top:3mm"></div></div>''', section='07'))

# 23 files
kit = [('01-Logos', 'Every lockup in four colour versions, as SVG, vector PDF and transparent PNG, plus app icons'), ('02-Colours', 'Swatches (ASE) for Adobe and Affinity, CSS variables, JSON values'),
       ('03-Typography', 'Space Grotesk, Inter, JetBrains Mono and Noto Sans Thai (desktop TTF)'), ('04-Stationery', 'Business cards, letterhead, envelope, email signature'),
       ('05-Presentation', 'PowerPoint template, 13 slides'), ('06-Documents', 'Word proposal and report template'), ('07-Social', 'LinkedIn, posts, link card, story, editable PowerPoint'),
       ('08-Events', 'Roll-up banner and name badge'), ('09-Digital', 'Video call backgrounds and newsletter header'), ('10-Graphics', 'Grid, dot grid, corner brackets, rules, frame, marker')]
kr = ''.join(f'<tr><td class="mono r" style="width:40mm">{f}</td><td>{d}</td></tr>' for f, d in kit)
pages.append(page('Files', 'The brand kit.', f'''
  <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:10mm;margin-top:7mm">
    <table><tr><th>Folder</th><th>Contents</th></tr>{kr}</table>
    <div><div class="eb"><i></i>BEFORE YOU PRINT</div><ul style="margin-top:2.5mm"><li>Replace all placeholder details in the editable files.</li>
      <li>Install the brand fonts before editing Office templates.</li><li>Approve a printed proof for colour, especially Signal Red.</li>
      <li>Use the supplied logo files. Never redraw or retype them.</li></ul>
      <div class="eb" style="margin-top:8mm"><i></i>CONTACT</div>
      <p style="margin-top:2.5mm">sales@logicsonata.com<br>{WEBSITE}</p>
      <div style="margin-top:10mm">{logo('Horizontal', 'on-light', 55)}</div></div></div>''', section='08'))

html = f'<!doctype html><html><head><meta charset="utf-8"><title>Logic Sonata Brand Guidelines</title><style>{CSS}</style></head><body>{"".join(pages)}</body></html>'
out = os.path.join(BUILD, 'pages', 'logic-sonata-brand-guidelines.html')
open(out, 'w').write(html)
json.dump([{'name': 'logic-sonata-brand-guidelines', 'folder': '', 'kind': 'pdf', 'w': 297, 'h': 210, 'unit': 'mm', 'pages': len(pages), 'html': out, 'previews': True}],
          open(os.path.join(BUILD, 'manifest-guide.json'), 'w'))
print(len(pages), 'pages')
