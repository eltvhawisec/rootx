// src/components/Llenis.tsx
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function Llenis() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
