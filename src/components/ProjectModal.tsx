import React, { useEffect } from 'react';
import { X, BarChart4, ArrowRight, Zap, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Project } from '@/data/projects';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  // Prevent scrolling of the background when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  // Close modal when clicking outside the content area
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const modalVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 500,
        duration: 0.3 
      }
    },
    exit: { 
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.1,
        duration: 0.5 
      }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
        >
          <motion.div 
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <motion.div 
              className="p-6 bg-primary text-white border-b border-gray-200 sticky top-0 z-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-heading font-bold">{project.title}</h3>
                <motion.button 
                  onClick={onClose} 
                  className="text-white hover:text-accent text-2xl"
                  aria-label="Close modal"
                  whileHover={{ 
                    rotate: 90,
                    scale: 1.1
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X />
                </motion.button>
              </div>
            </motion.div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-132px)]">
              <div className="space-y-6">
                {/* Challenge Section */}
                <motion.div 
                  className="bg-light p-6 rounded-lg"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                >
                  <div className="flex items-center mb-3">
                    <BarChart4 className="text-primary mr-2 h-5 w-5" />
                    <h4 className="font-heading font-bold text-lg">Challenge</h4>
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {project.challenge}
                  </motion.p>
                </motion.div>
                
                {/* Solution Section */}
                <motion.div 
                  className="bg-light p-6 rounded-lg"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  <div className="flex items-center mb-3">
                    <Wrench className="text-primary mr-2 h-5 w-5" />
                    <h4 className="font-heading font-bold text-lg">Solution</h4>
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {project.solution.description}
                  </motion.p>
                  {project.solution.points && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <p className="mt-3 font-medium">The system includes:</p>
                      <ul className="mt-2 space-y-1">
                        {project.solution.points.map((point, idx) => (
                          <motion.li 
                            key={idx} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1, duration: 0.3 }}
                          >
                            <ArrowRight className="text-secondary h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                            <span>{point}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Impact Section */}
                <motion.div 
                  className="bg-light p-6 rounded-lg"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  <div className="flex items-center mb-3">
                    <Zap className="text-primary mr-2 h-5 w-5" />
                    <h4 className="font-heading font-bold text-lg">Impact</h4>
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    {project.impact.description}
                  </motion.p>
                  {project.impact.points && (
                    <ul className="mt-2 space-y-1">
                      {project.impact.points.map((point, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + idx * 0.1, duration: 0.3 }}
                        >
                          <ArrowRight className="text-secondary h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </motion.div>
                
                {/* Technologies Section */}
                <motion.div 
                  className="bg-light p-6 rounded-lg"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                >
                  <h4 className="font-heading font-bold mb-3 text-lg">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <motion.span 
                        key={idx} 
                        className="bg-secondary bg-opacity-10 text-secondary text-xs font-semibold px-3 py-1.5 rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + idx * 0.05, duration: 0.3 }}
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: "rgba(52, 152, 219, 0.3)" 
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-6 flex justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <Button 
                  onClick={onClose}
                  className="bg-primary text-white"
                  size="lg"
                >
                  Close
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
