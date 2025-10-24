'use client';

import { useRef, useLayoutEffect, useState, ComponentPropsWithoutRef, ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// 1. تم حذف 'FiMapPin' لأنه غير مستخدم.
import { FiMail, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

// --- مكون العنوان (لا تغيير هنا) ---
const SectionTitle = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    gsap.from(titleRef.current?.children, {
      opacity: 0, y: 40, duration: 1, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none none' }
    });
  }, []);
  return (
    <div ref={titleRef} className="relative z-10 mb-16 text-center">
      <h2 className="font-custom-pencerio text-6xl font-bold tracking-wider text-white md:text-7xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">{subtitle}</p>
    </div>
  );
};

// --- 2. تصحيح نوع 'any' في مكون حقل الإدخال ---
// تعريف نوع الخصائص (Props) بشكل صريح
type FormInputProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  as?: ElementType; // 'as' يمكن أن يكون 'input' أو 'textarea'
};

const FormInput = ({ id, name, type = 'text', label, placeholder, required = false, as: InputComponent = 'input' }: FormInputProps) => {
  // لا حاجة لـ: const InputComponent = as;
  
  // تحديد الخصائص التي سيتم تمريرها للعنصر
  const props: ComponentPropsWithoutRef<typeof InputComponent> = {
    id,
    name,
    required,
    placeholder,
    type: InputComponent === 'textarea' ? undefined : type, // النوع فقط لـ <input>
    rows: InputComponent === 'textarea' ? 5 : undefined, // الصفوف فقط لـ <textarea>
    className: "w-full rounded-md border-2 border-gray-800 bg-transparent px-4 py-3 text-white transition-colors duration-300 focus:border-purple-500 focus:outline-none",
  };

  return (
    <div className="relative">
      <label htmlFor={id} className="absolute -top-2 left-3 bg-black px-1 text-xs font-medium text-gray-400">
        {label}
      </label>
      <InputComponent {...props} />
    </div>
  );
};


export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSubmitStatus({ success: true, message: 'Transmission complete. We will be in touch.' });
        formRef.current?.reset();
      } else {
        const result = await response.json();
        setSubmitStatus({ success: false, message: result.message || 'Transmission failed. Please try again.' });
      }
    } catch (e) { // 3. تم تغيير اسم المتغير 'error' إلى 'e' واستخدامه (أو يمكن حذفه إذا لم يتم استخدامه)
      // يمكنك تسجيل الخطأ هنا إذا أردت
      // console.error(e); 
      setSubmitStatus({ success: false, message: 'Error: Connection to server failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative w-full overflow-hidden bg-black py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'url(/grid.svg)', backgroundSize: '40px 40px' }}></div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-black via-black/80 to-black"></div>

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <SectionTitle 
          title="Initiate Contact"
          subtitle="Open a secure channel. Whether it's a project proposal or a strategic inquiry, your transmission will be received."
        />
        
        <form ref={formRef} onSubmit={handleSubmit} className="rounded-lg border border-gray-800 bg-black/50 p-6 backdrop-blur-md sm:p-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormInput id="name" name="name" label="Your Name / Alias" placeholder="John Doe" required />
            <FormInput id="email" name="email" type="email" label="Secure Email" placeholder="you@domain.com" required />
          </div>
          <div className="mt-6">
            <FormInput id="subject" name="subject" label="Subject" placeholder="Project Inquiry: Secure Web App" required />
          </div>
          <div className="mt-6">
            <FormInput as="textarea" id="message" name="message" label="Message Briefing" placeholder="Describe your mission..." required />
          </div>
          <div className="mt-8 text-center">
            <button type="submit" disabled={isSubmitting} className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-purple-600 px-12 py-3 font-bold text-white transition-all duration-300 hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-600">
              <span className="relative z-10">{isSubmitting ? 'Transmitting...' : 'Send Securely'}</span>
            </button>
          </div>
          {submitStatus && (
            <p className={`mt-4 text-center text-sm ${submitStatus.success ? 'text-green-400' : 'text-red-400'}`}>
              {submitStatus.message}
            </p>
          )}
        </form>

        <div className="mt-20 text-center">
          <h3 className="mb-6 text-lg font-semibold text-gray-400">Or connect via other channels:</h3>
          <div className="flex items-center justify-center gap-8">
            <a href="mailto:contact@rootx.sec" className="text-gray-500 transition-colors hover:text-purple-400"><FiMail className="h-7 w-7" /></a>
            <a href="https://github.com/rootx" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition-colors hover:text-purple-400"><FiGithub className="h-7 w-7" /></a>
            <a href="https://linkedin.com/company/rootx" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition-colors hover:text-purple-400"><FiLinkedin className="h-7 w-7" /></a>
            <a href="https://twitter.com/rootx" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition-colors hover:text-purple-400"><FiTwitter className="h-7 w-7" /></a>
          </div>
        </div>
      </div>
    </section>
    );
}
