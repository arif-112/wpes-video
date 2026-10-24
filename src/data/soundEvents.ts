export interface SoundEvent {
  id: string;
  startFrame: number;
  asset:
    | 'sfx/pop.wav'
    | 'sfx/click.wav'
    | 'sfx/whoosh.wav'
    | 'sfx/ding.wav'
    | 'sfx/warning.wav'
    | 'sfx/success.wav'
    | 'sfx/reveal.wav'
    | 'sfx/chime.wav'
    | 'sfx/tick.wav';
  volume: number;
  durationInFrames: number;
}

const sfx = (
  id: string,
  sec: number,
  asset: SoundEvent['asset'],
  volume = 0.25,
  durationInFrames = 25
): SoundEvent => ({
  id,
  startFrame: Math.max(0, Math.round(sec * 30)),
  asset,
  volume,
  durationInFrames,
});

export const SOUND_EVENTS: SoundEvent[] = [
  // Scene 1: Hook
  sfx('hook-enter', 0.15, 'sfx/whoosh.wav', 0.22, 16),
  sfx('hook-fb-card', 0.95, 'sfx/pop.wav', 0.26, 10),
  sfx('hook-order-1', 3.16, 'sfx/ding.wav', 0.24, 18),
  sfx('hook-order-2', 4.46, 'sfx/ding.wav', 0.24, 18),
  sfx('hook-question-interrupt', 6.45, 'sfx/warning.wav', 0.24, 15),
  sfx('hook-update-badge', 11.15, 'sfx/success.wav', 0.26, 20),

  // Scene 2: Inbox Questions
  sfx('inbox-transition', 12.6, 'sfx/whoosh.wav', 0.22, 15),
  sfx('inbox-clock', 14.8, 'sfx/tick.wav', 0.25, 6),
  sfx('q1-price', 17.58, 'sfx/pop.wav', 0.3, 10),
  sfx('q2-color', 18.92, 'sfx/pop.wav', 0.3, 10),
  sfx('q3-size', 19.8, 'sfx/pop.wav', 0.3, 10),
  sfx('q4-delivery', 20.66, 'sfx/pop.wav', 0.32, 10),
  sfx('q-overload-1', 22.8, 'sfx/pop.wav', 0.18, 8),
  sfx('q-overload-2', 23.4, 'sfx/pop.wav', 0.18, 8),
  sfx('q-quiz-alert', 26.24, 'sfx/warning.wav', 0.25, 16),

  // Scene 3: Manual Work Overload
  sfx('manual-transition', 28.6, 'sfx/whoosh.wav', 0.22, 15),
  sfx('manual-step-1', 29.3, 'sfx/click.wav', 0.28, 8),
  sfx('manual-step-2', 30.76, 'sfx/click.wav', 0.28, 8),
  sfx('manual-step-3', 31.9, 'sfx/click.wav', 0.28, 8),
  sfx('manual-overload', 34.18, 'sfx/warning.wav', 0.24, 15),

  // Scene 4: Platform Risk vs Website Asset
  sfx('risk-transition', 37.4, 'sfx/whoosh.wav', 0.22, 15),
  sfx('risk-reach-drop', 39.38, 'sfx/warning.wav', 0.24, 15),
  sfx('risk-policy-lock', 40.2, 'sfx/click.wav', 0.25, 8),
  sfx('risk-fb-good', 44.8, 'sfx/pop.wav', 0.22, 10),
  sfx('risk-website-pillar', 48.68, 'sfx/reveal.wav', 0.28, 28),
  sfx('risk-strong-platform', 51.2, 'sfx/success.wav', 0.26, 20),

  // Scene 5: Website Reveal & Product Details
  sfx('reveal-transition', 52.9, 'sfx/reveal.wav', 0.32, 30),
  sfx('reveal-photo', 57.8, 'sfx/pop.wav', 0.24, 10),
  sfx('reveal-price', 58.8, 'sfx/pop.wav', 0.24, 10),
  sfx('reveal-size', 59.62, 'sfx/click.wav', 0.24, 8),
  sfx('reveal-color', 60.34, 'sfx/click.wav', 0.24, 8),
  sfx('reveal-stock', 61.18, 'sfx/ding.wav', 0.22, 15),

  // Scene 6: Ordering & Buy Now
  sfx('order-transition', 64.0, 'sfx/whoosh.wav', 0.22, 15),
  sfx('order-step-1', 65.0, 'sfx/pop.wav', 0.24, 10),
  sfx('order-buy-now-click', 67.45, 'sfx/click.wav', 0.32, 8),
  sfx('order-confirmed', 68.5, 'sfx/success.wav', 0.28, 22),
  sfx('order-time-saved', 73.5, 'sfx/ding.wav', 0.24, 18),

  // Scene 7: Operations Management
  sfx('mgmt-transition', 76.2, 'sfx/whoosh.wav', 0.22, 15),
  sfx('mgmt-stock', 78.8, 'sfx/pop.wav', 0.26, 10),
  sfx('mgmt-tracking', 80.22, 'sfx/pop.wav', 0.26, 10),
  sfx('mgmt-courier', 81.6, 'sfx/pop.wav', 0.26, 10),
  sfx('mgmt-synced', 83.8, 'sfx/success.wav', 0.25, 20),

  // Scene 8: Custom Features
  sfx('custom-transition', 85.0, 'sfx/whoosh.wav', 0.22, 15),
  sfx('custom-module-1', 86.9, 'sfx/pop.wav', 0.25, 10),
  sfx('custom-module-2', 88.52, 'sfx/click.wav', 0.26, 8),
  sfx('custom-idea-spark', 90.48, 'sfx/ding.wav', 0.26, 18),
  sfx('custom-built', 92.9, 'sfx/reveal.wav', 0.28, 26),

  // Scene 9: Trust & Brand Identity
  sfx('trust-transition', 94.2, 'sfx/whoosh.wav', 0.22, 15),
  sfx('trust-shield', 96.82, 'sfx/ding.wav', 0.26, 18),
  sfx('trust-pro-site', 100.2, 'sfx/pop.wav', 0.25, 10),
  sfx('trust-stars', 102.62, 'sfx/success.wav', 0.26, 20),
  sfx('trust-identity', 110.42, 'sfx/reveal.wav', 0.28, 26),

  // Scene 10: Final CTA - WP Expert Solution
  sfx('cta-transition', 112.2, 'sfx/whoosh.wav', 0.24, 15),
  sfx('cta-contact', 115.94, 'sfx/click.wav', 0.28, 8),
  sfx('cta-brand-reveal', 117.06, 'sfx/chime.wav', 0.34, 35),
  sfx('cta-next-step', 120.26, 'sfx/success.wav', 0.28, 24),
];

