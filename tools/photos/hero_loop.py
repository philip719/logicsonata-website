"""Hero loop from VID-02 (exploded to assembled, same camera as the hero still).
Sequence: hold exploded, assemble, hold assembled, explode (reverse), so the loop is seamless.
Usage: python hero_loop.py VID-02.mp4  -> public/video/hero-loop.mp4 and .webm (VP9) and prints the label window (seconds)."""
import glob, os, subprocess, sys, tempfile, shutil
from PIL import Image
from grade import grade

SRC = sys.argv[1]
FPS = 16                      # Wan output rate; interpolated to 32 fps on encode
HOLD_OPEN, HOLD_CLOSED = 24, 16   # frames (1.5 s, 1 s)
MOVE = 48                     # frames per direction (3 s): the 81-frame clip is sampled faster
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '../../public/video/hero-loop.mp4')

src = tempfile.mkdtemp(); seq = tempfile.mkdtemp()
subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', SRC, f'{src}/%03d.png'], check=True)
files = sorted(glob.glob(f'{src}/*.png'))
for f in files:
    grade(Image.open(f).convert('RGB'), 1.0, grain=0).save(f)
fwd = [files[round(i * (len(files) - 1) / (MOVE - 1))] for i in range(MOVE)]
order = [files[0]] * HOLD_OPEN + fwd + [files[-1]] * HOLD_CLOSED + fwd[::-1][1:-1]
for i, f in enumerate(order):
    shutil.copy(f, f'{seq}/{i:04d}.png')
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-framerate', str(FPS), '-i', f'{seq}/%04d.png',
                '-vf', 'minterpolate=fps=32:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1', '-an',
                '-c:v', 'libx264', '-preset', 'slow', '-crf', '21', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', OUT], check=True)
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', OUT, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '34', '-row-mt', '1', '-an', OUT.replace('.mp4', '.webm')], check=True)
dur = len(order) / FPS
print(f'hero-loop.mp4 {os.path.getsize(OUT) / 1e6:.2f} MB, {dur:.2f} s; labels on for t < {HOLD_OPEN / FPS:.2f} s and t > {dur - 0.4:.2f} s')
