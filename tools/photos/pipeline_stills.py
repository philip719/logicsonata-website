"""Crop the platform band from a pipeline world take, upscale 2x (4x-UltraSharp), grade, export WebP 768/1536/3072.
Usage: python pipeline_stills.py <raw take name> <slug>   e.g. PIPE-KA_s9302_d078 pipeline-knowledge"""
import os, sys
from PIL import Image
import comfy
from grade import grade

BAND = (0, 96, 1536, 544)   # same band for every take: the platform from pipeline_base.py sits inside it
src, slug = sys.argv[1], sys.argv[2]
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../public/images/photos')
band = Image.open(f'/home/user/comfy/raw/{src}.png').convert('RGB').crop(BAND)
band.save(f'/home/user/comfy/raw/{src}_band.png')
up = comfy.upload(f'/home/user/comfy/raw/{src}_band.png', f'ls-{src}-band.png')
wf = {'1': {'class_type': 'LoadImage', 'inputs': {'image': up}}, '2': {'class_type': 'UpscaleModelLoader', 'inputs': {'model_name': '4x-UltraSharp.pth'}},
      '3': {'class_type': 'ImageUpscaleWithModel', 'inputs': {'upscale_model': ['2', 0], 'image': ['1', 0]}},
      '4': {'class_type': 'ImageScale', 'inputs': {'image': ['3', 0], 'upscale_method': 'lanczos', 'width': 3072, 'height': 896, 'crop': 'disabled'}},
      '5': {'class_type': 'SaveImage', 'inputs': {'images': ['4', 0], 'filename_prefix': 'up'}}}
jid = comfy.submit(wf); comfy.wait(jid); f, _ = comfy.outputs(jid)
g = grade(Image.open(comfy.download(f[0], f'/home/user/comfy/up/{src}_band.png')).convert('RGB'), 1.0, grain=0.006)
for w, q in ((3072, 62), (1536, 72), (768, 72)):
    (g if w == 3072 else g.resize((w, w * 448 // 1536), Image.LANCZOS)).save(f'{OUT}/{slug}-{w}.webp', 'WEBP', quality=q, method=6)
print(slug, [os.path.getsize(f'{OUT}/{slug}-{w}.webp') // 1024 for w in (768, 1536, 3072)], 'KB')
