"""Grade and encode a Wan clip as a web background loop. Usage: python vfinish.py in.mp4 name [--loop]
Grades every frame like the stills (no grain), drops the duplicate end frame of first-last-frame loops, interpolates
16 to 32 fps (ffmpeg minterpolate) and writes public/video/<name>.mp4 (H.264, muted, faststart)."""
import glob, os, subprocess, sys, tempfile
from PIL import Image
from grade import grade

src, name = sys.argv[1], sys.argv[2]
loop = '--loop' in sys.argv
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '../../public/video')
os.makedirs(OUT, exist_ok=True)
tmp = tempfile.mkdtemp()
subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', src, f'{tmp}/%03d.png'], check=True)
files = sorted(glob.glob(f'{tmp}/*.png'))
if loop: os.remove(files.pop())
for f in files:
    grade(Image.open(f).convert('RGB'), 1.0, grain=0).save(f)
dst = f'{OUT}/{name}.mp4'
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-framerate', '16', '-i', f'{tmp}/%03d.png',
                '-vf', 'minterpolate=fps=32:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1', '-an',
                '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', dst], check=True)
print(name, f'{os.path.getsize(dst) / 1e6:.2f} MB')
