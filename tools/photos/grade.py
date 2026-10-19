"""Logic Sonata cyberpunk grade: teal-black shadows, hues pulled to signal red / acid cyan, grain, vignette.

Usage: python grade.py in.png out.png [strength]   (strength 1.0 default, 0.6 for shots with people)
The website applies its own grain overlay, so finish.py grades with lighter grain (smaller WebP files).
"""
import sys, numpy as np
from PIL import Image

RED_H, CYAN_H = 2.0, 174.0          # degrees: #ff3b30, #3ef0e0
BLACK = np.array([5, 9, 11]) / 255  # #05090b

def hue_dist(a, b):
    d = np.abs(a - b) % 360
    return np.minimum(d, 360 - d)

def grade(img, strength=1.0, seed=7, grain=0.012):
    """strength 1.0 for places and hardware; about 0.6 for shots with people so skin stays natural."""
    rgb = np.asarray(img.convert('RGB')).astype(np.float32) / 255
    hsv = np.asarray(img.convert('RGB').convert('HSV')).astype(np.float32)
    h = hsv[..., 0] * 360 / 255; s = hsv[..., 1] / 255; v = hsv[..., 2] / 255

    # Pull every hue to the nearest of the two brand hues; warm oranges/yellows lose most saturation.
    to_red = hue_dist(h, RED_H) < hue_dist(h, CYAN_H)
    target = np.where(to_red, RED_H, CYAN_H)
    pull = np.where(to_red, 0.55, 0.85)
    dh = ((target - h + 180) % 360) - 180
    h2 = (h + dh * pull) % 360
    # Skin tones (orange hues, moderate saturation, mid to bright) keep most of their colour.
    skin = (h > 8) & (h < 40) & (s > 0.15) & (s < 0.65) & (v > 0.25)
    h2 = np.where(skin, h + dh * 0.15, h2)
    warm = (h > 18) & (h < 70) & ~skin
    s2 = s * np.where(warm, 0.35, np.where(skin, 0.8, 1.0))
    s2 = np.where(hue_dist(h2, CYAN_H) < 25, np.minimum(s2 * 1.15, 1), s2)
    s2 = np.where(hue_dist(h2, RED_H) < 20, np.minimum(s2 * 1.2, 1), s2)

    hsv2 = np.stack([h2 / 360 * 255, s2 * 255, v * 255], -1).clip(0, 255).astype(np.uint8)
    out = np.asarray(Image.fromarray(hsv2, 'HSV').convert('RGB')).astype(np.float32) / 255

    # Tone: gentle S-curve, teal shadow tint, lifted to the page black.
    out = out ** 1.08
    out = out * out * (3 - 2 * out) * 0.35 + out * 0.65
    lum = out @ np.array([0.2126, 0.7152, 0.0722])
    shadow = (1 - lum)[..., None] ** 3
    out = out + shadow * np.array([-0.02, 0.025, 0.03])
    out = BLACK + (1 - BLACK) * out.clip(0, 1)

    out = rgb * (1 - strength) + out * strength

    # Vignette and luminance grain.
    hh, ww = lum.shape
    y, x = np.mgrid[0:hh, 0:ww]
    r = np.sqrt(((x - ww / 2) / (ww / 2)) ** 2 + ((y - hh / 2) / (hh / 2)) ** 2)
    out *= (1 - 0.28 * np.clip(r - 0.55, 0, 1) ** 1.5)[..., None]
    rng = np.random.default_rng(seed)
    out += rng.normal(0, grain, (hh, ww, 1))
    return Image.fromarray((out.clip(0, 1) * 255).astype(np.uint8))

if __name__ == '__main__':
    src, dst = sys.argv[1], sys.argv[2]
    k = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0
    grade(Image.open(src), k).save(dst)
