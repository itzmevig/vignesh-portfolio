
import { useRef, useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, FileText } from "lucide-react";
import { motion } from 'framer-motion';

const contacts = [
  {
    icon: <Mail className="h-6 w-6" />,
    label: "Email",
    value: "vigneshmasani@gmail.com",
    link: "mailto:vigneshmasani@gmail.com"
  },
  {
    icon: <Phone className="h-6 w-6" />,
    label: "Phone",
    value: "+91 8639797417",
    link: "tel:+918639797417"
  },
  {
    icon: <Github className="h-6 w-6" />,
    label: "GitHub",
    value: "github.com/itzmevig",
    link: "https://github.com/itzmevig"
  },
  {
    icon: <Linkedin className="h-6 w-6" />,
    label: "LinkedIn",
    value: "linkedin.com/in/vigneshmasani",
    link: "https://www.linkedin.com/in/vigneshmasani/"
  },
  {
    icon: <FileText className="h-6 w-6" />,
    label: "Resume",
    value: "View Resume",
    link: "https://drive.google.com/file/d/1hwe7uo-v0TtPqmqoBDvUNk_iPfMoijZn/view?usp=sharing"
  }
];

const ContactItem = ({ icon, label, value, link, index }: { icon: React.ReactNode; label: string; value: string; link: string; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Making animation repeatable when element re-enters viewport
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    
    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [index]);

  return (
    <motion.div 
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: false }}
    >
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex flex-col items-center text-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div 
          className={`
            p-4 rounded-full mb-3
            transition-all duration-300
            ${isHovered 
              ? 'bg-gradient-to-r from-gradient-blue to-gradient-violet text-white' 
              : 'bg-accent text-accent-foreground'
            }
          `}
          whileHover={{ scale: 1.1 }}
        >
          {icon}
        </motion.div>
        <span className="font-medium">{label}</span>
        <span className={`text-sm ${isHovered ? 'text-primary' : 'text-muted-foreground'} transition-colors`}>
          {value}
        </span>
      </a>
    </motion.div>
  );
};

const ContactSection = () => {
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
    <section id="contact" ref={sectionRef} className="section-container">
      <motion.h2 
        className="section-title text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        Get In Touch
      </motion.h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
        {contacts.map((contact, index) => (
          <ContactItem 
            key={index} 
            icon={contact.icon} 
            label={contact.label} 
            value={contact.value} 
            link={contact.link} 
            index={index} 
          />
        ))}
      </div>
    </section>
  );
};

export default ContactSection;
