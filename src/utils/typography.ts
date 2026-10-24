import { useEffect, useState } from 'react';
import { continueRender, delayRender } from 'remotion';

export const FONTS = {
  bengali: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
  display: "'Plus Jakarta Sans', 'Hind Siliguri', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

const GOOGLE_FONTS_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
`;

export const useLoadBengaliFonts = () => {
  const [handle] = useState(() => delayRender('Loading Bengali & UI Fonts'));

  useEffect(() => {
    const styleId = 'wp-expert-google-fonts';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = GOOGLE_FONTS_CSS;
      document.head.appendChild(style);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => continueRender(handle))
        .catch(() => continueRender(handle));
    } else {
      continueRender(handle);
    }
  }, [handle]);
};

