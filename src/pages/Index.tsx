
import { useEffect, useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';
import PublicationsSection from '@/components/PublicationsSection';
import ContactSection from '@/components/ContactSection';
import MessageForm from '@/components/MessageForm';
import ScrollToTop from '@/components/ScrollToTop';

const Index = () => {
  // Update page title
  useEffect(() => {
    document.title = "Vignesh Masani - Portfolio";
    
    // Add smooth scroll behavior to all anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <main>
        <section id="about">
          <HeroSection />
        </section>
        
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificationsSection />
        <PublicationsSection />
        <ContactSection />
        <MessageForm />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
