// src/components/AboutSection.tsx

const SectionTitle = ({ title }: { title: string }) => (
  <div className="flex items-center gap-4 w-full">
    <div className="h-1.5 flex-grow bg-black"></div>
    <h2 className="text-5xl font-extrabold tracking-wider shrink-0 text-black">
      &#123;{title}&#125;
    </h2>
    <div className="h-1.5 flex-grow bg-black"></div>
  </div>
);

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-10 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        <div className="w-full md:max-w-lg mb-8">
          <SectionTitle title="About" />
        </div>

        <div className="w-full flex flex-col md:flex-row gap-16 lg:gap-24 justify-center items-start">
          
          <div className="w-full md:max-w-lg mt-4">
            {/* --- التعديل هنا --- */}
            {/* تم توسيع النص وإضافة المزيد من التفاصيل */}
            <p className="text-xl md:text-2xl font-extrabold leading-relaxed text-black">
              My name is eltuhami, a Full Stack Web Developer from Sudan with a strong 
              background in Cybersecurity. I specialize in building and securing modern web 
              applications, combining development skills with security expertise to deliver 
              reliable digital solutions. My passion lies in creating robust back-end systems 
              with Node.js and crafting seamless user experiences with React and Next.js. 
            </p>
          </div>

          <div className="w-full md:max-w-lg">
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
