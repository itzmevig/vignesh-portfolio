
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  
  useEffect(() => {
    const handleScroll = () => {
      // Check for scroll position to change navbar style
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      // Determine which section is in view
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.getAttribute('id') || "");
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6
        ${isScrolled ? 'bg-white/80 shadow-sm backdrop-blur-md' : 'bg-transparent'}
      `}
    >
      <nav className="container max-w-6xl mx-auto flex justify-between items-center">
        <a href="#" className="text-xl font-bold">
          <span className="gradient-text">Vignesh Masani</span>
        </a>
        
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`
                px-3 py-2 rounded-md text-sm font-medium transition-all
                ${activeSection === item.href.replace('#', '') 
                  ? 'text-primary' 
                  : 'text-gray-600 hover:text-primary'}
              `}
            >
              {item.label}
            </a>
          ))}
        </div>
        
        <Button 
          variant="default" 
          size="sm"
          className="hover:animate-ripple"
          asChild
        >
          <a 
            href="https://drive.google.com/file/d/1hwe7uo-v0TtPqmqoBDvUNk_iPfMoijZn/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
