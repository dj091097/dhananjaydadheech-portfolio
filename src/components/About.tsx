import React from 'react';
import { 
  RectangleEllipsis, Phone, MapPin, Linkedin, CheckCircle 
} from 'lucide-react';
import resumeData from '@/data/resume';

const AboutItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  content: string | React.ReactNode;
}> = ({ icon, title, content }) => (
  <div className="contact-info-item flex items-start">
    <div className="icon-box bg-secondary bg-opacity-10 p-3 rounded-lg mr-4">
      {icon}
    </div>
    <div>
      <h4 className="text-sm text-dark font-bold uppercase mb-1">{title}</h4>
      {typeof content === 'string' ? <p className="text-primary">{content}</p> : content}
    </div>
  </div>
);

const About: React.FC = () => {
  const benefits = [
    "Proven track record of improving business metrics",
    "Experience with multiple analytics tools and methodologies",
    "Strategic approach to problem-solving and analysis",
    "Strong communication skills for stakeholder collaboration"
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="section-header mb-12 text-center">
          <h2 className="text-3xl font-heading font-bold mb-2">About Me</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="relative">
              <div className="bg-primary p-8 rounded-lg text-white relative z-10">
                <h3 className="text-2xl font-heading font-bold mb-4">Business Analytics Specialist</h3>
                <p className="mb-4">
                  With ~4 years of analytics experience, I have a proven track record of delivering actionable insights and enhancing customer experience. I'm passionate about transforming complex data into strategic solutions.
                </p>
                <p className="mb-4">
                  My expertise spans across data analysis, machine learning implementation, dashboard creation, and strategic analytics that drive business growth.
                </p>
                <p>
                  I'm eager to adapt and learn while leveraging cutting-edge technologies to solve business challenges and optimize processes.
                </p>
              </div>
              <div className="absolute top-4 left-4 w-full h-full bg-accent rounded-lg -z-10"></div>
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AboutItem 
                icon={<RectangleEllipsis className="text-secondary" />} 
                title="Email" 
                content={resumeData.email}
              />
              
              <AboutItem 
                icon={<Phone className="text-secondary" />} 
                title="Phone" 
                content={resumeData.phone}
              />
              
              <AboutItem 
                icon={<MapPin className="text-secondary" />} 
                title="Location" 
                content={resumeData.location}
              />
              
              <AboutItem 
                icon={<Linkedin className="text-secondary" />} 
                title="LinkedIn" 
                content={
                  <a href={resumeData.linkedin} target="_blank" className="text-secondary hover:underline">
                    Connect with me
                  </a>
                }
              />
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-heading font-bold mb-4">Why Work With Me?</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-success mr-2"><CheckCircle className="h-5 w-5 text-[#2ECC71]" /></span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
