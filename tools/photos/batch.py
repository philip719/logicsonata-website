"""Run a list of still jobs on Comfy Cloud, 3 at a time (Creator plan limit). Usage: python batch.py jobs.json"""
import json, sys, os, traceback
from concurrent.futures import ThreadPoolExecutor
import comfy, flux

RAW = '/home/user/comfy/raw'
LOG = '/home/user/comfy/jobs.jsonl'
os.makedirs(RAW, exist_ok=True)
P = flux.prompts()


def run(j):
    name = f"{j['shot']}_s{j['seed']}" + (f"_d{int(j['denoise']*100):03d}" if j.get('denoise', 1) < 1 else '')
    dst = f'{RAW}/{name}.png'
    if os.path.exists(dst): return name, 'exists'
    prompt = j.get('prompt') or P[j['shot']][1]
    wf = flux.still(prompt, j['seed'], image=j.get('image'), denoise=j.get('denoise', 1.0), prefix=j['shot'],
                    steps=j.get('steps', 28), guidance=j.get('guidance', 4.5),
                    width=j.get('width', 1536), height=j.get('height', 864))
    for attempt in range(3):
        try:
            jid = comfy.submit(wf)
            s, dt = comfy.wait(jid)
            if s['status'] not in ('success', 'completed'): raise RuntimeError(s)
            files, _ = comfy.outputs(jid)
            comfy.download(files[0], dst)
            with open(LOG, 'a') as f:
                f.write(json.dumps({**j, 'prompt': prompt, 'file': name, 'job': jid, 'steps': j.get('steps', 28),
                                    'guidance': j.get('guidance', 4.5), 'model': 'flux1-krea-dev_fp8_scaled', 'secs': round(dt, 1)}) + '\n')
            return name, 'ok'
        except Exception as e:
            err = repr(e)
    return name, 'FAILED ' + err


if __name__ == '__main__':
    jobs = json.load(open(sys.argv[1]))
    with ThreadPoolExecutor(3) as ex:
        for name, st in ex.map(run, jobs):
            print(name, st, flush=True)
