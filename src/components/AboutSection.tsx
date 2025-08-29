// src/components/AboutSection.tsx

// --- مكون العنوان (تم تكبيره) ---
const SectionTitle = ({ title }: { title: string }) => (
  <div className="flex items-center gap-6 w-full"> {/* زيادة الفجوة */}
    <div className="h-2 flex-grow bg-black"></div> {/* زيادة السماكة */}
    <h2 className="font-custom-heading text-6xl md:text-7xl font-black tracking-wider shrink-0 text-black"> {/* زيادة حجم الخط */}
      &#123;{title}&#125;
    </h2>
    <div className="h-2 flex-grow bg-black"></div> {/* زيادة السماكة */}
  </div>
);

export default function AboutSection() {
  return (
    // --- زيادة الهوامش العلوية والسفلية للقسم ---
    <section id="about" className="w-full py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* --- زيادة الهامش السفلي للعنوان --- */}
        <div className="w-full md:max-w-xl mb-12"> {/* زيادة العرض الأقصى والهامش */}
          <SectionTitle title="About" />
        </div>

        <div className="w-full flex flex-col md:flex-row gap-20 lg:gap-32 justify-center items-start"> {/* زيادة الفجوة */}
          
          {/* --- عمود النص (تم تكبيره) --- */}
          <div className="w-full md:max-w-2xl mt-6"> {/* زيادة العرض الأقصى والهامش */}
            <p className="text-2xl md:text-3xl font-black leading-normal text-black"> {/* زيادة حجم الخط وسماكته */}
              My name is eltuhami, a Full Stack Web Developer from Sudan with a strong 
              background in Cybersecurity. I specialize in building and securing modern web 
              applications, combining development skills with security expertise to deliver 
              reliable digital solutions. My passion lies in creating robust back-end systems 
              with Node.js and crafting seamless user experiences with React and Next.js. 
            </p>
          </div>

          {/* --- عمود الصورة (تم تكبيره) --- */}
          {/* تم تغيير md:max-w-4xl إلى md:max-w-5xl لزيادة العرض */}
          <div className="w-full md:max-w-7xl">
            <img
              src="/eltuhami.ico"
              alt="eltuhami logo"
              className="w-full aspect-square object-cover rounded-3xl [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.5))]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
