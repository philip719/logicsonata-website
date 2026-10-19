# Generated photography and video (Comfy Cloud)

All site imagery is generated on Comfy Cloud: Flux.1 Krea dev (fp8) for stills, Wan 2.2 I2V A14B (fp8) for video.
Prompts come from the prompt pack (`deliverables/comfyui-prompt-pack.md`, monsters-rolodex branch
`claude/quirky-sagan-t2zhaz`). `manifest.json` records shot id, source take, prompt, seed and settings per still.

The API key is never stored here: in the Claude cloud session the network proxy adds `X-API-Key` on cloud.comfy.org.
Elsewhere, set `COMFY_API_KEY`.

| File | Purpose |
| --- | --- |
| `comfy.py` | API client: upload, submit, poll, download, credit balance |
| `flux.py` | Flux Krea workflow (text-to-image and image-to-image) and prompt-pack parser |
| `wan.py` | Wan 2.2 workflow (image-to-video, first-last-frame), two-expert sampling, 20 steps |
| `batch.py` / `vbatch.py` | Run still / video jobs three at a time (Creator plan concurrency) |
| `sheet.py` | Contact sheets of all takes for review |
| `grade.py` | Brand grade (red/cyan, teal-black); 1.0 for places and hardware, 0.6 for people |
| `finish.py` | 4x-UltraSharp upscale to 3072 px on the cloud, grade, WebP at 768/1536/3072, manifest |
| `story.py` | Scroll-story frame sequence from VID-01..03 (`public/images/story`) |
| `vfinish.py` | Graded, 32 fps, H.264 background loops (`public/video`) |

Costs measured on 2026-10-19: one still about $0.02, one 5 s 720p clip at 20 steps about $0.22 (11.5 min GPU).

## Hero labels

The homepage hero labels are HTML over the photo (translatable). Anchor points are fractions of the 16:9 hero image,
set in `HERO_PARTS` in `src/views/Home.tsx`. HOME-01 is image-to-image from the clean render at denoise 0.40, so the
parts stay where the Blender render put them; if the hero is regenerated, keep denoise at or below 0.40.
