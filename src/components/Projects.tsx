import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectModal from './ProjectModal';
import { projectsData } from '@/data/projects';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  icon: string;
  technologies: string[];
  onOpenModal: (id: number) => void;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  id, title, description, icon, technologies, onOpenModal, index
}) => {
  const getIconComponent = () => {
    return (
      <svg className="h-24 w-24 text-secondary" aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d={icon} />
      </svg>
    );
  };

  return (
    <motion.div 
      className="project-card bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      <div className="project-image h-48 bg-secondary bg-opacity-20 flex items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ scale: 0.8, opacity: 0.8 }}
          whileHover={{ 
            scale: 1.1,
            opacity: 1,
            rotate: [0, 5, -5, 0],
            transition: { duration: 0.5 }
          }}
        >
          {getIconComponent()}
        </motion.div>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0"
          whileHover={{ opacity: 0.2 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-heading font-bold mb-2">{title}</h3>
        <p className="text-dark mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, idx) => (
            <motion.span 
              key={idx} 
              className="bg-secondary bg-opacity-10 text-secondary text-xs font-semibold px-2 py-1 rounded"
              whileHover={{ 
                backgroundColor: "rgba(52, 152, 219, 0.3)",
                scale: 1.05
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
        <Button 
          onClick={() => onOpenModal(id)} 
          className="w-full bg-primary text-white group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center w-full">
            View Details <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <motion.span 
            className="absolute inset-0 bg-secondary opacity-0" 
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </Button>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(projectsData[0]);

  const openModal = (id: number) => {
    const project = projectsData.find(p => p.id === id);
    if (project) {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section id="projects" className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <motion.div 
          className="section-header mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-heading font-bold mb-2">Featured Projects</h2>
          <motion.div 
            className="w-0 h-1 bg-accent mx-auto"
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.p 
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Browse through some of my featured analytics projects that have driven business growth and optimization
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.summary}
              icon={project.icon}
              technologies={project.technologies}
              onOpenModal={openModal}
              index={index}
            />
          ))}
        </motion.div>
      </div>
      
      <ProjectModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedProject}
      />
    </section>
  );
};

export default Projects;
