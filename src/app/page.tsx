import Hero from '@/components/Hero'; 
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import Footer from '@/components/Footer';
import MissionSection from '@/components/MissionSection';
import Llenis from '@/components/Llenis';
import FAQSection from '@/components/Faqsection';

export default function Home() {
  return (
    <>
      <Hero />
      <Llenis />

      <div id="mission"><MissionSection /></div>
      <div id="about"><AboutSection /></div>
      <div id="skills"><SkillsSection /></div>
      <div id="faq"><FAQSection /></div>
      
      <Footer />
    </>
  );
}
