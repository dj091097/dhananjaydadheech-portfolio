import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import resumeData from '@/data/resume';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const TypewriterText: React.FC<{ text: string, delay?: number }> = ({ text, delay = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return (
    <span>
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  };

  const stats = [
    { value: 4, label: "Years Experience", prefix: "~" },
    { value: 20, label: "Sales Boost", suffix: "%" },
    { value: 15, label: "MoM Retention", suffix: "%" },
    { value: 10, label: "Automated Reports", suffix: "+" }
  ];

  const downloadResume = () => {
    // Create a temporary link to download the resume
    fetch('/api/download-resume')
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Resume_Dhananjay_Dadheech.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch(error => {
        console.error('Error downloading resume:', error);
      });
  };

  return (
    <section id="hero" className="pt-24 pb-12 md:pt-32 md:pb-24 bg-gradient-to-r from-primary to-secondary text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-3/5 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
              <TypewriterText text="Business Analytics " delay={80} />
              <span className="text-accent">
                <TypewriterText text="Specialist" delay={80} />
              </span>
            </h1>
            <motion.p 
              className="text-xl mb-8 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
            >
              {resumeData.summary}
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.5 }}
            >
              <Button 
                className="bg-accent hover:bg-opacity-80 text-white font-bold transition-transform transform hover:scale-105"
                size="lg" 
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-transparent hover:bg-white hover:bg-opacity-20 text-white font-bold border-2 border-white transition-transform transform hover:scale-105"
                onClick={downloadResume}
              >
                Download Resume <Download className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
          <motion.div 
            className="md:w-2/5 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white bg-opacity-10 rounded-full p-2 backdrop-blur-sm">
              <motion.div 
                className="absolute inset-0 border-4 border-accent border-opacity-70 rounded-full"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              ></motion.div>
              <div className="w-full h-full bg-secondary rounded-full overflow-hidden flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 flex flex-wrap justify-center items-center gap-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="stats-item bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg min-w-[140px]"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl font-bold mb-2">
                {stat.prefix && <span>{stat.prefix}</span>}
                <CountUp 
                  end={stat.value} 
                  duration={2.5} 
                  delay={0.5} 
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                />
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>
              <div className="text-sm uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
