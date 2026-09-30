"""One-off: turn the dark-background logo PNG into transparent assets."""
from PIL import Image
import numpy as np

src = np.asarray(Image.open('brand/logo-lockup-source.png').convert('RGB')).astype(float)
bg = np.median(src[:40, :40].reshape(-1, 3), axis=0)
mx = src.max(axis=2)
alpha = np.clip((mx - bg.max()) / (235 - bg.max()), 0, 1)
alpha[alpha < 0.08] = 0  # drop background texture noise
a3 = np.maximum(alpha[..., None], 1e-6)
rgb = np.clip((src - bg * (1 - a3)) / a3, 0, 255)
rgba = np.dstack([rgb, alpha * 255]).astype(np.uint8)
img = Image.fromarray(rgba, 'RGBA')

def crop(box):
    part = img.crop(box)
    return part.crop(part.getbbox())

mark = crop((480, 220, 1080, 570))
word = crop((150, 610, 1400, 730))
print('bg', bg, 'mark', mark.size, 'word', word.size)

# Horizontal lockup for the navigation bar: mark + wordmark.
H = 120
m = mark.resize((round(mark.width * H / mark.height), H), Image.LANCZOS)
wh = round(H * 0.34)
w = word.resize((round(word.width * wh / word.height), wh), Image.LANCZOS)
gap = round(H * 0.28)
lock = Image.new('RGBA', (m.width + gap + w.width, H), (0, 0, 0, 0))
lock.paste(m, (0, 0), m)
lock.paste(w, (m.width + gap, (H - wh) // 2), w)
lock.save('public/images/logo-horizontal.png', optimize=True)
lock.resize((lock.width // 2, lock.height // 2), Image.LANCZOS).save('public/images/logo-horizontal.webp', quality=92, method=6)
m.save('public/images/logo-mark.png', optimize=True)

# Favicons keep the dark tile so the mark reads on any browser chrome.
icon = Image.open('brand/logo-icon-source.png').convert('RGBA')
icon.resize((180, 180), Image.LANCZOS).save('src/app/apple-icon.png', optimize=True)
icon.resize((192, 192), Image.LANCZOS).quantize(64).save('src/app/icon.png', optimize=True)
icon.save('src/app/favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
