"""Builds the scroll-story frame sequence from the three Wan clips (VID-01..03).
Usage: python story.py chip.mp4 assemble.mp4 rack.mp4 [frames_per_clip=48]
Writes public/images/story/{1280,720}/fNNN.webp and poster.webp; prints the total size per set.
Frames are graded like the stills (no grain: grain flickers and bloats every frame); clip joins get a 4-frame crossfade."""
import glob, os, subprocess, sys, tempfile
from PIL import Image
from grade import grade

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '../../public/images/story')
clips, per = sys.argv[1:4], int(sys.argv[4]) if len(sys.argv) > 4 else 48
XF = 4

seq = []
for clip in clips:
    tmp = tempfile.mkdtemp()
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', clip, f'{tmp}/%03d.png'], check=True)
    files = sorted(glob.glob(f'{tmp}/*.png'))
    pick = [files[round(i * (len(files) - 1) / (per - 1))] for i in range(per)]
    frames = [grade(Image.open(f).convert('RGB').resize((1280, 720), Image.LANCZOS), 1.0, grain=0) for f in pick]
    if seq:
        for k in range(XF):
            a = seq[-XF + k]
            seq[-XF + k] = Image.blend(a, frames[k], (k + 1) / (XF + 1))
        frames = frames[XF:]
    seq += frames

for w, q in ((1280, 48), (720, 45)):
    d = f'{OUT}/{w}'
    os.makedirs(d, exist_ok=True)
    for f in glob.glob(f'{d}/*.webp'): os.remove(f)
    total = 0
    for i, im in enumerate(seq):
        p = f'{d}/f{i:03d}.webp'
        (im if w == 1280 else im.resize((w, round(w * 9 / 16)), Image.LANCZOS)).save(p, 'WEBP', quality=q, method=6)
        total += os.path.getsize(p)
    print(w, len(seq), 'frames', f'{total / 1e6:.2f} MB')
seq[0].save(f'{OUT}/poster.webp', 'WEBP', quality=70, method=6)
