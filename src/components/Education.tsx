import React from 'react';
import { GraduationCap, School, Award, Medal, ChevronRight } from 'lucide-react';
import resumeData from '@/data/resume';
import { motion } from 'framer-motion';

interface EducationCardProps {
  title: string;
  institution: string;
  year: string;
  grade: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const EducationCard: React.FC<EducationCardProps> = ({ 
  title, institution, year, grade, description, icon, index
}) => {
  return (
    <motion.div 
      className="education-card bg-light rounded-lg p-6 shadow"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      <div className="flex items-start mb-4">
        <motion.div 
          className="education-icon bg-primary text-white rounded-full p-3 mr-4"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, delay: index * 0.2 + 0.3 }}
          whileHover={{ 
            rotate: 360,
            scale: 1.2,
            transition: { duration: 0.5 }
          }}
        >
          {icon}
        </motion.div>
        <div>
          <motion.h3 
            className="text-xl font-heading font-bold"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-secondary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
          >
            {institution}
          </motion.p>
        </div>
      </div>
      <motion.div 
        className="ml-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-dark text-sm">{year}</p>
          <motion.div 
            className="bg-secondary text-white px-3 py-1 rounded text-sm"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(52, 152, 219, 1)"
            }}
          >
            {grade}
          </motion.div>
        </div>
        <p className="text-dark text-sm">{description}</p>
      </motion.div>
    </motion.div>
  );
};

interface AchievementCardProps {
  title: string;
  description: string;
  note: string;
  icon: React.ReactNode;
  index: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ 
  title, description, note, icon, index
}) => {
  return (
    <motion.div 
      className="achievement-card bg-primary text-white rounded-lg p-6 shadow relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Background decorative elements */}
      <motion.div 
        className="absolute top-0 right-0 w-32 h-32 bg-accent rounded-full opacity-10 -mt-16 -mr-16"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.5 + index * 0.2 }}
        animate={{
          scale: [1, 1.2, 1],
          transition: { duration: 4, repeat: Infinity }
        }}
      />
      
      <div className="flex items-start relative z-10">
        <motion.div 
          className="achievement-icon text-accent text-4xl mr-4"
          initial={{ rotate: -90, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
          whileHover={{ 
            rotate: [0, 15, -15, 0],
            scale: 1.2,
            transition: { duration: 0.5 }
          }}
        >
          {icon}
        </motion.div>
        <div>
          <motion.h4 
            className="text-xl font-heading font-bold mb-2"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
          >
            {title}
          </motion.h4>
          <motion.p 
            className="mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
          >
            {description}
          </motion.p>
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 + index * 0.2 }}
          >
            <motion.span 
              className="text-accent mr-2"
              animate={{ 
                scale: [1, 1.2, 1],
                transition: { duration: 2, repeat: Infinity }
              }}
            >
              <Award className="h-4 w-4" />
            </motion.span>
            <span className="text-sm opacity-80">{note}</span>
          </motion.div>
        </div>
      </div>
      
      {/* Subtle arrow indicator on hover */}
      <motion.div 
        className="absolute bottom-4 right-4 text-accent opacity-0"
        whileHover={{ 
          opacity: 1,
          x: [0, 5, 0],
          transition: { duration: 1, repeat: Infinity }
        }}
      >
        <ChevronRight />
      </motion.div>
    </motion.div>
  );
};

const Education: React.FC = () => {
  return (
    <section id="education" className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="section-header mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-heading font-bold mb-2">Education</h2>
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
            Academic foundation that supports my analytical capabilities
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resumeData.education.map((edu, index) => (
            <EducationCard
              key={index}
              title={edu.degree}
              institution={edu.institution}
              year={edu.year}
              grade={edu.grade}
              description={edu.description}
              icon={index === 0 ? <GraduationCap className="text-xl" /> : <School className="text-xl" />}
              index={index}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-2xl font-heading font-bold mb-6 text-center">Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resumeData.achievements.map((achievement, index) => (
              <AchievementCard
                key={index}
                title={achievement.title}
                description={achievement.description}
                note={achievement.note}
                icon={index === 0 ? <Award className="h-8 w-8" /> : <Medal className="h-8 w-8" />}
                index={index}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Additional decorative elements */}
        <motion.div 
          className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary rounded-full opacity-5 hidden md:block"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <motion.div 
          className="absolute -top-16 -right-16 w-64 h-64 bg-accent rounded-full opacity-5 hidden md:block"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>
    </section>
  );
};

export default Education;
