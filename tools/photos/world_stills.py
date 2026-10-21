"""Upscale (4x-UltraSharp to 2x), grade and export the 3D-world diagram stills at 1x and 2x WebP.
Usage: python world_stills.py  (sources and names below)"""
import os
from PIL import Image
import comfy
from grade import grade

RAW = '/home/user/comfy/raw'
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../public/images/photos')
SHOTS = {'world-public': 'FLOW-PUBW_s7001_d075', 'world-private': 'FLOW-PRIW_s7001_d075', 'world-stack': 'STACK-WORLD_s8205_d078'}

for slug, src in SHOTS.items():
    im = Image.open(f'{RAW}/{src}.png').convert('RGB')
    w, h = im.size
    up = comfy.upload(f'{RAW}/{src}.png', f'ls-{src}.png')
    wf = {
        '1': {'class_type': 'LoadImage', 'inputs': {'image': up}},
        '2': {'class_type': 'UpscaleModelLoader', 'inputs': {'model_name': '4x-UltraSharp.pth'}},
        '3': {'class_type': 'ImageUpscaleWithModel', 'inputs': {'upscale_model': ['2', 0], 'image': ['1', 0]}},
        '4': {'class_type': 'ImageScale', 'inputs': {'image': ['3', 0], 'upscale_method': 'lanczos', 'width': w * 2, 'height': h * 2, 'crop': 'disabled'}},
        '5': {'class_type': 'SaveImage', 'inputs': {'images': ['4', 0], 'filename_prefix': 'up'}},
    }
    jid = comfy.submit(wf); comfy.wait(jid); files, _ = comfy.outputs(jid)
    big = Image.open(comfy.download(files[0], f'/home/user/comfy/up/{src}.png')).convert('RGB')
    g = grade(big, 1.0, grain=0.006)
    for k, q in ((2, 62), (1, 72)):
        p = f'{OUT}/{slug}-{w * k}.webp'
        (g if k == 2 else g.resize((w, h), Image.LANCZOS)).save(p, 'WEBP', quality=q, method=6)
        print(slug, w * k, f'{os.path.getsize(p) // 1024} KB')
