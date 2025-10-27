// src/app/fonts.ts
import localFont from 'next/font/local';

export const headingFont = localFont({
  src: '/fonts/Oswald-Bold.ttf', 
  display: 'swap',
});

export const bodyFont = localFont({
  src: '/fonts/Oswald-ExtraLight.ttf',    
  display: 'swap',
});
