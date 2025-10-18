import Hero from '@/components/Hero'; 
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import TeamSection from '@/components/TeamSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import FaqSection from '@/components/FaqSection'; 
import Footer from '@/components/Footer';
import MissionSection from '@/components/MissionSection';
import ServiceSection from '@/components/ServiceSection';
import PackagesSection from '@/components/PackagesSection'; 
import Llenis from '@/components/Llenis';

export default function Home() {
  return (
    <>
      <Hero />
      <Llenis />

      <div id="mission"><MissionSection /></div>
      <div id="service"><ServiceSection /></div>
      <div id="packages"><PackagesSection /></div>
      <div id="projects"><ProjectsSection /></div>
      <div id="about"><AboutSection /></div>
      <div id="skills"><SkillsSection /></div>
      <div id="team"><TeamSection /></div>
      <div id="faq"><FaqSection /></div>

      <Footer />
    </>
  );
}
