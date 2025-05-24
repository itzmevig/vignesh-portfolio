
import { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";

interface Project {
  title: string;
  description: string;
  githubUrl: string;
  linkedInUrl?: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: "Attendance Portal",
    description: "A Django-based web application for managing student attendance with user authentication and role-based permissions.",
    githubUrl: "https://github.com/itzmevig/ATTENDANCE-MANAGEMENT-SYSTEM",
    tags: ["Django", "Python", "Web App"]
  },
  {
    title: "Face Recognition (ANN)",
    description: "Artificial Neural Network based face recognition system for biometric authentication.",
    githubUrl: "https://github.com/itzmevig/CIT---Face-Recognition-using-ANN",
    tags: ["Machine Learning", "ANN", "Computer Vision"]
  },
  {
    title: "EDA on EVs",
    description: "Exploratory Data Analysis on electric vehicles dataset to uncover insights and trends.",
    githubUrl: "https://github.com/itzmevig/EDA-Electric-Vehicles",
    linkedInUrl: "https://www.linkedin.com/posts/vigneshmasani_datascience-exploratorydataanalysis-python-activity-7249311239217000448-J60g",
    tags: ["Data Science", "Python", "EDA"]
  },
  {
    title: "Code Review App",
    description: "AI-powered application that provides code reviews and suggestions to improve code quality.",
    githubUrl: "https://github.com/itzmevig/Code-Review-App",
    linkedInUrl: "https://www.linkedin.com/posts/vigneshmasani_genai-codereviewapp-innomaticsresearchlabs-activity-7265021597512589313-574Q",
    tags: ["GenAI", "Python", "Web App"]
  }
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 150);
          observer.unobserve(entry.target);
        }
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
    <div 
      ref={cardRef}
      className={`transition-all duration-700 transform ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <Card className="h-full card-hover">
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <span 
                key={tagIndex}
                className="badge bg-accent/50 text-accent-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="group" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4 group-hover:text-black transition-colors" />
              GitHub
            </a>
          </Button>
          
          {project.linkedInUrl && (
            <Button variant="outline" size="sm" className="group" asChild>
              <a href={project.linkedInUrl} target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4 group-hover:text-blue-600 transition-colors" />
                LinkedIn
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-container">
      <h2 className="section-title text-center">Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
