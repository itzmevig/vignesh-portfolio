
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-transparent to-accent/20 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold gradient-text">Vignesh Masani</h3>
            <p className="text-sm mt-2 text-muted-foreground">
              Full Stack Developer | AI & Data Science Enthusiast
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com/itzmevig" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/vigneshmasani/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <Linkedin className="h-5 w-5 text-blue-600" />
            </a>
            <a 
              href="mailto:vigneshmasani@gmail.com" 
              className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Vignesh Masani. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
