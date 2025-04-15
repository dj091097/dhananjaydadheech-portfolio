import React, { useEffect, useRef, useState } from 'react';
import { 
  Database, ChartPie, Cloud, Target, BadgeDollarSign, 
  Bot, Users, ClipboardCheck, Truck 
} from 'lucide-react';
import Chart from 'chart.js/auto';
import resumeData from '@/data/resume';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

interface SkillCardProps {
  title: string;
  icon: React.ReactNode;
  skills: Array<{ name: string; level: number }>;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, icon, skills, index }) => {
  // Animation variants for the skill bars
  const barVariants = {
    hidden: { width: 0 },
    visible: (i: number) => ({
      width: `${skills[i].level}%`,
      transition: { 
        duration: 1.5,
        delay: 0.2 + (i * 0.1) + (index * 0.3)
      }
    })
  };

  return (
    <motion.div 
      className="skill-card bg-light p-5 rounded-lg shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <motion.h4 
          className="text-lg font-heading font-semibold"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 + (index * 0.2) }}
        >
          {title}
        </motion.h4>
        <motion.div 
          className="text-secondary"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 + (index * 0.2) }}
          whileHover={{ 
            rotate: [0, 10, -10, 0],
            scale: 1.2,
            color: "#3498db",
            transition: { duration: 0.5 }
          }}
        >
          {icon}
        </motion.div>
      </div>
      <div className="space-y-3">
        {skills.map((skill, i) => (
          <div key={i} className="skill-item">
            <div className="flex justify-between mb-1">
              <motion.span 
                className="font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) + (index * 0.2) }}
              >
                {skill.name}
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) + (index * 0.2) }}
              >
                <CountUp 
                  end={skill.level} 
                  duration={2.5} 
                  delay={0.3 + (i * 0.1) + (index * 0.2)} 
                  suffix="%" 
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                />
              </motion.span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div 
                className="bg-secondary h-2.5 rounded-full"
                variants={barVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i} // Pass the index to the animation
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const radarChartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [isChartVisible, setIsChartVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsChartVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (radarChartRef.current) {
      observer.observe(radarChartRef.current);
    }

    return () => {
      if (radarChartRef.current) {
        observer.unobserve(radarChartRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (radarChartRef.current && isChartVisible) {
      // Destroy existing chart if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = radarChartRef.current.getContext('2d');
      if (ctx) {
        // Start with zero values and animate to actual values
        chartInstanceRef.current = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: ['Root Cause Analysis', 'Dashboarding', 'Pricing', 'AB Testing', 'Machine Learning', 'Customer Segmentation'],
            datasets: [{
              label: 'Skill Level',
              data: [0, 0, 0, 0, 0, 0], // Start with zeros
              backgroundColor: 'rgba(52, 152, 219, 0.2)',
              borderColor: 'rgba(52, 152, 219, 1)',
              pointBackgroundColor: 'rgba(52, 152, 219, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
            }]
          },
          options: {
            responsive: true,
            scales: {
              r: {
                angleLines: {
                  display: true
                },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                  stepSize: 20
                }
              }
            },
            animation: {
              duration: 2000
            }
          }
        });

        // Animate to the actual values after a short delay
        setTimeout(() => {
          if (chartInstanceRef.current) {
            chartInstanceRef.current.data.datasets[0].data = [95, 90, 85, 90, 80, 95];
            chartInstanceRef.current.update();
          }
        }, 500);
      }
    }

    // Clean up chart on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [isChartVisible]);

  const analyticalSkills = [
    { icon: <Target size={24} />, name: "Impact Sizing" },
    { icon: <BadgeDollarSign size={24} />, name: "Pricing" },
    { icon: <Bot size={24} />, name: "Machine Learning" },
    { icon: <Users size={24} />, name: "Customer Segmentation" },
    { icon: <ClipboardCheck size={24} />, name: "AB Testing" },
    { icon: <Truck size={24} />, name: "Supply Chain Analytics" }
  ];

  const services = [
    {
      title: "Data Visualization",
      icon: <ChartPie className="h-8 w-8" />,
      description: "Create interactive dashboards and visual reports that transform complex data into actionable insights for business stakeholders."
    },
    {
      title: "Predictive Analytics",
      icon: <Bot className="h-8 w-8" />,
      description: "Develop machine learning models to forecast trends, predict customer behavior, and identify business opportunities."
    },
    {
      title: "Strategic Insights",
      icon: <Target className="h-8 w-8" />,
      description: "Perform in-depth analysis to uncover hidden patterns, optimize business processes, and drive growth through data-driven decisions."
    }
  ];

  return (
    <section id="skills" className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="section-header mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-heading font-bold mb-2">My Skills</h2>
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
            A diverse set of technical and analytical abilities honed through years of professional experience
          </motion.p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row mb-12">
          <motion.div 
            className="lg:w-1/2 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-heading font-bold mb-6 text-center lg:text-left">Technical Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SkillCard 
                title="Data Processing" 
                icon={<Database size={24} />} 
                skills={resumeData.skills.dataProcessing} 
                index={0}
              />
              
              <SkillCard 
                title="Visualization" 
                icon={<ChartPie size={24} />} 
                skills={resumeData.skills.visualization} 
                index={1}
              />
              
              <SkillCard 
                title="Cloud Platforms" 
                icon={<Cloud size={24} />} 
                skills={resumeData.skills.cloudPlatforms} 
                index={2}
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 lg:pl-10"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-heading font-bold mb-6 text-center lg:text-left">Analytical Skills</h3>
            <motion.div 
              className="skills-radar-container bg-light p-5 rounded-lg shadow flex justify-center"
              whileHover={{ 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <canvas ref={radarChartRef} width="300" height="300"></canvas>
            </motion.div>
            
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {analyticalSkills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="bg-light p-4 rounded-lg shadow text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index + 0.5 }}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                  }}
                >
                  <motion.div 
                    className="text-secondary text-2xl mb-2"
                    whileHover={{ 
                      scale: 1.2,
                      rotate: [0, 5, -5, 0],
                      color: "#3498db",
                      transition: { duration: 0.5 }
                    }}
                  >
                    {skill.icon}
                  </motion.div>
                  <h4 className="font-heading font-medium text-sm">{skill.name}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="p-6 bg-primary text-white rounded-lg shadow-md"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xl font-heading font-bold mb-4 text-center">What I Can Do For You</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                className="service-card border border-secondary rounded-lg p-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 * index + 0.3 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                }}
              >
                <motion.div 
                  className="text-accent text-3xl mb-3"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "loop", 
                    duration: 5,
                    delay: index * 0.5
                  }}
                >
                  {service.icon}
                </motion.div>
                <h4 className="text-lg font-heading font-semibold mb-2">{service.title}</h4>
                <p className="text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
