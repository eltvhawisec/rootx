// src/components/Sidebar.tsx

import { Sparkles } from 'lucide-react'; // أزلنا استيراد X لأنه لم يعد مطلوبًا

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'light' | 'dark';
}

const NavItem = ({ label }: { label: string }) => (
  <div className="flex items-center gap-4 group cursor-pointer">
    <div className="w-8 h-0.5 bg-black transition-all duration-300 group-hover:w-12"></div>
    <span className="text-xl font-semibold tracking-wider text-black group-hover:text-gray-600">{label}</span>
  </div>
);

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const maskSvg = `url("data:image/svg+xml,%3Csvg width='32' height='64' viewBox='0 0 32 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0 L0 32 L32 64 Z' fill='black'/%3E%3C/svg%3E"  )`;

  return (
    <>
      {/* --- التعديل هنا --- */}
      {/* أعدنا العنصر الذي يغطي الشاشة، لكن جعلناه شفافًا تمامًا */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent z-40"
          onClick={onClose}
        />
      )}
      
      <div
        className={`fixed top-0 right-0 h-full z-50 transition-transform duration-500 ease-in-out flex ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex bg-white text-black">
          <div
            className="h-full w-8 bg-white"
            style={{
              maskImage: maskSvg,
              maskRepeat: 'repeat-y',
              maskSize: '32px 64px',
              WebkitMaskImage: maskSvg,
              WebkitMaskRepeat: 'repeat-y',
              WebkitMaskSize: '32px 64px',
            }}
          ></div>
          {/* أزلنا position: relative وزر الإغلاق من هنا */}
          <div className="w-80 p-10 flex flex-col">
            <div className="flex items-center justify-center gap-4 mb-16">
              <Sparkles className="w-8 h-8 text-black" />
              <h2 className="font-custom-heading text-3xl font-bold">eltuhami</h2>
              <Sparkles className="w-8 h-8 text-black" />
            </div>
            <nav className="flex-1 flex flex-col justify-center">
              <div className="relative flex flex-col items-start gap-12">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-black"></div>
                <NavItem label="About" />
                <NavItem label="Projects" />
                <NavItem label="Skills" />
                <NavItem label="Contact" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
