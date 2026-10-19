"""Wan 2.2 I2V A14B workflows (API format): image-to-video and first-last-frame, two-expert sampling."""

NEG = ('overexposed, oversaturated, bright daylight, text, subtitles, captions, watermark, logo, low quality, blurry details, '
       'jpeg artifacts, deformed hands, extra fingers, distorted faces, morphing objects, melting shapes, flickering, sudden cuts, '
       'camera shake, cartoon, illustration')


def video(prompt, seed, start, end=None, width=1280, height=720, length=81, steps=20, cfg=3.5, shift=8.0,
          lightning=False, prefix='video/ls'):
    if lightning:
        steps, cfg, shift = 6, 1.0, 5.0
    split = steps // 2
    wf = {
        '1': {'class_type': 'UNETLoader', 'inputs': {'unet_name': 'wan2.2_i2v_high_noise_14B_fp8_scaled.safetensors', 'weight_dtype': 'default'}},
        '2': {'class_type': 'UNETLoader', 'inputs': {'unet_name': 'wan2.2_i2v_low_noise_14B_fp8_scaled.safetensors', 'weight_dtype': 'default'}},
        '3': {'class_type': 'CLIPLoader', 'inputs': {'clip_name': 'umt5_xxl_fp8_e4m3fn_scaled.safetensors', 'type': 'wan', 'device': 'default'}},
        '4': {'class_type': 'VAELoader', 'inputs': {'vae_name': 'wan_2.1_vae.safetensors'}},
        '5': {'class_type': 'CLIPTextEncode', 'inputs': {'text': prompt, 'clip': ['3', 0]}},
        '6': {'class_type': 'CLIPTextEncode', 'inputs': {'text': NEG, 'clip': ['3', 0]}},
        '7': {'class_type': 'LoadImage', 'inputs': {'image': start}},
    }
    hi, lo = ['1', 0], ['2', 0]
    if lightning:
        wf['20'] = {'class_type': 'LoraLoaderModelOnly', 'inputs': {'model': hi, 'lora_name': 'wan2.2_i2v_lightx2v_4steps_lora_v1_high_noise.safetensors', 'strength_model': 1.0}}
        wf['21'] = {'class_type': 'LoraLoaderModelOnly', 'inputs': {'model': lo, 'lora_name': 'wan2.2_i2v_lightx2v_4steps_lora_v1_low_noise.safetensors', 'strength_model': 1.0}}
        hi, lo = ['20', 0], ['21', 0]
    wf['10'] = {'class_type': 'ModelSamplingSD3', 'inputs': {'model': hi, 'shift': shift}}
    wf['11'] = {'class_type': 'ModelSamplingSD3', 'inputs': {'model': lo, 'shift': shift}}
    common = {'positive': ['5', 0], 'negative': ['6', 0], 'vae': ['4', 0], 'width': width, 'height': height, 'length': length, 'batch_size': 1}
    if end:
        wf['8'] = {'class_type': 'LoadImage', 'inputs': {'image': end}}
        wf['12'] = {'class_type': 'WanFirstLastFrameToVideo', 'inputs': {**common, 'start_image': ['7', 0], 'end_image': ['8', 0]}}
    else:
        wf['12'] = {'class_type': 'WanImageToVideo', 'inputs': {**common, 'start_image': ['7', 0]}}
    ks = {'sampler_name': 'euler', 'scheduler': 'simple', 'steps': steps, 'cfg': cfg, 'noise_seed': seed}
    wf['13'] = {'class_type': 'KSamplerAdvanced', 'inputs': {**ks, 'model': ['10', 0], 'positive': ['12', 0], 'negative': ['12', 1], 'latent_image': ['12', 2],
                                                             'add_noise': 'enable', 'start_at_step': 0, 'end_at_step': split, 'return_with_leftover_noise': 'enable'}}
    wf['14'] = {'class_type': 'KSamplerAdvanced', 'inputs': {**ks, 'model': ['11', 0], 'positive': ['12', 0], 'negative': ['12', 1], 'latent_image': ['13', 0],
                                                             'add_noise': 'disable', 'start_at_step': split, 'end_at_step': 10000, 'return_with_leftover_noise': 'disable'}}
    wf['15'] = {'class_type': 'VAEDecode', 'inputs': {'samples': ['14', 0], 'vae': ['4', 0]}}
    wf['16'] = {'class_type': 'CreateVideo', 'inputs': {'images': ['15', 0], 'fps': 16.0}}
    wf['17'] = {'class_type': 'SaveVideo', 'inputs': {'video': ['16', 0], 'filename_prefix': prefix, 'format': 'auto', 'codec': 'auto'}}
    return wf
