"""Minimal Comfy Cloud client. The agent proxy adds X-API-Key on cloud.comfy.org, so no key is read here."""
import json, os, sys, time, urllib.request, urllib.parse, uuid

BASE = 'https://cloud.comfy.org'
KEY = os.environ.get('COMFY_API_KEY', 'proxy-injected')


def _req(method, path, data=None, headers=None, raw=False):
    h = {'X-API-Key': KEY, **(headers or {})}
    if isinstance(data, (dict, list)):
        data = json.dumps(data).encode(); h['Content-Type'] = 'application/json'
    r = urllib.request.urlopen(urllib.request.Request(BASE + path, data=data, headers=h, method=method), timeout=300)
    body = r.read()
    return body if raw else json.loads(body)


def balance_cents():
    return _req('GET', '/api/billing/usage/timeseries?granularity=day&months=1')['summary']['balance']['amount_cents']


def upload(path, name=None):
    name = name or os.path.basename(path)
    b = uuid.uuid4().hex
    parts = [f'--{b}\r\nContent-Disposition: form-data; name="image"; filename="{name}"\r\nContent-Type: image/png\r\n\r\n'.encode(),
             open(path, 'rb').read(),
             f'\r\n--{b}\r\nContent-Disposition: form-data; name="overwrite"\r\n\r\ntrue\r\n--{b}--\r\n'.encode()]
    return _req('POST', '/api/upload/image', b''.join(parts), {'Content-Type': f'multipart/form-data; boundary={b}'})['name']


def submit(workflow):
    return _req('POST', '/api/prompt', {'prompt': workflow})['prompt_id']


def wait(job_id, every=5, limit=3600):
    t0 = time.time()
    while time.time() - t0 < limit:
        s = _req('GET', f'/api/job/{job_id}/status')
        if s.get('status') in ('completed', 'success', 'failed', 'error', 'cancelled'):
            return s, time.time() - t0
        time.sleep(every)
    raise TimeoutError(job_id)


def outputs(job_id):
    h = _req('GET', f'/api/history_v2/{job_id}')
    h = h.get(job_id, h)
    files = []
    for node in h.get('outputs', {}).values():
        for k in ('images', 'videos', 'gifs', 'animated'):
            for f in node.get(k, []) if isinstance(node.get(k), list) else []:
                if isinstance(f, dict) and 'filename' in f: files.append(f)
    return files, h


def download(f, dst):
    q = urllib.parse.urlencode({'filename': f['filename'], 'subfolder': f.get('subfolder', ''), 'type': f.get('type', 'output')})
    open(dst, 'wb').write(_req('GET', '/api/view?' + q, raw=True))
    return dst
