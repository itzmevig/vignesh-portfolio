
import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EducationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // SR University images
  const universityImages = [
    {
      src: "/lovable-uploads/f48cc219-bf69-47c3-852b-696fd62272d0.png",
      alt: "SR University Logo",
      className: "w-full h-auto object-contain rounded-lg"
    },
    {
      src: "/lovable-uploads/d351632d-65bc-400e-ac62-03e67d532098.png",
      alt: "SR University Campus View",
      className: "w-full h-auto object-cover rounded-lg"
    },
    {
      src: "/lovable-uploads/6a885110-bbc9-465c-b638-21fa60d82194.png",
      alt: "SR University Short Logo",
      className: "w-full h-auto object-contain rounded-lg"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
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

  // Image carousel effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isVisible) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === universityImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // Change image every 4 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVisible, universityImages.length]);

  return (
    <section id="education" ref={sectionRef} className="section-container">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="section-title text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          🎓 Education
        </motion.h2>
        
        <motion.div 
          className="transition-all duration-700 transform"
          initial={{ opacity: 0, x: 20 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 gradient-bg">
            <div className="flex flex-col items-center text-center">
              {/* Image Carousel - now centered and above the text */}
              <div className="relative h-[240px] w-full max-w-md rounded-lg overflow-hidden shadow-md mb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={universityImages[currentImageIndex].src}
                      alt={universityImages[currentImageIndex].alt}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* University details - now centered below the image */}
              <div className="mt-4">
                <h3 className="text-2xl font-bold gradient-text">🎓 SR University</h3>
                <div className="flex items-center justify-center mt-2 mb-4">
                  <span className="inline-block w-2 h-2 rounded-full bg-gradient-violet mr-2 animate-pulse-subtle"></span>
                  <span className="text-muted-foreground">📅 Oct 2022 – May 2026</span>
                </div>
                
                <h4 className="text-xl font-medium mb-2">💻 B.Tech in Computer Science</h4>
                <p className="mb-4">GPA: 7.56/10</p>
                
                <div className="mt-4">
                  <h5 className="font-medium mb-2">📚 Relevant Courses:</h5>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["Python", "Java", "DSA", "OS", "DBMS"].map((course, index) => (
                      <span 
                        key={index} 
                        className="badge bg-gradient-to-r from-white to-accent/50 border border-gray-200 text-gray-800"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
