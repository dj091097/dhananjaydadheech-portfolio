import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
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

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  };

  const currentYear = new Date().getFullYear();
  
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <Button 
            variant="outline" 
            className="bg-white text-primary hover:text-accent px-4 py-2 rounded font-bold"
            onClick={downloadResume}
          >
            Download Resume <Download className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <p className="opacity-80 mb-4">&copy; {currentYear} Dhananjay Dadheech. All rights reserved.</p>
        
        <div className="flex flex-wrap items-center justify-center gap-1">
          {navItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <button 
                onClick={() => scrollToSection(item.id)}
                className="text-white hover:text-accent transition"
              >
                {item.label}
              </button>
              {index < navItems.length - 1 && <span className="text-sm">•</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
