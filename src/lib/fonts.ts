import localFont from 'next/font/local';

// Self-hosted, preloaded fonts with metric-matched fallbacks (no layout shift on swap).
export const inter = localFont({
  src: '../fonts/inter-latin-wght-normal.woff2',
  weight: '100 900',
  variable: '--font-inter',
  display: 'swap',
});

// Archivo variable with a width axis: headlines use the expanded cut (font-stretch 112-125%).
export const archivo = localFont({
  src: '../fonts/archivo-latin-wdth-normal.woff2',
  weight: '100 900',
  variable: '--font-archivo',
  display: 'swap',
  declarations: [{ prop: 'font-stretch', value: '62% 125%' }],
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
