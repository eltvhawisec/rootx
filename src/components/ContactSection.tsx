'use client';

import { useRef, useLayoutEffect, useState } from 'react'; // --- 1. استيراد useState ---
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const SectionTitle = ({ title, subtitle }: { title: string; subtitle: string }) => {
    const titleRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
      gsap.from(titleRef.current, {
        opacity: 0, y: 40, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none none' }
      });
    }, []);
    return (
      <div ref={titleRef} className="text-center mb-16 md:mb-20">
        <h2 className="font-custom-pencerio text-5xl md:text-6xl font-bold text-white tracking-wide">{title}</h2>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
      </div>
    );
};

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // --- 2. إضافة حالات لتتبع حالة الإرسال ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elementsToAnimate = [formRef.current, detailsRef.current];
      gsap.set(elementsToAnimate, { opacity: 0, y: 50 });
      gsap.to(elementsToAnimate, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // --- 3. دالة لمعالجة إرسال النموذج ---
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ success: true, message: 'Message sent successfully! Thank you.' });
        formRef.current?.reset(); // مسح النموذج بعد الإرسال الناجح
      } else {
        setSubmitStatus({ success: false, message: result.message || 'An error occurred.' });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Failed to connect to the server.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="w-full py-24 md:py-32 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle 
          title="Let's Build Something Great"
          subtitle="Have a project in mind or just want to say hello? My inbox is always open. I'll get back to you as soon as possible."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* --- 4. ربط دالة handleSubmit بالنموذج --- */}
          <form ref={formRef} onSubmit={handleSubmit} className="w-full space-y-6">
            {/* (الحقول كما هي) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                <input required type="text" id="name" name="name" className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-1">Company Name <span className="text-gray-500">(Optional)</span></label>
                <input type="text" id="company" name="company" className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white" placeholder="Your Company" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
              <input required type="email" id="email" name="email" className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-400 mb-1">Service Interested In</label>
              <select id="service" name="service" className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white appearance-none">
                <option>Select a service...</option>
                <option>Web Development</option>
                <option>UI/UX Design</option>
                <option>SEO Optimization</option>
                <option>Cybersecurity</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
              <textarea required id="message" name="message" rows={5} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white" placeholder="Tell me about your project..."></textarea>
            </div>
            <div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-white text-black font-bold text-lg px-8 py-4 rounded-full hover:bg-gray-200 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
            {/* --- 5. عرض رسائل الحالة --- */}
            {submitStatus && (
              <p className={`text-center mt-4 ${submitStatus.success ? 'text-green-400' : 'text-red-400'}`}>
                {submitStatus.message}
              </p>
            )}
          </form>
          {/* (الجزء الأيمن لا تغيير فيه) */}
          <div ref={detailsRef} className="space-y-10">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Contact Details</h3>
              <div className="space-y-4">
                <a href="mailto:eltuhamisec@gmail.com" className="flex items-center gap-4 group">
                  <FiMail className="w-6 h-6 text-gray-400" />
                  <span className="text-lg text-gray-300 group-hover:text-white transition-colors">eltuhamisec@gmail.com</span>
                </a>
                <a href="tel:+31163014" className="flex items-center gap-4 group">
                  <FiPhone className="w-6 h-6 text-gray-400" />
                  <span className="text-lg text-gray-300 group-hover:text-white transition-colors">+974 31163014</span>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Follow Me</h3>
              <div className="flex items-center gap-6">
                <a href="https://github.com/eltvhawisec" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FiGithub className="w-8 h-8" /></a>
                <a href="https://linkedin.com/in/ahmed-eltuhami-532354380" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FiLinkedin className="w-8 h-8" /></a>
                <a href="https://twitter.com/eltvhawisec" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FiTwitter className="w-8 h-8" /></a>
                <a href="https://instagram.com/eltvhawisec" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FiInstagram className="w-8 h-8" /></a>
                <a href="https://tiktok.com/eltvhawi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaTiktok className="w-8 h-8" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
   );
}
