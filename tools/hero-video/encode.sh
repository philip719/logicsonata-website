#!/bin/bash
# Encode rendered frames into the site's hero media.
set -e
LIFT="lutrgb=r=val+3:g=val+3:b=val+3"   # offsets the slight darkening from YUV conversion
D="crop=1200:900:0:100,$LIFT"
M="crop=720:720:235:158,scale=640:640:flags=lanczos,lutrgb=r=val+1:g=val+1:b=val+1"
X="-hide_banner -loglevel error -y"
ffmpeg $X -framerate 30 -i frames/f%04d.jpg -vf "$D,format=yuv420p" -c:v libx264 -preset veryslow -crf 23 -profile:v high -tune animation -movflags +faststart -an out/hero-appliance.mp4
ffmpeg $X -framerate 30 -i frames/f%04d.jpg -vf "$D,format=yuv420p" -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 -deadline good -cpu-used 1 -an out/hero-appliance.webm
ffmpeg $X -framerate 30 -i frames-nl/f%04d.jpg -vf "$M,format=yuv420p" -c:v libx264 -preset veryslow -crf 27 -profile:v high -tune animation -movflags +faststart -an out/hero-appliance-mobile.mp4
ffmpeg $X -framerate 30 -i frames-nl/f%04d.jpg -vf "$M,format=yuv420p" -c:v libvpx-vp9 -b:v 0 -crf 42 -row-mt 1 -deadline good -cpu-used 1 -an out/hero-appliance-mobile.webm
ffmpeg $X -i frames/f0000.jpg -vf "crop=1200:900:0:100" -c:v libwebp -quality 82 out/hero-appliance-poster.webp
ffmpeg $X -i frames/f0120.jpg -vf "crop=1200:900:0:100" -c:v libwebp -quality 85 out/hero-appliance-exploded.webp
ffmpeg $X -i frames-nl/f0000.jpg -vf "crop=720:720:235:158,scale=640:640:flags=lanczos" -c:v libwebp -quality 80 out/hero-appliance-poster-mobile.webp
