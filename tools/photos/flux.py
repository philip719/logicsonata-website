"""Flux.1 Krea dev workflows (API format) for Comfy Cloud."""
import re

PACK = '/home/user/mr-branch/deliverables/comfyui-prompt-pack.md'


def prompts():
    """Shot id -> (file name, prompt) parsed from the prompt pack."""
    txt = open(PACK).read()
    out = {}
    for m in re.finditer(r'### ([A-Z0-9-]+) · `([^`]+)`.*?```\n(.*?)\n```', txt, re.S):
        out[m.group(1)] = (m.group(2), m.group(3).strip())
    return out


def still(prompt, seed, width=1536, height=864, steps=28, guidance=4.5, image=None, denoise=1.0, prefix='ls'):
    wf = {
        '1': {'class_type': 'UNETLoader', 'inputs': {'unet_name': 'flux1-krea-dev_fp8_scaled.safetensors', 'weight_dtype': 'default'}},
        '2': {'class_type': 'DualCLIPLoader', 'inputs': {'clip_name1': 'clip_l.safetensors', 'clip_name2': 't5xxl_fp8_e4m3fn_scaled.safetensors', 'type': 'flux'}},
        '3': {'class_type': 'VAELoader', 'inputs': {'vae_name': 'ae.safetensors'}},
        '4': {'class_type': 'CLIPTextEncode', 'inputs': {'text': prompt, 'clip': ['2', 0]}},
        '5': {'class_type': 'FluxGuidance', 'inputs': {'conditioning': ['4', 0], 'guidance': guidance}},
        '6': {'class_type': 'ConditioningZeroOut', 'inputs': {'conditioning': ['4', 0]}},
        '8': {'class_type': 'KSampler', 'inputs': {'model': ['1', 0], 'positive': ['5', 0], 'negative': ['6', 0], 'latent_image': ['7', 0],
                                                    'seed': seed, 'steps': steps, 'cfg': 1.0, 'sampler_name': 'euler', 'scheduler': 'simple', 'denoise': denoise}},
        '9': {'class_type': 'VAEDecode', 'inputs': {'samples': ['8', 0], 'vae': ['3', 0]}},
        '10': {'class_type': 'SaveImage', 'inputs': {'images': ['9', 0], 'filename_prefix': prefix}},
    }
    if image:
        wf['11'] = {'class_type': 'LoadImage', 'inputs': {'image': image}}
        wf['7'] = {'class_type': 'VAEEncode', 'inputs': {'pixels': ['11', 0], 'vae': ['3', 0]}}
    else:
        wf['7'] = {'class_type': 'EmptySD3LatentImage', 'inputs': {'width': width, 'height': height, 'batch_size': 1}}
    return wf
