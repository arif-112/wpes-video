# WP Expert Solution — Facebook Page → Website

A 9:16 (1080×1920 @ 30 fps) Bengali motion-design reel built with **Remotion + React**.
Total runtime **123.5 s (3705 frames)**, driven end-to-end by the supplied voice-over
(`voiceover.wav`, 122.16 s) and the supplied Cartesia word-level timestamp JSON.

---

## 1. Install & run

```bash
cd wp-expert-motion-video
npm install          # also installs the bundled Bengali/display fonts
npm start            # opens Remotion Studio on the WPExpertReel composition
```

Render the final MP4:

```bash
npm run render       # → out/wp-expert-reel.mp4 (1080×1920, h264, yuv420p)
```

Renders are fully offline: Bengali typography ships as `@fontsource` packages in
`node_modules`, and all sound effects are local WAV files.

## 2. Assets — where they live

| Asset | Path | Notes |
|---|---|---|
| Voice-over (authoritative recording) | `public/audio/voiceover.wav` | Already in place, untouched (mono, 44.1 kHz, 122.16 s). |
| Cartesia timestamp JSON | `data/voiceover-timestamps.json` | Word-level `start_time` / `end_time` per word. Source of truth for all caption and scene timing. |
| Generated captions | `src/data/captions.ts` | Auto-generated from the JSON — 77 phrase cues, each word keeps its exact spoken frame. |
| Sound effects | `public/sfx/*.wav` | 13 original effects, synthesized by `scripts/generate-sfx.js`. |
| Scene / beat map | `src/data/scenes.ts` | 10 narrative chapters, frame-accurate to the narration. |
| SFX timeline | `src/data/soundEvents.ts` | Every effect scheduled at its visual beat. |

If the narration or JSON ever changes:

```bash
npm run build-captions   # regenerates src/data/captions.ts from data/voiceover-timestamps.json
npm run setup            # regenerate SFX + captions
```

## 3. Timeline (narration → chapters)

| Chapter | Time | Beat |
|---|---|---|
| Hook | 0.0–12.6 s | Facebook-dependent business, orders/customers, “শুধু Facebook-নির্ভর?” |
| Inbox | 12.6–28.6 s | Time lost to repeated questions, quiz-show metaphor |
| Manual work | 28.6–37.4 s | Order confirm → stock check → courier, all by hand |
| Platform risk | 37.4–52.9 s | Reach drop / policy lock, then Facebook + own website |
| Website reveal | 52.9–64.0 s | Own storefront: photo, price, size, colour, stock, info |
| Ordering | 64.0–76.2 s | Variant select → Buy Now → confirmation → time saved |
| Operations | 76.2–85.0 s | Stock, order tracking, courier sync, extra modules |
| Custom features | 85.0–94.2 s | Idea → wireframe → working custom module |
| Trust | 94.2–112.2 s | Reviews, verified store, professional identity |
| CTA | 112.2–123.5 s | WP Expert Solution lockup + contact invitation |

Scenes cross-dissolve over 8 frames (`OVERLAP` in `src/Video.tsx`) so the story reads
as one continuous piece rather than a slideshow.

## 4. Architecture

```
src/
  index.ts / Root.tsx / Video.tsx     composition + scene sequencing + audio
  data/
    scenes.ts        VIDEO config, scene boundaries, absolute-time helper
    captions.ts      generated phrase cues with per-word frames
    soundEvents.ts   SFX timeline
  components/
    VideoBackground  continuous mesh/grid stage + caption scrim
    BrandHeader      small brand label (hidden during the CTA)
    CaptionBar       Bengali caption engine (progressive word reveal)
    BrowserWindow / PhoneMockup / ProductArt
    Cursor / UI (cards, pills, buttons, icons) / SceneShell
    SoundTrack       voice-over + scheduled SFX with fades
  scenes/            one file per chapter
  utils/             tokens, typography, animation helpers, Bengali numerals
scripts/
  generate-sfx.js    deterministic WAV synthesis for every effect
  build-captions.mjs word-timings → readable Bengali phrase cues
```

### Caption behaviour

* Cues are short phrases (max 5 words / ~3 s), split on Bengali punctuation.
* A word appears on its exact spoken frame — no future words are revealed early.
* Space is reserved up front, so the caption block never reflows or jumps.
* Captions sit above the Reels bottom UI (`bottom: 300`) and stay clear of the
  right-side action rail.

### Sound design

The voice-over stays at unity gain; SFX sit between 0.14 and 0.34 with short
attack/release fades. Regenerate anytime with `node scripts/generate-sfx.js`.

## 5. Notes

* No official logo or contact details were supplied, so the end card uses a
  typographic brand treatment and a generic “talk to us today” invitation —
  no invented phone number, handle or URL.
* The demo store (`Urban Style BD`) and its product are original illustrative UI,
  not a real dashboard or third-party brand.
