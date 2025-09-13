import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Database, 
  Users, 
  Code, 
  Server, 
  Smartphone, 
  Globe, 
  Settings,
  Zap,
  Shield,
  Cloud,
  Cpu
} from 'lucide-react';

interface ServicesProps {
  onServiceClick?: (serviceName: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onServiceClick }) => {
  const [showAllServices, setShowAllServices] = useState(false);
  
  const allServices = [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Cutting-edge AI solutions, natural language processing, computer vision, and predictive analytics to transform your business.',
      features: ['Custom AI Models', 'NLP Solutions', 'Computer Vision', 'Predictive Analytics'],
      color: 'from-purple-500 to-pink-500',
      featured: true
    },
    {
      icon: Database,
      title: 'SAP Implementation',
      description: 'Full-scale SAP deployment, customization, and optimization for enterprise resource planning and business processes.',
      features: ['SAP S/4HANA', 'SAP Analytics', 'SAP Integration', 'Migration Services'],
      color: 'from-blue-500 to-indigo-600',
      featured: true
    },
    {
      icon: Users,
      title: 'Workday Solutions',
      description: 'Complete Workday implementation for human capital management, financial management, and analytics.',
      features: ['HCM Implementation', 'Financial Management', 'Workday Analytics', 'Integration Hub'],
      color: 'from-green-500 to-teal-500',
      featured: true
    },
    {
      icon: Code,
      title: 'Frontend Development',
      description: 'Modern, responsive web applications using React, Vue, Angular with latest UI/UX trends and performance optimization.',
      features: ['React/Vue/Angular', 'TypeScript', 'PWA Development', 'UI/UX Design'],
      color: 'from-orange-500 to-red-500',
      featured: true
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Scalable backend systems, APIs, microservices architecture, and cloud-native applications for enterprise needs.',
      features: ['Node.js/Python/Java', 'Microservices', 'API Development', 'Database Design'],
      color: 'from-cyan-500 to-blue-500',
      featured: true
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android with seamless user experiences.',
      features: ['React Native', 'Flutter', 'iOS/Android Native', 'App Store Optimization'],
      color: 'from-indigo-500 to-purple-500',
      featured: true
    },
    {
      icon: Globe,
      title: 'Web Applications',
      description: 'Enterprise-grade web applications with modern frameworks, progressive web apps, and cloud deployment.',
      features: ['Full-Stack Development', 'PWA', 'Cloud Deployment', 'Performance Optimization'],
      color: 'from-emerald-500 to-green-500',
      featured: false
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Cloud migration, architecture design, DevOps implementation, and multi-cloud strategies for scalability.',
      features: ['AWS/Azure/GCP', 'Cloud Migration', 'DevOps/CI/CD', 'Container Orchestration'],
      color: 'from-sky-500 to-cyan-500',
      featured: true
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions, vulnerability assessments, and compliance frameworks for data protection.',
      features: ['Security Audits', 'Compliance', 'Threat Detection', 'Data Protection'],
      color: 'from-red-500 to-pink-500',
      featured: false
    },
    {
      icon: Settings,
      title: 'System Integration',
      description: 'Seamless integration of disparate systems, API management, and workflow automation for operational efficiency.',
      features: ['API Integration', 'Workflow Automation', 'Legacy Modernization', 'Data Migration'],
      color: 'from-yellow-500 to-orange-500',
      featured: false
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Application performance tuning, database optimization, and infrastructure scaling for maximum efficiency.',
      features: ['Performance Tuning', 'Database Optimization', 'Load Balancing', 'Caching Strategies'],
      color: 'from-violet-500 to-purple-500',
      featured: false
    },
    {
      icon: Cpu,
      title: 'Data Analysis & BI',
      description: 'Business Intelligence, data analytics, visualization, and reporting solutions to drive data-driven decisions.',
      features: ['Power BI', 'Tableau', 'Data Warehousing', 'Advanced Analytics'],
      color: 'from-emerald-500 to-cyan-500',
      featured: true
    }
  ];

  const services = showAllServices ? allServices : allServices.filter(service => service.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-6">
            Our <span className="text-gradient">Technology Services</span>
          </h2>
          <p className="text-xl font-open-sans text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
            From cutting-edge AI solutions to enterprise systems, we deliver comprehensive technology services 
            that drive digital transformation and business growth.
          </p>
          <p className="text-sm font-open-sans text-gray-500 max-w-2xl mx-auto">
            💡 Click on any service card below to start your project enquiry
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          key={showAllServices ? 'all-services' : 'featured-services'}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={`${service.title}-${index}`}
              id={`service-card-${index}`}
              data-service-name={service.title}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                translateY: -5
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onServiceClick?.(service.title)}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-primary/20"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Click Indicator */}
              <div className="absolute top-4 right-4 bg-primary/10 text-primary p-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              
              <div className="relative p-6">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 font-open-sans mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                      className="flex items-center text-sm text-gray-500"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      {feature}
                    </motion.div>
                  ))}
                </div>

                {/* Get Quote Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <div className="bg-primary text-white px-4 py-2 rounded-lg text-center text-sm font-semibold">
                    Start Project Enquiry →
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Toggle All Services Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAllServices(!showAllServices)}
            className="inline-flex items-center px-8 py-3 bg-primary/10 text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300 border-2 border-primary/20 hover:border-primary"
          >
            {showAllServices ? (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Show Featured Services
              </>
            ) : (
              <>
                View All {allServices.length} Services
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </motion.button>
          <p className="text-sm text-gray-500 mt-2">
            {showAllServices ? 
              `Showing all ${allServices.length} services` : 
              `Showing ${services.length} featured services`
            }
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg font-open-sans text-gray-600 mb-8">
            Ready to transform your business with our technology solutions?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center text-lg"
            onClick={() => onServiceClick?.('General Inquiry')}
          >
            Start Project Inquiry
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;