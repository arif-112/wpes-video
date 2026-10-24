/**
 * Sound design timeline.
 * Every effect is a locally generated WAV (scripts/generate-sfx.js) and is
 * scheduled on the same frame grid as the animation.
 */
export type SfxName =
  | 'pop'
  | 'message'
  | 'click'
  | 'switch'
  | 'whoosh'
  | 'riser'
  | 'ding'
  | 'success'
  | 'warning'
  | 'reveal'
  | 'chime'
  | 'stamp'
  | 'tick';

/** Exact generated durations (seconds) — used to trim playback precisely. */
export const SFX_DURATION: Record<SfxName, number> = {
  pop: 0.18,
  message: 0.26,
  click: 0.075,
  switch: 0.11,
  whoosh: 0.52,
  riser: 0.95,
  ding: 0.62,
  success: 0.8,
  warning: 0.55,
  reveal: 1.15,
  chime: 1.6,
  stamp: 0.42,
  tick: 0.06,
};

export interface SoundEvent {
  id: string;
  at: number; // absolute seconds on the narration timeline
  sfx: SfxName;
  volume: number;
}

const e = (id: string, at: number, sfx: SfxName, volume: number): SoundEvent => ({
  id,
  at,
  sfx,
  volume,
});

export const SOUND_EVENTS: SoundEvent[] = [
  /* ------------------------------------------------ hook */
  e('hook-in', 0.16, 'whoosh', 0.22),
  e('hook-page', 0.98, 'pop', 0.28),
  e('hook-order', 3.16, 'ding', 0.24),
  e('hook-customer', 4.46, 'ding', 0.22),
  e('hook-question', 6.02, 'switch', 0.26),
  e('hook-chain', 7.74, 'pop', 0.16),
  e('hook-update-rise', 10.54, 'riser', 0.2),
  e('hook-update', 11.18, 'success', 0.24),

  /* ------------------------------------------------ inbox */
  e('inbox-in', 12.62, 'whoosh', 0.24),
  e('inbox-clock', 14.0, 'tick', 0.18),
  e('inbox-q1', 17.58, 'message', 0.3),
  e('inbox-q2', 18.92, 'message', 0.3),
  e('inbox-q3', 19.8, 'message', 0.3),
  e('inbox-q4', 20.66, 'message', 0.3),
  e('inbox-pile-1', 22.8, 'pop', 0.16),
  e('inbox-pile-2', 23.4, 'pop', 0.15),
  e('inbox-pile-3', 24.0, 'pop', 0.14),
  e('inbox-quiz', 26.24, 'warning', 0.24),
  e('inbox-punch', 27.88, 'stamp', 0.2),

  /* ------------------------------------------------ manual work */
  e('manual-in', 28.62, 'whoosh', 0.24),
  e('manual-step-1', 29.3, 'click', 0.3),
  e('manual-step-2', 30.76, 'click', 0.3),
  e('manual-step-3', 31.9, 'click', 0.3),
  e('manual-drag', 33.34, 'switch', 0.22),
  e('manual-manual', 34.18, 'warning', 0.2),
  e('manual-question', 35.66, 'stamp', 0.24),

  /* ------------------------------------------------ platform risk */
  e('risk-in', 37.42, 'whoosh', 0.24),
  e('risk-reach', 39.38, 'warning', 0.22),
  e('risk-policy', 40.0, 'warning', 0.18),
  e('risk-lock', 41.52, 'click', 0.24),
  e('risk-fall', 43.5, 'warning', 0.2),
  e('risk-fb-good', 44.76, 'ding', 0.22),
  e('risk-site', 48.68, 'reveal', 0.24),
  e('risk-second', 50.26, 'success', 0.2),
  e('risk-strong', 51.2, 'success', 0.24),

  /* ------------------------------------------------ website reveal */
  e('reveal-in', 52.92, 'whoosh', 0.26),
  e('reveal-rise', 53.88, 'riser', 0.22),
  e('reveal-home', 55.14, 'ding', 0.2),
  e('reveal-product', 56.3, 'pop', 0.2),
  e('reveal-photo', 57.28, 'click', 0.2),
  e('reveal-price', 58.8, 'pop', 0.22),
  e('reveal-size', 59.62, 'tick', 0.18),
  e('reveal-color', 60.34, 'switch', 0.2),
  e('reveal-stock', 61.18, 'ding', 0.2),
  e('reveal-info', 62.34, 'message', 0.16),
  e('reveal-done', 63.22, 'success', 0.18),

  /* ------------------------------------------------ ordering */
  e('order-in', 64.02, 'whoosh', 0.2),
  e('order-fav', 64.06, 'pop', 0.16),
  e('order-step', 65.02, 'click', 0.2),
  e('order-size', 65.62, 'tick', 0.2),
  e('order-buy-hover', 67.22, 'switch', 0.2),
  e('order-buy-press', 67.64, 'click', 0.32),
  e('order-sheet', 68.06, 'stamp', 0.22),
  e('order-option', 68.52, 'pop', 0.18),
  e('order-confirmed', 69.94, 'success', 0.26),
  e('order-norepeat', 70.8, 'pop', 0.16),
  e('order-link', 72.16, 'switch', 0.14),
  e('order-time', 73.28, 'ding', 0.2),
  e('order-easy', 75.52, 'success', 0.22),

  /* ------------------------------------------------ management */
  e('mgmt-in', 76.22, 'whoosh', 0.2),
  e('mgmt-stock', 78.8, 'click', 0.22),
  e('mgmt-stock-update', 79.1, 'switch', 0.16),
  e('mgmt-tracking', 80.22, 'click', 0.22),
  e('mgmt-courier', 81.6, 'click', 0.22),
  e('mgmt-sync', 82.0, 'success', 0.18),
  e('mgmt-more', 83.04, 'pop', 0.18),
  e('mgmt-easy', 83.82, 'success', 0.22),

  /* ------------------------------------------------ custom features */
  e('custom-in', 85.02, 'whoosh', 0.2),
  e('custom-feature', 86.36, 'ding', 0.22),
  e('custom-switch', 88.22, 'switch', 0.18),
  e('custom-click', 88.52, 'click', 0.22),
  e('custom-built', 89.58, 'reveal', 0.24),
  e('custom-idea', 90.48, 'pop', 0.2),
  e('custom-ours', 92.9, 'success', 0.24),
  e('custom-done', 93.3, 'ding', 0.16),

  /* ------------------------------------------------ trust */
  e('trust-in', 94.22, 'whoosh', 0.2),
  e('trust-new', 95.36, 'ding', 0.2),
  e('trust-shield', 96.82, 'success', 0.2),
  e('trust-important', 98.1, 'success', 0.18),
  e('trust-pro', 99.36, 'pop', 0.2),
  e('trust-detail', 100.76, 'switch', 0.16),
  e('trust-credible', 101.62, 'success', 0.2),
  e('trust-stars', 102.62, 'ding', 0.22),
  e('trust-identity', 105.38, 'whoosh', 0.22),
  e('trust-platform', 106.32, 'switch', 0.18),
  e('trust-build', 108.54, 'reveal', 0.24),
  e('trust-strong', 110.42, 'success', 0.24),
  e('trust-warm', 111.4, 'chime', 0.22),

  /* ------------------------------------------------ CTA */
  e('cta-in', 112.22, 'whoosh', 0.26),
  e('cta-question', 112.28, 'pop', 0.2),
  e('cta-talk', 114.8, 'switch', 0.18),
  e('cta-contact', 115.22, 'click', 0.22),
  e('cta-rise', 116.2, 'riser', 0.2),
  e('cta-brand', 117.06, 'chime', 0.34),
  e('cta-brand-hit', 117.06, 'stamp', 0.14),
  e('cta-step', 119.02, 'ding', 0.22),
  e('cta-start', 120.5, 'success', 0.2),
  e('cta-resolve', 121.86, 'reveal', 0.2),
];
