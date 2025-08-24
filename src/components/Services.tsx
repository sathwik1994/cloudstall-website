import React from 'react';
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

const Services: React.FC = () => {
  const services = [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Cutting-edge AI solutions, natural language processing, computer vision, and predictive analytics to transform your business.',
      features: ['Custom AI Models', 'NLP Solutions', 'Computer Vision', 'Predictive Analytics'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Database,
      title: 'SAP Implementation',
      description: 'Full-scale SAP deployment, customization, and optimization for enterprise resource planning and business processes.',
      features: ['SAP S/4HANA', 'SAP Analytics', 'SAP Integration', 'Migration Services'],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Users,
      title: 'Workday Solutions',
      description: 'Complete Workday implementation for human capital management, financial management, and analytics.',
      features: ['HCM Implementation', 'Financial Management', 'Workday Analytics', 'Integration Hub'],
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Code,
      title: 'Frontend Development',
      description: 'Modern, responsive web applications using React, Vue, Angular with latest UI/UX trends and performance optimization.',
      features: ['React/Vue/Angular', 'TypeScript', 'PWA Development', 'UI/UX Design'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Scalable backend systems, APIs, microservices architecture, and cloud-native applications for enterprise needs.',
      features: ['Node.js/Python/Java', 'Microservices', 'API Development', 'Database Design'],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android with seamless user experiences.',
      features: ['React Native', 'Flutter', 'iOS/Android Native', 'App Store Optimization'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Globe,
      title: 'Web Applications',
      description: 'Enterprise-grade web applications with modern frameworks, progressive web apps, and cloud deployment.',
      features: ['Full-Stack Development', 'PWA', 'Cloud Deployment', 'Performance Optimization'],
      color: 'from-emerald-500 to-green-500'
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Cloud migration, architecture design, DevOps implementation, and multi-cloud strategies for scalability.',
      features: ['AWS/Azure/GCP', 'Cloud Migration', 'DevOps/CI/CD', 'Container Orchestration'],
      color: 'from-sky-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions, vulnerability assessments, and compliance frameworks for data protection.',
      features: ['Security Audits', 'Compliance', 'Threat Detection', 'Data Protection'],
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Settings,
      title: 'System Integration',
      description: 'Seamless integration of disparate systems, API management, and workflow automation for operational efficiency.',
      features: ['API Integration', 'Workflow Automation', 'Legacy Modernization', 'Data Migration'],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Application performance tuning, database optimization, and infrastructure scaling for maximum efficiency.',
      features: ['Performance Tuning', 'Database Optimization', 'Load Balancing', 'Caching Strategies'],
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: Cpu,
      title: 'IoT & Edge Computing',
      description: 'Internet of Things solutions, edge computing implementations, and real-time data processing systems.',
      features: ['IoT Platform Development', 'Edge Computing', 'Real-time Analytics', 'Device Management'],
      color: 'from-teal-500 to-green-500'
    }
  ];

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
          <p className="text-xl font-open-sans text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From cutting-edge AI solutions to enterprise systems, we deliver comprehensive technology services 
            that drive digital transformation and business growth.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              id={`service-card-${index}`}
              data-service-name={service.title}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                translateY: -5
              }}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
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

                {/* Hover Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
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
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get Custom Quote
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