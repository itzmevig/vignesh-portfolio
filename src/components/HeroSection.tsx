import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Linkedin, Mail, Phone, FileText, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const introTextLines = [
    "Hello, I'm Vignesh Masani",
    "🎓 B.Tech in CSE @ SR University",
    "💡 Full Stack Dev | AI | Data Science"
  ];
  
  useEffect(() => {
    // Create intersection observer to detect when section is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set visibility based on intersection with viewport
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

  // Contact links data
  const contactButtons = [
    { 
      label: "Resume", 
      href: "https://drive.google.com/file/d/1hwe7uo-v0TtPqmqoBDvUNk_iPfMoijZn/view?usp=sharing", 
      icon: <HiOutlineDocumentDownload className="text-lg" />,
      tooltip: "Download Resume",
      external: true
    },
    { 
      label: "LinkedIn", 
      href: "https://www.linkedin.com/in/vigneshmasani/", 
      icon: <FaLinkedin className="text-lg text-blue-600" />,
      tooltip: "View LinkedIn",
      external: true
    },
    { 
      label: "Mail", 
      href: "mailto:vigneshmasani@gmail.com", 
      icon: <MdEmail className="text-lg text-red-500" />,
      tooltip: "Mail me",
      external: false
    },
    { 
      label: "Call", 
      href: "tel:+918639797417", 
      icon: <FiPhone className="text-lg text-green-600" />,
      tooltip: "Call me",
      external: false
    },
    { 
      label: "GitHub", 
      href: "https://github.com/itzmevig", 
      icon: <FaGithub className="text-lg text-gray-800" />,
      tooltip: "See my GitHub",
      external: true
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center py-16 px-4 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex flex-col md:flex-row md:items-center md:justify-center mb-8 gap-8">
          {/* Profile image container with animation */}
          <motion.div 
            className="relative md:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15,
              duration: 0.8 
            }}
            viewport={{ once: false }}
          >
            <div className="w-64 h-64 mx-auto relative">
              {/* Animated glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gradient-blue via-gradient-violet to-gradient-mint opacity-20 animate-pulse-subtle"></div>
              
              {/* Floating image animation */}
              <motion.div 
                className="w-full h-full rounded-full shadow-xl overflow-hidden animate-float"
                animate={{ 
                  boxShadow: [
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", 
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
              >
                <img 
                  src="/lovable-uploads/a49484c4-46ea-4ade-8473-ef9001bb8eb8.png" 
                  alt="Vignesh Masani" 
                  className="w-full h-full object-cover rounded-full border-4 border-white" 
                />
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-blue rounded-full"
                animate={{ 
                  y: [0, -8, 0],
                  opacity: [0.7, 0.9, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div 
                className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-mint rounded-full"
                animate={{ 
                  y: [0, 8, 0],
                  opacity: [0.7, 0.9, 0.7]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5
                }}
              />
            </div>
          </motion.div>
          
          {/* Text content with sequential reveal */}
          <motion.div 
            className="md:w-2/3 space-y-4"
            variants={container}
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
            viewport={{ once: false }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold"
              variants={item}
            >
              <span className="gradient-text">Hello, I'm Vignesh Masani</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl"
              variants={item}
            >
              🎓 B.Tech in CSE @ SR University
            </motion.p>
            
            <motion.p 
              className="text-lg md:text-xl"
              variants={item}
            >
              💡 Full Stack Dev | AI | Data Science
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center md:justify-start gap-4"
              variants={item}
            >
              <Button 
                variant="default" 
                size="lg" 
                className="group hover:animate-ripple shadow-md relative overflow-hidden" 
                asChild
              >
                <a 
                  href="https://drive.google.com/file/d/1hwe7uo-v0TtPqmqoBDvUNk_iPfMoijZn/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative z-10 hover:scale-105 transition-transform"
                >
                  <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Download Resume
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-25 transition-opacity rounded-md"></span>
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="group hover:animate-ripple shadow-md relative overflow-hidden" 
                asChild
              >
                <a 
                  href="https://www.linkedin.com/in/vigneshmasani/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative z-10 hover:scale-105 transition-transform"
                >
                  <Linkedin className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform text-blue-600" />
                  LinkedIn
                  <span className="absolute inset-0 bg-gradient-blue opacity-0 group-hover:opacity-10 transition-opacity rounded-md"></span>
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Contact Buttons Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ 
            delay: 0.8,
            duration: 0.5 
          }}
        >
          {contactButtons.map((button, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                delay: 0.8 + (index * 0.1),
                duration: 0.5 
              }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={button.href}
                    target={button.external ? "_blank" : undefined}
                    rel={button.external ? "noopener noreferrer" : undefined}
                    aria-label={button.tooltip}
                    className="inline-block"
                  >
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-md shadow-md bg-white hover:bg-gray-100 text-sm transition-colors duration-300"
                    >
                      {button.icon}
                      {button.label}
                    </button>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{button.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
