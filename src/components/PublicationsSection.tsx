import { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, Linkedin } from "lucide-react";

interface Publication {
  title: string;
  url: string;
  linkedInUrl: string;
  date: string;
}

const publications: Publication[] = [
  {
    title: "Text Mining",
    url: "https://medium.com/@vigneshmasani/unlocking-insights-the-magic-of-text-mining-in-the-digital-age-fb12a8e28764",
    linkedInUrl: "https://www.linkedin.com/posts/vigneshmasani_unlocking-insights-the-magic-of-text-mining-activity-7282674503216779264-f8st",
    date: "2024-05-01"
  },
  {
    title: "Chunking Techniques",
    url: "https://lnkd.in/gJi3dKnM",
    linkedInUrl: "https://www.linkedin.com/posts/vigneshmasani_the-role-of-chunking-in-problem-solving-and-activity-7299316352148770816-1sRe",
    date: "2024-05-15"
  }
];

const PublicationsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
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
    <section id="publications" ref={sectionRef} className="section-container">
      <h2 className="section-title text-center">Publications</h2>
      
      <div className="max-w-3xl mx-auto relative">
        {/* Timeline line */}
        <div className="timeline-line"></div>
        
        {publications.map((publication, index) => (
          <div 
            key={index}
            className={`relative pl-16 mb-12 transition-all duration-700 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
            style={{ transitionDelay: `${index * 0.2}s` }}
          >
            {/* Timeline dot */}
            <div className="timeline-dot"></div>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>{publication.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{publication.date}</p>
                <div className="flex gap-3 flex-wrap">
                  <Button variant="outline" size="sm" className="group" asChild>
                    <a href={publication.url} target="_blank" rel="noopener noreferrer">
                      <Link className="mr-2 h-4 w-4 group-hover:text-gradient-blue transition-colors" />
                      Read Article
                    </a>
                  </Button>
                  
                  <Button variant="outline" size="sm" className="group" asChild>
                    <a href={publication.linkedInUrl} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-4 w-4 group-hover:text-blue-600 transition-colors" />
                      LinkedIn Post
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PublicationsSection;
