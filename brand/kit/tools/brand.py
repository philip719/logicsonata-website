"""Single source of truth for the Logic Sonata brand values used by every generator."""

# name, hex, CMYK (process print), Pantone (closest match), role
COLORS = [
    # Core
    ('Signal Red', '#FF3B30', '0 80 80 0', 'Warm Red C', 'core', 'The brand accent. Logo, key words in headlines, primary buttons, rules. On dark grounds it is legible as text; on light grounds use it only at 24 px / 18 pt and above or for graphics.'),
    ('Obsidian', '#0B0C11', '60 40 40 100', 'Black 6 C', 'core', 'The primary dark ground and the ink colour on light grounds.'),
    ('Paper', '#F2F1EE', '0 0 2 5', 'Print on bright white stock', 'core', 'The primary light ground and the text colour on dark grounds.'),
    ('White', '#FFFFFF', '0 0 0 0', 'Paper white', 'core', 'Print documents, and the logo when reversed out of Signal Red or photography.'),
    # Supporting neutrals
    ('Graphite', '#16171D', '24 21 0 89', 'Screen only', 'neutral', 'Raised surfaces on dark: cards, panels, table rows.'),
    ('Slate', '#2A2C34', '19 15 0 80', 'Screen only', 'neutral', 'Hairlines, borders and dividers on dark grounds.'),
    ('Stone', '#A7A6A1', '0 1 4 35', 'Cool Gray 6 C', 'neutral', 'Secondary text on dark grounds (8:1 on Obsidian).'),
    ('Ash', '#5F5E5A', '0 1 5 63', '425 C', 'neutral', 'Secondary text on light grounds (5.8:1 on Paper).'),
    ('Steel', '#5F656E', '14 8 0 57', '431 C', 'neutral', 'Hardware and illustration neutral, the colour of the appliance chassis.'),
    # Accents
    ('Deep Red', '#C8251C', '0 85 90 20', '485 C', 'accent', 'Signal Red for small text and links on light grounds (5:1 on Paper).'),
    ('Ember', '#FF6A5F', '0 60 60 0', 'Screen only', 'accent', 'Hover and highlight states of Signal Red on dark screens.'),
    ('Amber', '#F5A524', '0 33 85 4', '137 C', 'accent', 'Attention and approval states in product UI and charts only. Never decorative.'),
]

HEX = {name: h for name, h, *_ in COLORS}

FONTS = {
    'display': 'Space Grotesk',
    'body': 'Inter',
    'mono': 'JetBrains Mono',
    'chinese': 'Noto Sans SC',
    'thai': 'Noto Sans Thai',
}

TAGLINE = 'Intelligence. Harmony. Impact.'
WEBSITE = 'www.logicsonata.com'
EMAILS = {'sales': 'sales@logicsonata.com', 'partners': 'partner@logicsonata.com', 'investors': 'investment@logicsonata.com', 'careers': 'careers@logicsonata.com'}

# Placeholder contact details for templates; replace in the editable files.
PLACEHOLDER = {
    'name': 'Your Name',
    'title': 'Job Title',
    'email': 'name@logicsonata.com',
    'phone': '+65 0000 0000',
    'company': 'Logic Sonata',
    'address': ['Company Registered Name', 'Street Address, Unit 00-00', 'Singapore 000000'],
    'reg': 'Company Registration No. 000000000X',
}


def rgb(hexcode):
    h = hexcode.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
