import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Database,
  Users,
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const allServices = [
    {
      icon: Users,
      title: 'Workday Solutions',
      description: 'Complete Workday implementation for human capital management, financial management, and analytics.',
      features: ['HCM Implementation', 'Financial Management', 'Workday Analytics', 'Integration Hub'],
      color: 'from-green-500 to-teal-500',
      featured: true
    },
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
      icon: Globe,
      title: 'Web Applications',
      description: 'Full-stack web development from responsive frontends to scalable backends, APIs, and enterprise-grade applications.',
      features: ['React/Vue/Angular', 'Node.js/Python/Java', 'Microservices/API Development', 'Database Design'],
      color: 'from-emerald-500 to-green-500',
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
      description: 'Application performance tuning, database optimization & infrastructure scaling for maximum efficiency.',
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

  const services = allServices;

  // Calculate how many cards can fit in viewport (responsive)
  const getCardsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1; // Mobile: 1 card
      if (window.innerWidth < 1024) return 2; // Tablet: 2 cards
      if (window.innerWidth < 1280) return 3; // Desktop: 3 cards
      return 4; // Large desktop: 4 cards
    }
    return 3; // Default
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());
  const totalSlides = Math.ceil(services.length / cardsPerView);

  // Update cards per view on window resize
  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  // Scroll to specific slide
  const scrollToSlide = useCallback((slideIndex: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 320 + 24; // Card width + gap
      const scrollPosition = slideIndex * cardWidth * cardsPerView;
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [cardsPerView]);

  // Handle dot click
  const handleDotClick = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    setIsAutoPlaying(false);
    scrollToSlide(slideIndex);

    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Scroll when currentSlide changes
  useEffect(() => {
    scrollToSlide(currentSlide);
  }, [currentSlide, cardsPerView, scrollToSlide]);

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

        {/* Services Carousel */}
        <div className="relative">

          <motion.div
            ref={scrollContainerRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex overflow-x-auto scrollbar-hide space-x-6 pb-4 px-2"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
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
                className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-primary/20 flex-shrink-0 w-80"
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
              
              <div className="relative p-6 pb-4">
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

              </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDotClick(index)}
                className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-primary scale-110'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {/* Active indicator ring */}
                {currentSlide === index && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -inset-1 rounded-full border-2 border-primary/30"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-500' : 'bg-gray-400'} transition-colors duration-300`}></div>
              <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-primary hover:text-primary/80 underline ml-2"
              >
                {isAutoPlaying ? 'Pause' : 'Resume'}
              </button>
            </div>
          </div>
        </div>


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