import localFont from 'next/font/local';

// Self-hosted, preloaded fonts with metric-matched fallbacks (no layout shift on swap).
export const inter = localFont({
  src: '../fonts/inter-latin-wght-normal.woff2',
  weight: '100 900',
  variable: '--font-inter',
  display: 'swap',
});

export const spaceGrotesk = localFont({
  src: '../fonts/space-grotesk-latin-wght-normal.woff2',
  weight: '300 700',
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const jetbrainsMono = localFont({
  src: [
    { path: '../fonts/jetbrains-mono-latin-400-normal.woff2', weight: '400' },
    { path: '../fonts/jetbrains-mono-latin-500-normal.woff2', weight: '500' },
  ],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false,
});
