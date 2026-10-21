"""Grade and encode a Wan clip as a web background loop. Usage: python vfinish.py in.mp4 name [--loop] [--crop=x0,y0,x1,y1]
Grades every frame like the stills (no grain), drops the duplicate end frame of first-last-frame loops, interpolates
16 to 32 fps (ffmpeg minterpolate) and writes public/video/<name>.mp4 (H.264, muted, faststart) and <name>.webm (VP9)."""
import glob, os, subprocess, sys, tempfile
from PIL import Image
from grade import grade

src, name = sys.argv[1], sys.argv[2]
loop = '--loop' in sys.argv
# --crop=x0,y0,x1,y1 keeps a band of the frame (the product pipeline worlds use the platform band only)
crop = next((tuple(int(v) for v in a[7:].split(',')) for a in sys.argv if a.startswith('--crop=')), None)
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '../../public/video')
os.makedirs(OUT, exist_ok=True)
tmp = tempfile.mkdtemp()
subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', src, f'{tmp}/%03d.png'], check=True)
files = sorted(glob.glob(f'{tmp}/*.png'))
if loop: os.remove(files.pop())
for f in files:
    im = Image.open(f).convert('RGB')
    grade(im.crop(crop) if crop else im, 1.0, grain=0).save(f)
dst = f'{OUT}/{name}.mp4'
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-framerate', '16', '-i', f'{tmp}/%03d.png',
                '-vf', 'minterpolate=fps=32:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1', '-an',
                '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', dst], check=True)
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', dst, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '36', '-row-mt', '1', '-an', dst.replace('.mp4', '.webm')], check=True)
print(name, f'{os.path.getsize(dst) / 1e6:.2f} MB mp4, {os.path.getsize(dst.replace(".mp4", ".webm")) / 1e6:.2f} MB webm')
