import React, { useState } from 'react';
import { ChartLine, Search, Code, ChevronDown, ChevronUp } from 'lucide-react';
import resumeData from '@/data/resume';
import { motion } from 'framer-motion';

interface ExperienceItemProps {
  role: string;
  company?: string;
  date: string;
  location: string;
  responsibilities: string[];
  category?: string;
  isFirst?: boolean;
  icon: React.ReactNode;
  index: number;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  role, company, date, location, responsibilities, category, isFirst = false, icon, index
}) => {
  const [expanded, setExpanded] = useState(isFirst);
  
  // Determine which responsibilities to show initially and which on expansion
  const initialResponsibilities = responsibilities.slice(0, isFirst ? 3 : 2);
  const moreResponsibilities = responsibilities.slice(isFirst ? 3 : 2);
  
  // Divide responsibilities for desktop layout
  const halfLength = Math.ceil(responsibilities.length / 2);
  const leftResponsibilities = responsibilities.slice(0, halfLength);
  const rightResponsibilities = responsibilities.slice(halfLength);
  
  // Animation variants for list items
  const listVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5
      }
    })
  };
  
  return (
    <motion.div 
      className="timeline-item mb-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
    >
      <div className="flex flex-col md:flex-row items-center">
        {/* Left side (desktop) / Top (mobile) */}
        <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md relative"
            whileHover={{ 
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            {isFirst && (
              <motion.span 
                className="bg-accent text-white text-xs font-bold uppercase py-1 px-2 rounded absolute top-0 right-0 transform md:translate-y-0 -translate-y-1/2 md:translate-x-0 translate-x-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Current
              </motion.span>
            )}
            <motion.h3 
              className="text-xl font-heading font-bold text-primary mb-2"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {role}
            </motion.h3>
            {category && (
              <motion.p 
                className="text-secondary mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {category}
              </motion.p>
            )}
            <motion.p 
              className="text-dark mb-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {date}
            </motion.p>
            <motion.p 
              className="text-dark mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {location}
            </motion.p>
            
            {/* Mobile view: display expandable list */}
            <div className="md:hidden">
              <ul className="space-y-2 text-left">
                {initialResponsibilities.map((responsibility, idx) => (
                  <motion.li 
                    key={idx} 
                    className="flex"
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={idx}
                  >
                    <span className="text-accent mr-2">•</span>
                    <span>{responsibility}</span>
                  </motion.li>
                ))}
              </ul>
              
              {moreResponsibilities.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.div
                    animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2 text-left mt-2">
                      {moreResponsibilities.map((responsibility, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex"
                          variants={listVariants}
                          initial="hidden"
                          animate={expanded ? "visible" : "hidden"}
                          custom={idx}
                        >
                          <span className="text-accent mr-2">•</span>
                          <span>{responsibility}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  <motion.button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-3 flex items-center text-secondary text-sm font-medium hover:text-primary transition-colors w-full justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {expanded ? (
                      <>Show Less <ChevronUp className="ml-1 h-4 w-4" /></>
                    ) : (
                      <>Show More <ChevronDown className="ml-1 h-4 w-4" /></>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </div>
            
            {/* Desktop view: display left side responsibilities */}
            <div className="hidden md:block">
              <ul className="space-y-2 text-left">
                {leftResponsibilities.map((responsibility, idx) => (
                  <motion.li 
                    key={idx} 
                    className="flex"
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={idx}
                  >
                    <span className="text-accent mr-2">•</span>
                    <span>{responsibility}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* Center timeline and badge */}
        <div className="relative">
          <motion.div 
            className="timeline-badge flex items-center justify-center w-12 h-12 rounded-full bg-primary border-4 border-light z-10 mx-auto md:mx-0"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: index * 0.3 + 0.5
            }}
            whileHover={{ 
              scale: 1.1, 
              boxShadow: "0 0 0 4px rgba(52, 152, 219, 0.3)" 
            }}
          >
            {icon}
          </motion.div>
          
          {/* Connecting lines for mobile */}
          <motion.div 
            className="md:hidden absolute top-12 bottom-0 left-1/2 w-1 bg-primary bg-opacity-20 -z-10 transform -translate-x-1/2"
            initial={{ height: 0 }}
            animate={{ height: "calc(100% - 3rem)" }}
            transition={{ duration: 0.5, delay: index * 0.3 + 0.7 }}
          />
        </div>
        
        {/* Right side (desktop only) */}
        <div className="md:w-1/2 md:pl-12 md:text-left hidden md:block">
          {rightResponsibilities.length > 0 && (
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
              }}
            >
              <h3 className="text-xl font-heading font-bold text-primary mb-2">{role}</h3>
              {category && <p className="text-secondary mb-2">{category === 'Strategic' ? 'Enablement' : category}</p>}
              <p className="text-dark mb-4">{location}</p>
              <ul className="space-y-2">
                {rightResponsibilities.map((responsibility, idx) => (
                  <motion.li 
                    key={idx} 
                    className="flex"
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={idx}
                  >
                    <span className="text-accent mr-2">•</span>
                    <span>{responsibility}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Experience: React.FC = () => {
  const icons = [
    <ChartLine className="text-white" key="chart" />,
    <Search className="text-white" key="search" />,
    <Code className="text-white" key="code" />
  ];

  return (
    <section id="experience" className="py-16 bg-light overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="section-header mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-heading font-bold mb-2">Professional Experience</h2>
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
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A track record of delivering data-driven results in analytics roles
          </motion.p>
        </motion.div>
        
        <div className="timeline relative">
          {/* Timeline center line for desktop */}
          <motion.div 
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary bg-opacity-20"
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          {resumeData.experience.map((exp, index) => (
            <ExperienceItem
              key={index}
              role={exp.role}
              date={exp.date}
              location={exp.location}
              responsibilities={exp.responsibilities}
              category={exp.category}
              isFirst={index === 0}
              icon={icons[index % icons.length]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
