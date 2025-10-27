'use client';

import { useRef, useLayoutEffect, useState, ComponentPropsWithoutRef, ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMail, FiGithub, FiLinkedin, FiTwitter, FiPhone } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

type FormInputProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  as?: ElementType;
};

const FormInput = ({ id, name, type = 'text', label, placeholder, required = false, as: InputComponent = 'input' }: FormInputProps) => {
  const props: ComponentPropsWithoutRef<typeof InputComponent> = {
    id, name, required, placeholder,
    type: InputComponent === 'textarea' ? undefined : type,
    rows: InputComponent === 'textarea' ? 4 : undefined,
    className: "w-full rounded-md border border-gray-700 bg-gray-900/50 px-4 py-3 text-white transition-colors duration-300 focus:border-purple-500 focus:outline-none",
  };
  return (
    <div className="relative">
      <label htmlFor={id} className="text-sm font-medium text-gray-400">{label}</label>
      <div className="mt-1">
        <InputComponent {...props} />
      </div>
    </div>
  );
};


export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(contentWrapperRef.current, {
        opacity: 0,
        y: 100, 
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: { 
          trigger: section, 
          start: 'top 75%', 
          toggleActions: 'play none none none' 
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
        (event.target as HTMLFormElement).reset();
      } else {
        const result = await response.json();
        setSubmitStatus({ success: false, message: result.message || 'Transmission failed.' });
      }
    } catch (e) {
      setSubmitStatus({ success: false, message: 'Error: Connection to server failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative w-full overflow-hidden py-24 md:py-32">
      
      <div className="absolute inset-0 z-0">
        <img
          src="/blob-scene-haikei.png" 
          alt="Abstract wave animation"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div ref={contentWrapperRef} className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-2">
        
        <div className="flex flex-col justify-center">
          <h2 className="font-custom-pencerio text-5xl font-bold tracking-wider text-white md:text-6xl">
            Open a Secure Channel
          </h2>
          <p className="mt-4 max-w-lg text-lg text-gray-300">
            Have a project, a question, or a critical vulnerability to report? Reach out directly or use the secure form. Your communication is confidential.
          </p>
          
          <div className="mt-12 space-y-6">
            <a href="tel:+97439231414" className="group flex items-center gap-4">
              <FiPhone className="h-7 w-7 text-gray-500 transition-colors group-hover:text-purple-400" />
              <span className="text-xl font-medium text-gray-300 group-hover:text-white">+974 3923 1414</span>
            </a>
            <a href="mailto:contact@rootx.sec" className="group flex items-center gap-4">
              <FiMail className="h-7 w-7 text-gray-500 transition-colors group-hover:text-purple-400" />
              <span className="text-xl font-medium text-gray-300 group-hover:text-white">contact@rootx.sec</span>
            </a>
          </div>

          <div className="mt-12 border-t border-gray-800 pt-8">
            <h3 className="text-base font-semibold text-gray-400">Follow our operations:</h3>
            <div className="mt-4 flex items-center gap-6">
              <a href="https://github.com/rootx" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition-colors hover:text-white"><FiGithub className="h-6 w-6" /></a>
              <a href="https://linkedin.com/company/rootx" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition-colors hover:text-white"><FiLinkedin className="h-6 w-6" /></a>
              <a href="https://twitter.com/rootx" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition-colors hover:text-white"><FiTwitter className="h-6 w-6" /></a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-5 rounded-lg border border-gray-800 bg-gray-900/50 p-8 backdrop-blur-sm">
          <FormInput id="name" name="name" label="Name / Alias" placeholder="John Doe" required />
          <FormInput id="email" name="email" type="email" label="Secure Email" placeholder="you@domain.com" required />
          <FormInput id="subject" name="subject" label="Subject" placeholder="Project Inquiry" required />
          <FormInput as="textarea" id="message" name="message" label="Message Briefing" placeholder="Describe your mission..." required />
          
          <div>
            <button type="submit" disabled={isSubmitting} className="w-full rounded-md bg-purple-600 px-8 py-3 font-bold text-white transition-all duration-300 hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-600">
              {isSubmitting ? 'Transmitting...' : 'Send Securely'}
            </button>
          </div>
          {submitStatus && (
            <p className={`text-center text-sm ${submitStatus.success ? 'text-green-400' : 'text-red-400'}`}>
              {submitStatus.message}
            </p>
            )}
        </form>
      </div>
    </section>
  );
}
