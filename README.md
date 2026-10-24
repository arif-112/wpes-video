# WP Expert Solution — Motion Reel (Remotion + React)

A **9:16 (1080×1920 @ 30 FPS)** motion-design reel for **WP Expert Solution**, built as a
programmatic video with [Remotion](https://remotion.dev).

The reel argues, in Bengali, why a Facebook-Page-only business should move to its own
website: repetitive inbox questions, manual order/stock/courier work, platform risk —
then showcases the solution (own storefront, Buy Now flow, inventory & courier automation,
custom features) and closes on the brand CTA.

| Property | Value |
| --- | --- |
| Composition | `WPExpertReel` |
| Resolution | 1080 × 1920 (9:16) |
| Frame rate | 30 FPS |
| Duration | 3705 frames ≈ 123.5 s |
| Voice-over | 122.16 s, Bengali (mono 44.1 kHz / 16-bit WAV) |
| Captions | 25 cues / 282 word-level timings |
| SFX | 56 frame-accurate cues over 9 synthesized WAVs |

## Requirements

- Node.js 18+ (`.nvmrc` pins 20)
- npm 9+
- Linux/macOS/Windows — Remotion downloads its own Chrome Headless Shell on first render

## Quick start

```bash
npm install          # install Remotion + React toolchain
npm start            # Remotion Studio at http://localhost:3000 (preview + scrub timeline)
```

Render the final MP4:

```bash
npm run render       # -> out/wp-expert-reel.mp4 (H.264, yuv420p, JPEG frames)
```

Other scripts:

| Script | What it does |
| --- | --- |
| `npm run setup` | Regenerates the 9 deterministic WAV sound effects into `public/sfx/` |
| `npm run typecheck` | `tsc --noEmit` over `src/` |
| `npm start` / `npm run render` | Auto-run `setup` first via `prestart` / `prerender` |

## Project structure

```
src/
  index.ts                 registerRoot entry
  Root.tsx                 <Composition id="WPExpertReel" />
  Video.tsx                composes background + scenes + captions + soundtrack
  components/              BrandHeader, CaptionBar, BrowserWindow, PhoneMockup,
                           Cursor, FloatingBadge, VideoBackground, SoundTrack
  scenes/                  10 scene components (Hook → Inbox → Manual → Risk →
                           Reveal → Ordering → Management → Custom → Trust → CTA)
  data/scenes.ts           timeline: scene boundaries + VIDEO_CONFIG (WxH/fps/frames)
  data/captions.ts         word-level Bengali captions baked from the TTS timestamps
  data/soundEvents.ts      56 SFX cues (frame number, asset, volume, length)
  utils/                   design tokens, typography, animation helpers
public/
  audio/voiceover.wav      the narration track used by the composition
  sfx/*.wav                9 generated sound effects
scripts/generate-sfx.js    deterministic WAV synthesizer (no binary SFX assets needed)
reference/                 source word-timestamp JSON from Cartesia (provenance only)
```

### Timeline

| # | Scene | Start | End |
| --- | --- | --- | --- |
| 1 | Hook: Facebook Page dependency | 0.0 s | 12.6 s |
| 2 | Problem 1: Repetitive inbox questions | 12.6 s | 28.6 s |
| 3 | Problem 2: Manual operations overload | 28.6 s | 37.4 s |
| 4 | Problem 3: Platform risk vs own asset | 37.4 s | 52.9 s |
| 5 | Solution 1: Own website & product showcase | 52.9 s | 64.0 s |
| 6 | Solution 2: Easy order & Buy Now flow | 64.0 s | 76.2 s |
| 7 | Solution 3: Stock, tracking & courier automation | 76.2 s | 85.0 s |
| 8 | Solution 4: Custom features built to spec | 85.0 s | 94.2 s |
| 9 | Trust & online brand identity | 94.2 s | 112.2 s |
| 10 | Brand reveal & final CTA | 112.2 s | 123.5 s |

## Assets

- **Voice-over** — `public/audio/voiceover.wav` is the real Bengali narration (122.16 s).
  To swap it, drop a new file at the same path (word timings live in `src/data/captions.ts`
  and scene boundaries in `src/data/scenes.ts`).
- **Sound effects** — `public/sfx/*.wav` are **generated**, not baked binaries. Delete them
  and run `npm run setup` to rebuild all nine deterministically.
- **Fonts** — Hind Siliguri (Bengali), Plus Jakarta Sans and JetBrains Mono load from Google
  Fonts at render time, so the render machine needs internet access on first paint.

## Rendering in CI

`.github/workflows/render.yml` is a manually triggered job (`Actions → Render Reel → Run
workflow`) that installs dependencies, renders the MP4 on a GitHub runner and uploads it as
the `wp-expert-reel` artifact — handy when you don't want to render locally.

## Notes

- `durationInFrames` (3705) intentionally runs 1.38 s past the end of the narration so the
  final CTA can resolve cleanly.
- Everything is data-driven: edit `src/data/scenes.ts` / `captions.ts` / `soundEvents.ts`
  instead of hard-coding animation timings inside scene components.
