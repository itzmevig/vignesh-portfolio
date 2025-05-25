import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  const contactButtons = [
    {
      label: "Resume",
      href: "https://drive.google.com/file/d/1hwe7uo-v0TtPqmqoBDvUNk_iPfMoijZn/view?usp=sharing",
      icon: <HiOutlineDocumentDownload className="text-lg" />,
      tooltip: "Download Resume",
      external: true,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/vigneshmasani/",
      icon: <FaLinkedin className="text-lg text-blue-600" />,
      tooltip: "View LinkedIn",
      external: true,
    },
    {
      label: "Mail",
      href: "mailto:vigneshmasani@gmail.com",
      icon: <MdEmail className="text-lg text-red-500" />,
      tooltip: "Mail me",
      external: false,
    },
    {
      label: "Call",
      href: "tel:+918639797417",
      icon: <FiPhone className="text-lg text-green-600" />,
      tooltip: "Call me",
      external: false,
    },
    {
      label: "GitHub",
      href: "https://github.com/itzmevig",
      icon: <FaGithub className="text-lg text-gray-800" />,
      tooltip: "See my GitHub",
      external: true,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-white dark:bg-gray-900 text-center"
    >
      {/* Profile Image with Animation */}
      <motion.div
        className="w-40 h-40 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6 animate-float"
        initial={{ opacity: 0, y: -30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <img
          src="/lovable-uploads/a49484c4-46ea-4ade-8473-ef9001bb8eb8.png"
          alt="Vignesh Masani"
          className="object-cover w-full h-full"
        />
      </motion.div>

      {/* Intro Text with Typewriter Effect */}
      <motion.h1
        className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Hi, I am <span className="text-blue-600">Vignesh Masani</span>
      </motion.h1>

      <motion.div
        className="text-2xl sm:text-3xl text-gray-700 dark:text-gray-300 mb-6 min-h-[3rem]"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Typewriter
          options={{
            strings: [
              "Full Stack Developer",
              "AI Enthusiast",
              "Data Science Explorer",
              "Software Developer"
            ],
            autoStart: true,
            loop: true,
            delay: 60,
            deleteSpeed: 40
          }}
        />
      </motion.div>

      <motion.p
        className="max-w-2xl text-gray-600 dark:text-gray-400 mb-8 text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        I'm a full-stack developer and AI enthusiast with a passion for building intuitive web apps, exploring GenAI, and uncovering insights through data science.
      </motion.p>

      {/* Resume + LinkedIn Buttons */}
      <motion.div
        className="flex gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Button variant="default" size="lg" asChild>
          <a
            href="https://drive.google.com/file/d/1hwe7uo-v0TtPqmqoBDvUNk_iPfMoijZn/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </a>
        </Button>

        <Button variant="outline" size="lg" asChild>
          <a
            href="https://www.linkedin.com/in/vigneshmasani/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="mr-2 h-4 w-4 text-blue-600" />
            LinkedIn
          </a>
        </Button>
      </motion.div>

      {/* Contact Icons */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {contactButtons.map((button, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={button.href}
                  target={button.external ? "_blank" : undefined}
                  rel={button.external ? "noopener noreferrer" : undefined}
                  aria-label={button.tooltip}
                >
                  <button className="flex items-center gap-2 px-4 py-2 rounded-md shadow-md bg-white hover:bg-gray-100 text-sm transition-colors duration-300">
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
    </section>
  );
};

export default HeroSection;
