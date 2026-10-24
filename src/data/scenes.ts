export const VIDEO_CONFIG = {
  width: 1080,
  height: 1920,
  fps: 30,
  // Voiceover ends at 122.12s (frame 3664); 3705 frames = 123.5s gives a clean 1.38s resolve
  durationInFrames: 3705,
} as const;

export interface SceneDefinition {
  id: string;
  title: string;
  startFrame: number;
  endFrame: number;
  durationInFrames: number;
}

const rawScenes: Array<{ id: string; title: string; startSec: number; endSec: number }> = [
  { id: 'hook', title: 'Hook: Facebook Page Dependency', startSec: 0.0, endSec: 12.6 },
  { id: 'inbox', title: 'Problem 1: Repetitive Inbox Questions', startSec: 12.6, endSec: 28.6 },
  { id: 'manual', title: 'Problem 2: Manual Operations Overload', startSec: 28.6, endSec: 37.4 },
  { id: 'risk', title: 'Problem 3: Platform Risk vs Own Asset', startSec: 37.4, endSec: 52.9 },
  { id: 'reveal', title: 'Solution 1: Own Website & Product Showcase', startSec: 52.9, endSec: 64.0 },
  { id: 'ordering', title: 'Solution 2: Easy Order & Buy Now Flow', startSec: 64.0, endSec: 76.2 },
  { id: 'management', title: 'Solution 3: Stock, Tracking & Courier Automation', startSec: 76.2, endSec: 85.0 },
  { id: 'custom', title: 'Solution 4: Custom Features Built to Spec', startSec: 85.0, endSec: 94.2 },
  { id: 'trust', title: 'Trust & Online Brand Identity', startSec: 94.2, endSec: 112.2 },
  { id: 'cta', title: 'Brand Reveal & Final CTA: WP Expert Solution', startSec: 112.2, endSec: 123.5 },
];

export const SCENES: SceneDefinition[] = rawScenes.map((s) => {
  const startFrame = Math.round(s.startSec * VIDEO_CONFIG.fps);
  const endFrame = Math.round(s.endSec * VIDEO_CONFIG.fps);
  return {
    id: s.id,
    title: s.title,
    startFrame,
    endFrame,
    durationInFrames: endFrame - startFrame,
  };
});

