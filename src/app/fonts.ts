// src/app/fonts.ts
import localFont from 'next/font/local';

// إعداد خط العناوين
export const headingFont = localFont({
  src: '/fonts/Oswald-Bold.ttf', // المسار إلى ملف الخط
  display: 'swap',
});

// إعداد خط النصوص
export const bodyFont = localFont({
  src: '/fonts/Oswald-ExtraLight.ttf',    // المسار إلى ملف الخط
  display: 'swap',
});
