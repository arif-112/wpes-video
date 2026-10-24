import '@fontsource/hind-siliguri/400.css';
import '@fontsource/hind-siliguri/500.css';
import '@fontsource/hind-siliguri/600.css';
import '@fontsource/hind-siliguri/700.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/plus-jakarta-sans/800.css';

/**
 * Fonts are bundled from node_modules (@fontsource packages), so rendering is
 * fully offline and deterministic — no Google Fonts request at render time.
 */
export const FONTS = {
  bengali: "'Hind Siliguri', 'Noto Sans Bengali', system-ui, sans-serif",
  display: "'Plus Jakarta Sans', 'Hind Siliguri', system-ui, sans-serif",
} as const;

export const bengali = (size: number, weight: 400 | 500 | 600 | 700 = 600) => ({
  fontFamily: FONTS.bengali,
  fontSize: size,
  fontWeight: weight,
  lineHeight: 1.45,
});

export const display = (size: number, weight: 500 | 600 | 700 | 800 = 700) => ({
  fontFamily: FONTS.display,
  fontSize: size,
  fontWeight: weight,
  letterSpacing: -0.6,
  lineHeight: 1.2,
});
