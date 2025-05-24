
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SkillBubble {
  name: string;
  size: 'sm' | 'md' | 'lg';
  category: 'language' | 'web' | 'tech' | 'db' | 'tool' | 'analytics';
}

const skills: SkillBubble[] = [
  { name: "Python", size: "lg", category: "language" },
  { name: "C++", size: "md", category: "language" },
  { name: "Java", size: "md", category: "language" },
  { name: "C#", size: "sm", category: "language" },
  { name: "HTML", size: "md", category: "web" },
  { name: "CSS", size: "md", category: "web" },
  { name: "JavaScript", size: "md", category: "web" },
  { name: "Django", size: "lg", category: "web" },
  { name: "ML", size: "lg", category: "tech" },
  { name: "Full Stack", size: "lg", category: "tech" },
  { name: "AI", size: "md", category: "tech" },
  { name: "SQL", size: "md", category: "db" },
  { name: "MySQL", size: "md", category: "db" },
  { name: "PL/SQL", size: "sm", category: "db" },
  { name: "Git", size: "md", category: "tool" },
  { name: "VS Code", size: "md", category: "tool" },
  { name: "Excel", size: "md", category: "analytics" },
  { name: "Power BI", size: "md", category: "analytics" }
];

const SkillsSection = () => {
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
  
  const getSizeClasses = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm': return 'text-sm px-3 py-1';
      case 'md': return 'text-base px-4 py-2';
      case 'lg': return 'text-lg px-5 py-3 font-medium';
      default: return 'text-base px-4 py-2';
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'language': return 'from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 border-blue-200';
      case 'web': return 'from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30 border-purple-200';
      case 'tech': return 'from-indigo-500/20 to-indigo-600/20 hover:from-indigo-500/30 hover:to-indigo-600/30 border-indigo-200';
      case 'db': return 'from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30 border-green-200';
      case 'tool': return 'from-orange-500/20 to-orange-600/20 hover:from-orange-500/30 hover:to-orange-600/30 border-orange-200';
      case 'analytics': return 'from-teal-500/20 to-teal-600/20 hover:from-teal-500/30 hover:to-teal-600/30 border-teal-200';
      default: return 'from-gray-500/20 to-gray-600/20 hover:from-gray-500/30 hover:to-gray-600/30 border-gray-200';
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="skills" ref={sectionRef} className="section-container relative overflow-hidden">
      <div className="relative z-10">
        <motion.h2 
          className="section-title text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          Skills
        </motion.h2>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          viewport={{ once: false }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="mb-3"
              variants={item}
              whileHover={{ scale: 1.1 }}
              viewport={{ once: false }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10
              }}
            >
              <div 
                className={`
                  rounded-full shadow-md 
                  bg-gradient-to-r ${getCategoryColor(skill.category)}
                  ${getSizeClasses(skill.size)}
                  border transition-all duration-300
                `}
              >
                {skill.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/20 to-transparent -z-10 opacity-50"></div>
    </section>
  );
};

export default SkillsSection;
