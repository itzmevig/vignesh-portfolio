
import { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

interface Certification {
  title: string;
  issuer: string;
  url: string;
  icon: string;
}

const certifications: Certification[] = [
  {
    title: "Azure Fundamentals",
    issuer: "Microsoft",
    url: "https://learn.microsoft.com/en-us/users/vigneshmasani/credentials/c3d0daf25e5d51fd",
    icon: "🎓"
  },
  {
    title: "Azure Data Scientist Associate",
    issuer: "Microsoft",
    url: "https://learn.microsoft.com/en-us/users/vigneshmasani/credentials/c9b016db8054694a",
    icon: "📊"
  },
  {
    title: "Azure AI Engineer Associate",
    issuer: "Microsoft",
    url: "https://learn.microsoft.com/en-us/users/vigneshmasani/credentials/d6dd5d523db328a4",
    icon: "🤖"
  },
  {
    title: "Cisco Intro to Networks",
    issuer: "Cisco",
    url: "https://www.credly.com/badges/d2898bfb-5220-49a1-bb3b-1655fbe5dc6a/public_url",
    icon: "🌐"
  },
  {
    title: "Cisco Routing & Switching",
    issuer: "Cisco",
    url: "https://www.credly.com/badges/41a48cc7-cde9-4dc7-ba06-fc12df7a20fe/public_url",
    icon: "📡"
  },
  {
    title: "Fortinet Cybersecurity",
    issuer: "Fortinet",
    url: "https://www.credly.com/badges/1f75307d-0f57-4f6a-8444-e3d72fe3a6b2/public_url",
    icon: "🔐"
  },
  {
    title: "AWS Cloud Foundations",
    issuer: "Amazon Web Services",
    url: "https://www.credly.com/badges/994ce6de-b4b1-41f7-ade8-6b7da40a6fd8/public_url",
    icon: "☁️"
  }
];

const CertificationCard = ({ certification, index }: { certification: Certification; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Making animation repeatable when element re-enters viewport
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);
  
  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: false }}
    >
      <a 
        href={certification.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block h-[200px]"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="w-full h-full card-hover gradient-bg group">
          <CardContent className="flex flex-col items-center justify-center h-full p-6">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{certification.icon}</div>
            <h3 className="font-medium text-center group-hover:text-primary transition-colors">{certification.title}</h3>
            <p className="text-sm text-muted-foreground text-center">{certification.issuer}</p>
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-primary">
              View credential →
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
};

const CertificationsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="section-container">
      <motion.h2 
        className="section-title text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        Certifications
      </motion.h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {certifications.map((certification, index) => (
          <CertificationCard key={index} certification={certification} index={index} />
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;
