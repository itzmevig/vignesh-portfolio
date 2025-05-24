
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

interface ExperienceCardProps {
  title: string;
  company: string;
  linkedInUrl: string;
  certificateUrl?: string;
  index: number;
}

const ExperienceCard = ({ title, company, linkedInUrl, certificateUrl, index }: ExperienceCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 150); // Staggered reveal
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
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
    <div
      ref={cardRef}
      className={`transition-all duration-700 transform ${isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-10'}`}
    >
      <Card className="h-full card-hover">
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{company}</p>
        </CardContent>
        <CardFooter className="flex justify-between flex-wrap gap-2">
          <Button variant="outline" size="sm" className="group" asChild>
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
              <Link className="mr-2 h-4 w-4 group-hover:text-blue-600 transition-colors" />
              LinkedIn Post
            </a>
          </Button>
          
          {certificateUrl && (
            <Button variant="secondary" size="sm" className="group" asChild>
              <a href={certificateUrl} target="_blank" rel="noopener noreferrer">
                <span className="group-hover:text-gradient-violet transition-colors">Certificate</span>
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-container">
      <h2 className="section-title text-center">Experience</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ExperienceCard 
          title="Data Science with GenAI" 
          company="Innomatics Labs" 
          linkedInUrl="https://www.linkedin.com/posts/vigneshmasani_genai-codereviewapp-innomaticsresearchlabs-activity-7265021597512589313-574Q"
          certificateUrl="https://drive.google.com/file/d/1cwRtqpCtLe1_M6SzXY9K4ziZwE3m27nP/view?usp=sharing"
          index={0}
        />
        
        <ExperienceCard 
          title="Python Django Intern" 
          company="Avishkar Tech Solutions" 
          linkedInUrl="https://www.linkedin.com/posts/vigneshmasani_attendance-portal-django-python-activity-7270074523702691840-LhdW"
          certificateUrl="https://drive.google.com/file/d/1R6xJBvnP0xbtWAHZwpnq6MT3xpJ4Z8qc/view?usp=sharing"
          index={1}
        />
        
        <ExperienceCard 
          title="ML Intern" 
          company="Internship Studio" 
          linkedInUrl="https://www.linkedin.com/posts/vigneshmasani_face-recognition-ann-python-activity-7260073128634814464-d4Aw"
          certificateUrl="https://drive.google.com/file/d/1hfxu3PZe9UO65GTrbYhCnAA8bLIg2HCi/view?usp=sharing"
          index={2}
        />
        
        <ExperienceCard 
          title="Data Science Intern" 
          company="Hema AI Consulting" 
          linkedInUrl="https://www.linkedin.com/posts/vigneshmasani_python-eda-sql-machinelearning-activity-7290348301854062592-z45V"
          index={3}
        />
      </div>
    </section>
  );
};

export default ExperienceSection;
