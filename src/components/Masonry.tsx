'use client';

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { FiArrowUpRight } from 'react-icons/fi';

// --- الخطاف المخصص useMedia (لا تغيير) ---
const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const isBrowser = typeof window !== 'undefined';
  const get = useCallback(() => {
    if (!isBrowser) return defaultValue;
    const index = queries.findIndex(q => window.matchMedia(q).matches);
    return values[index] ?? defaultValue;
  }, [isBrowser, queries, values, defaultValue]);

  const [value, setValue] = useState<number>(defaultValue);

  useEffect(() => {
    const handler = () => setValue(get());
    handler();
    if (isBrowser) {
      queries.forEach(q => window.matchMedia(q).addEventListener('change', handler));
      return () => queries.forEach(q => window.matchMedia(q).removeEventListener('change', handler));
    }
  }, [get, isBrowser, queries]);

  return value;
};

// --- الخطاف المخصص useMeasure (لا تغيير) ---
const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

// --- دالة التحميل المسبق للصور (لا تغيير) ---
const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(src => new Promise<void>(resolve => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => resolve();
    }))
  );
};

// --- واجهات الأنواع (Interfaces) (لا تغيير) ---
interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
  title: string;
  category: string;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  startAnimation?: boolean;
}

// --- المكون الرئيسي Masonry (مع التصحيح) ---
const Masonry: React.FC<MasonryProps> = ({ items, startAnimation = false }) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)'],
    [4, 3, 2],
    2
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const hasAnimated = useRef(false); // 1. متغير لتتبع ما إذا كان التحريك قد حدث

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width || columns === 0) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;
    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = (child.height / 2);
      const y = colHeights[col];
      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  // 2. دمج كل منطق GSAP في useLayoutEffect واحد
  useLayoutEffect(() => {
    if (!imagesReady || !grid.length) return;

    grid.forEach((item, index) => {
      const el = document.querySelector(`[data-key="${item.id}"]`);
      if (!el) return;

      // إذا كان التحريك مطلوبًا ولم يحدث بعد
      if (startAnimation && !hasAnimated.current) {
        gsap.fromTo(
          el,
          { opacity: 0, y: item.y + 60, scale: 0.95, x: item.x, width: item.w, height: item.h },
          {
            opacity: 1,
            y: item.y,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.06,
          }
        );
      } else { // إذا كان التحريك قد حدث بالفعل أو غير مطلوب (فقط تحديث الأبعاد)
        gsap.to(el, {
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    });

    // 3. تحديث حالة التحريك بعد تشغيله
    if (startAnimation) {
      hasAnimated.current = true;
    }
  }, [grid, imagesReady, startAnimation]);


  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const image = el.querySelector('.masonry-image');
    const overlay = el.querySelector('.masonry-overlay');
    const info = el.querySelector('.masonry-info');

    gsap.to(image, { scale: 1.05, duration: 0.4, ease: 'power2.out' });
    gsap.to(overlay, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    gsap.fromTo(info, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, delay: 0.1, ease: 'power2.out' });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const image = el.querySelector('.masonry-image');
    const overlay = el.querySelector('.masonry-overlay');
    const info = el.querySelector('.masonry-info');

    gsap.to(image, { scale: 1, duration: 0.4, ease: 'power2.out' });
    gsap.to(overlay, { opacity: 0, duration: 0.4, ease: 'power2.out' });
    gsap.to(info, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.out' });
  };

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: grid.length > 0 ? Math.max(...grid.map(item => item.y + item.h)) : 0 }}>
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute cursor-pointer"
          style={{ willChange: 'transform, opacity' }}
          onClick={() => window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
            <div
              className="masonry-image w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${item.img})` }}
            />
            <div className="masonry-overlay absolute inset-0 bg-black/70 opacity-0 pointer-events-none" />
            <div className="masonry-info absolute inset-0 p-6 flex flex-col justify-between text-white opacity-0 pointer-events-none">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-gray-300">{item.category}</p>
                <h3 className="text-2xl font-bold mt-1">{item.title}</h3>
              </div>
              <div className="self-end">
                <FiArrowUpRight className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
