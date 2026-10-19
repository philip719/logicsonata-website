"""Upscale (Comfy Cloud, 4x-UltraSharp), grade and export the picked stills. Usage: python finish.py picks.json
picks.json: {"SHOT": {"file": "<raw name>", "slug": "home-hero", "strength": 1.0}, ...}
Writes public/images/photos/<slug>-{768,1536,3072}.webp and tools/photos/manifest.json."""
import json, os, sys
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
import comfy
from grade import grade

RAW = '/home/user/comfy/raw'
UP = '/home/user/comfy/up'
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '../../public/images/photos')
os.makedirs(UP, exist_ok=True); os.makedirs(OUT, exist_ok=True)


def upscale(name):
    dst = f'{UP}/{name}.png'
    if os.path.exists(dst): return dst
    up = comfy.upload(f'{RAW}/{name}.png', f'ls-{name}.png')
    wf = {
        '1': {'class_type': 'LoadImage', 'inputs': {'image': up}},
        '2': {'class_type': 'UpscaleModelLoader', 'inputs': {'model_name': '4x-UltraSharp.pth'}},
        '3': {'class_type': 'ImageUpscaleWithModel', 'inputs': {'upscale_model': ['2', 0], 'image': ['1', 0]}},
        '4': {'class_type': 'ImageScale', 'inputs': {'image': ['3', 0], 'upscale_method': 'lanczos', 'width': 3072, 'height': 1728, 'crop': 'disabled'}},
        '5': {'class_type': 'SaveImage', 'inputs': {'images': ['4', 0], 'filename_prefix': 'up'}},
    }
    jid = comfy.submit(wf)
    s, _ = comfy.wait(jid)
    if s['status'] not in ('success', 'completed'): raise RuntimeError(s)
    files, _ = comfy.outputs(jid)
    return comfy.download(files[0], dst)


def finish(item):
    shot, p = item
    big = Image.open(upscale(p['file'])).convert('RGB')
    g = grade(big, p.get('strength', 1.0), grain=0.006)
    sizes = {}
    for w in (3072, 1536, 768):
        im = g if w == 3072 else g.resize((w, round(w * 9 / 16)), Image.LANCZOS)
        path = f"{OUT}/{p['slug']}-{w}.webp"
        im.save(path, 'WEBP', quality={3072: 62, 1536: 70, 768: 72}[w], method=6)
        sizes[w] = os.path.getsize(path)
    return shot, sizes


if __name__ == '__main__':
    picks = json.load(open(sys.argv[1]))
    log = {}
    for line in open('/home/user/comfy/jobs.jsonl'):
        j = json.loads(line); log[j['file']] = j
    mf_path = os.path.join(HERE, 'manifest.json')
    manifest = json.load(open(mf_path)) if os.path.exists(mf_path) else {}
    with ThreadPoolExecutor(3) as ex:
        for shot, sizes in ex.map(finish, picks.items()):
            p = picks[shot]; j = log.get(p.get('log', p['file']), {})
            manifest[shot] = {
                'slug': p['slug'], 'source': p['file'], 'prompt': p.get('prompt') or j.get('prompt'), 'seed': j.get('seed', p.get('seed')),
                'model': j.get('model', p.get('model', 'flux1-krea-dev_fp8_scaled')), 'steps': j.get('steps', p.get('steps')),
                'guidance': j.get('guidance', p.get('guidance')), 'sampler': 'euler/simple', 'denoise': j.get('denoise', 1.0),
                'init_image': p.get('init_image'), 'upscale': '4x-UltraSharp to 3072x1728 (lanczos)',
                'grade': {'strength': p.get('strength', 1.0), 'grain': 0.006}, 'webp_bytes': sizes,
            }
            print(shot, {k: f'{v // 1024} KB' for k, v in sizes.items()}, flush=True)
    json.dump(dict(sorted(manifest.items())), open(mf_path, 'w'), indent=2)
