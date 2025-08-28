// src/components/TornPaperDivider.tsx
import React from 'react';

interface TornPaperDividerProps {
  direction?: 'left' | 'right';
}

export default function TornPaperDivider({ direction = 'right' }: TornPaperDividerProps) {
  // تحديد ما إذا كان يجب عكس الصورة
  const isFlipped = direction === 'left';

  return (
    // الحاوية تأخذ العرض الكامل وتضمن أن الصورة بداخلها لا تسبب أي تجاوز
    <div className="w-full h-48 md:h-64 overflow-hidden relative">
      <img
        src="/wrg.jpg" // <-- تأكد من وضع الصورة في مجلد `public` بهذا الاسم
        alt="Torn paper divider"
        className={`absolute top-0 left-0 w-full h-full object-cover ${isFlipped ? 'transform -scale-x-100' : ''}`}
        style={{
          // هذا يضمن أن الصورة تغطي المساحة بشكل جيد دون تشويه
          objectPosition: 'center',
        }}
      />
    </div>
  );
}
