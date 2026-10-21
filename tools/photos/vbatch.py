"""Run Wan 2.2 clips on Comfy Cloud, 3 at a time. Usage: python vbatch.py jobs.json
Job: {"id": "VID-01", "seed": 7, "start": "<raw still>", "end": "<raw still or omitted>"}"""
import json, os, sys
from concurrent.futures import ThreadPoolExecutor
import comfy, flux, wan

RAW = '/home/user/comfy/raw'
OUT = '/home/user/comfy/vid'
P = flux.prompts()


def run(j):
    dst = f"{OUT}/{j['id']}_s{j['seed']}.mp4"
    if os.path.exists(dst): return j['id'], 'exists'
    up = lambda n: comfy.upload(f'{RAW}/{n}.png', f'ls-vid-{n}.png')
    start = up(j['start']); end = up(j['end']) if j.get('end') else None
    prompt = j.get('prompt') or P[j['id']][1]
    jid = comfy.submit(wan.video(prompt, j['seed'], start, end=end, prefix=f"video/{j['id']}", width=j.get('width', 1280), height=j.get('height', 720)))
    s, dt = comfy.wait(jid, every=15)
    if s['status'] not in ('success', 'completed'): return j['id'], f'FAILED {s}'
    files, _ = comfy.outputs(jid)
    comfy.download(files[0], dst)
    with open(f'{OUT}/videos.jsonl', 'a') as f:
        f.write(json.dumps({**j, 'prompt': prompt, 'negative': wan.NEG, 'job': jid, 'secs': round(dt), 'model': 'wan2.2 i2v A14B fp8 (high+low noise)',
                            'steps': 20, 'cfg': 3.5, 'shift': 8.0, 'size': f"{j.get('width', 1280)}x{j.get('height', 720)}", 'frames': 81, 'fps': 16}) + '\n')
    return j['id'], f'ok {round(dt)}s'


if __name__ == '__main__':
    with ThreadPoolExecutor(3) as ex:
        for r in ex.map(run, json.load(open(sys.argv[1]))):
            print(*r, flush=True)
