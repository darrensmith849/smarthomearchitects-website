# Audio credits

## `music-scene-loop.webm` / `music-scene-loop.mp3`

Played by the **Music** button on the wall control in
`/experience/live-residence`.

| | |
| --- | --- |
| Source | "At The Edge Of Space (II)" by **Andrewkn** |
| Where | https://freesound.org/s/482919/ |
| Licence | **CC0 1.0 Universal** (public domain dedication) |
| Attribution | Not required — recorded here for provenance, not obligation |

CC0 means the work can be copied, modified, distributed and performed, including
commercially, without asking permission or crediting the author.

### What was done to it

The original is 2:57. A 1:28 span was taken from the sustained middle and its
last 8 seconds were cross-faded onto its first 8, which yields a seamless
0:80 loop with no audible seam at the wrap. It was then normalised to
−20 LUFS — deliberately quiet, since it plays under a page rather than in front
of one — and encoded twice: Opus at 56 kbps for browsers that take WebM, MP3 at
96 kbps for the rest.

Reproduce with `ffmpeg`:

```
ffmpeg -i source.mp3 -filter_complex "\
[0:a]atrim=start=58:end=146,asetpts=N/SR/TB[m];\
[m]asplit=3[m1][m2][m3];\
[m1]atrim=start=0:end=8,asetpts=N/SR/TB[head];\
[m2]atrim=start=8:end=80,asetpts=N/SR/TB[body];\
[m3]atrim=start=80:end=88,asetpts=N/SR/TB[tail];\
[tail][head]acrossfade=d=8:c1=tri:c2=tri[join];\
[join][body]concat=n=2:v=0:a=1[cat];\
[cat]loudnorm=I=-20:TP=-1.5:LRA=11,aformat=sample_rates=48000:channel_layouts=stereo[out]" \
-map "[out]" loop.wav
```
