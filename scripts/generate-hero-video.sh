#!/usr/bin/env bash
set -euo pipefail

SITE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HERO_SOURCE="${SITE_ROOT}/public/images/hero.jpg"
HERO_OUTPUT_DIR="${SITE_ROOT}/public/video"
HERO_OUTPUT="${HERO_OUTPUT_DIR}/home-hero-loop.mp4"

mkdir -p "${HERO_OUTPUT_DIR}"

# Every time-based expression completes a whole number of cycles in eight seconds,
# keeping the fire, ambient light, and camera drift seamless at the loop point.
HERO_FILTER="
[0:v]scale=1920:1080,format=yuv444p,split=3[base][fire][sea];
[fire]crop=360:260:x='1260+2.4*sin(2*PI*t*2.25)':y='500+2.0*sin(2*PI*t*3.875)',eq=brightness=0.20:saturation=1.55:gamma=1.10,pad=1920:1080:1260:500:black[firelit];
[base][firelit]blend=all_expr='A+(B-A)*min(0.94\,max(0\,exp(-pow((X/W-0.748)/0.061\,2)-pow((Y/H-0.635)/0.074\,2))*(0.54+0.20*sin(2*PI*T*2.25)+0.13*sin(2*PI*T*3.875)+0.075*sin(2*PI*T*5.125))+exp(-pow((X/W-0.748)/0.087\,2)-pow((Y/H-0.620)/0.125\,2))*(0.085+0.027*sin(2*PI*T*1.625))))'[firemix];
[sea]eq=brightness=0.045:saturation=1.06[sealight];
[firemix][sealight]blend=all_expr='A+(B-A)*exp(-pow((X/W-0.220)/0.360\,2)-pow((Y/H-0.390)/0.350\,2))*(0.10+0.045*cos(2*PI*T/8))'[ambient];
[ambient]zoompan=z='1.0025+0.0035*(1-cos(2*PI*on/240))/2':x='iw/2-(iw/zoom/2)+1.5*sin(2*PI*on/240)':y='ih/2-(ih/zoom/2)+0.8*cos(2*PI*on/240)':d=1:s=1920x1080:fps=30,format=yuv420p[outv]
"

ffmpeg -hide_banner -loglevel warning -y \
  -loop 1 -framerate 30 -i "${HERO_SOURCE}" \
  -filter_complex "${HERO_FILTER}" -map "[outv]" \
  -t 8 -an -c:v libx264 -preset slow -crf 21 \
  -movflags +faststart "${HERO_OUTPUT}"

ffprobe -v error \
  -show_entries stream=codec_name,width,height,pix_fmt:format=duration,size \
  -of default=noprint_wrappers=1 "${HERO_OUTPUT}"
