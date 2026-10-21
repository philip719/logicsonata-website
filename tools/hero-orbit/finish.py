"""Finish the hero orbit render for the site.

Composites the transparent frames onto the studio grey (--studio in cyber.css), encodes a seamless loop as
public/video/hero-orbit.mp4 (H.264) and .webm (VP9), writes the label track to public/video/hero-orbit.json and
exports the first frame as the hero still (public/images/photos/home-hero-{768,1536,3072}.webp).

Usage: python finish.py frames=<dir with f0000.png...> [still=<large render of frame 0>]
"""
import json
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

STUDIO = (228, 231, 234)
ROOT = Path(__file__).resolve().parents[2]
ARGS = dict(a.split('=', 1) for a in sys.argv[1:] if '=' in a)
SRC = Path(ARGS['frames'])
VIDEO = ROOT / 'public/video'
PHOTOS = ROOT / 'public/images/photos'


def flat(path):
    im = Image.open(path).convert('RGBA')
    bg = Image.new('RGBA', im.size, STUDIO + (255,))
    bg.alpha_composite(im)
    return bg.convert('RGB')


frames = sorted(SRC.glob('f[0-9][0-9][0-9][0-9].png'))
labels = json.load(open(ARGS.get('labels', SRC / 'labels.json')))
assert len(frames) == labels['frames'], f"{len(frames)} frames rendered, {labels['frames']} expected"

with tempfile.TemporaryDirectory() as tmp:
    for i, f in enumerate(frames):
        flat(f).save(f'{tmp}/{i:04d}.png')
    mp4 = VIDEO / 'hero-orbit.mp4'
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-framerate', str(labels['fps']), '-i', f'{tmp}/%04d.png',
                    '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
                    '-an', str(mp4)], check=True)
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-framerate', str(labels['fps']), '-i', f'{tmp}/%04d.png',
                    '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '34', '-row-mt', '1', '-pix_fmt', 'yuv420p', '-an',
                    str(VIDEO / 'hero-orbit.webm')], check=True)

# Label track: per frame, per part, the anchor as a share of the frame width and height.
track = [[[round(x, 3), round(y, 3)] for x, y in pts] for pts in labels['track']]
json.dump({'fps': labels['fps'], 'frames': labels['frames'], 'open': labels['open'], 'track': track},
          open(VIDEO / 'hero-orbit.json', 'w'), separators=(',', ':'))

still = flat(ARGS.get('still', frames[0]))
for w in (768, 1536, 3072):
    still.resize((w, round(w * 9 / 16)), Image.LANCZOS).save(PHOTOS / f'home-hero-{w}.webp', quality=86, method=6)
print('done', len(frames), 'frames')
