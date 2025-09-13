import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import cloudstallLogo from '../assets/cloudstall-logo.png';
import AlertModal from './AlertModal';

interface FooterProps {
  onCareersClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onCareersClick }) => {
  const [isNearTop, setIsNearTop] = useState(true);
  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type?: 'info' | 'success' | 'warning';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Consider "near top" if scrolled less than 20% of viewport height
      setIsNearTop(scrollY < windowHeight * 0.2);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollClick = () => {
    if (isNearTop) {
      // Scroll down to footer section
      window.scrollTo({ 
        top: document.documentElement.scrollHeight, 
        behavior: 'smooth' 
      });
    } else {
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const showAlert = (title: string, message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    setAlertModal({
      isOpen: true,
      title,
      message,
      type
    });
  };

  const closeAlert = () => {
    setAlertModal(prev => ({ ...prev, isOpen: false }));
  };

  const highlightServiceCard = (serviceName: string) => {
    // Find the service card by service name
    const serviceCards = document.querySelectorAll('[data-service-name]');
    serviceCards.forEach((card) => {
      const cardElement = card as HTMLElement;
      if (cardElement.dataset.serviceName === serviceName) {
        // Scroll to the specific card
        cardElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
        
        // Add highlight effect after a short delay
        setTimeout(() => {
          cardElement.style.transform = 'scale(1.05) translateY(-10px)';
          cardElement.style.boxShadow = '0 25px 50px -12px rgba(104, 120, 214, 0.3)';
          cardElement.style.border = '2px solid #6878d6';
          cardElement.style.transition = 'all 0.3s ease';
          
          // Remove highlight after 3 seconds
          setTimeout(() => {
            cardElement.style.transform = '';
            cardElement.style.boxShadow = '';
            cardElement.style.border = '';
          }, 3000);
        }, 200);
      }
    });
  };

  const highlightTechCategory = (techItem: string) => {
    // Map technology items to their categories
    const techMapping: { [key: string]: string } = {
      'React & Angular': 'Frontend Technologies',
      'Node.js & Express': 'Backend Technologies',
      'Python & Django': 'Backend Technologies',
      'AWS & Google Cloud': 'Cloud & DevOps',
      'Docker & Kubernetes': 'Cloud & DevOps',
      'TensorFlow & PyTorch': 'AI & Data Science',
      'React Native & Flutter': 'Mobile Development',
      'PostgreSQL & MongoDB': 'Backend Technologies'
    };

    const targetCategory = techMapping[techItem];
    if (targetCategory) {
      const techCategories = document.querySelectorAll('[data-category-name]');
      techCategories.forEach((category) => {
        const categoryElement = category as HTMLElement;
        if (categoryElement.dataset.categoryName === targetCategory) {
          // Scroll to the specific category
          categoryElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
          
          // Add highlight effect after a short delay
          setTimeout(() => {
            categoryElement.style.transform = 'scale(1.02)';
            categoryElement.style.boxShadow = '0 25px 50px -12px rgba(56, 182, 255, 0.4)';
            categoryElement.style.border = '2px solid #38b6ff';
            categoryElement.style.transition = 'all 0.3s ease';
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
              categoryElement.style.transform = '';
              categoryElement.style.boxShadow = '';
              categoryElement.style.border = '';
            }, 3000);
          }, 200);
        }
      });
    }
  };

  const handleFooterClick = (section: string, item: string) => {
    switch (section) {
      case 'Services': {
        // Map footer service names to actual service card names
        const serviceMapping: { [key: string]: string } = {
          'AI & Machine Learning': 'AI & Machine Learning',
          'SAP Implementation': 'SAP Implementation',
          'Workday Solutions': 'Workday Solutions',
          'Frontend Development': 'Frontend Development',
          'Backend Development': 'Backend Development',
          'Mobile App Development': 'Mobile App Development',
          'Web Applications': 'Web Applications',
          'Cloud Solutions': 'Cloud Solutions',
          'Cybersecurity': 'Cybersecurity',
          'System Integration': 'System Integration',
          'Performance Optimization': 'Performance Optimization',
          'Data Analysis & BI': 'Data Analysis & BI'
        };
        
        const targetService = serviceMapping[item];
        if (targetService) {
          highlightServiceCard(targetService);
        } else {
          // Fallback: scroll to services section if no specific card found
          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      }
      
      case 'Technologies':
        // Directly highlight the technology category (which will also scroll to it)
        highlightTechCategory(item);
        break;
      
      case 'Company':
        if (item === 'About Us') {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        } else if (item === 'Contact') {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        } else if (item === 'Our Team') {
          showAlert('👥 Our Team', 'We have 50+ expert consultants working from our headquarters and remote locations. Meet our team page is coming soon!', 'info');
        } else if (item === 'Careers') {
          if (onCareersClick) {
            onCareersClick();
          } else {
            showAlert('🚀 Careers', 'Join our growing team! We\'re always looking for talented developers and consultants. Send your resume to careers@cloudstall.net', 'success');
          }
        } else if (item === 'Case Studies') {
          showAlert('📊 Case Studies', 'Explore our 500+ successful projects. Detailed case studies are being prepared!', 'info');
        } else if (item === 'Blog') {
          showAlert('📝 Blog', 'Stay tuned for tech insights, tutorials, and industry trends. Our blog is launching soon!', 'info');
        } else if (item === 'News & Events') {
          showAlert('📢 News & Events', 'Follow our latest company updates and upcoming events. Coming soon!', 'info');
        } else if (item === 'Partners') {
          showAlert('🤝 Partners', 'We work with leading technology companies worldwide. Partner directory coming soon!', 'info');
        }
        break;
      
      case 'Resources':
        if (item === 'Support Center') {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        } else if (item === 'Documentation') {
          showAlert('📚 Documentation', 'Comprehensive guides and API documentation are being prepared. Subscribe to our newsletter for updates!', 'info');
        } else if (item === 'API Reference') {
          showAlert('🔧 API Reference', 'Complete API documentation with examples coming soon. Contact us for early access!', 'info');
        } else if (item === 'Community Forum') {
          showAlert('💬 Community Forum', 'Connect with other developers and get support. Forum launching soon!', 'info');
        } else if (item === 'Training') {
          showAlert('🎓 Training', 'Professional training programs on latest technologies. Course catalog coming soon!', 'info');
        } else if (item === 'Certification') {
          showAlert('🏆 Certification', 'Get certified in cutting-edge technologies. Certification program launching soon!', 'warning');
        } else if (item === 'White Papers') {
          showAlert('📄 White Papers', 'In-depth research and industry insights. Technical papers coming soon!', 'info');
        } else if (item === 'Webinars') {
          showAlert('🎥 Webinars', 'Live sessions with our experts. Webinar schedule will be announced soon!', 'info');
        }
        break;
      
      default:
        console.log(`Clicked on: ${section} - ${item}`);
    }
  };

  const footerSections = [
    {
      title: 'Services',
      links: [
        'AI & Machine Learning',
        'SAP Implementation', 
        'Workday Solutions',
        'Frontend Development',
        'Backend Development',
        'Mobile App Development',
        'Web Applications',
        'Cloud Solutions',
        'Cybersecurity',
        'System Integration',
        'Performance Optimization',
        'Data Analysis & BI'
      ]
    },
    // {
    //   title: 'Technologies',
    //   links: [
    //     'React & Angular',
    //     'Node.js & Express',
    //     'Python & Django',
    //     'AWS & Google Cloud',
    //     'Docker & Kubernetes',
    //     'TensorFlow & PyTorch',
    //     'React Native & Flutter',
    //     'PostgreSQL & MongoDB'
    //   ]
    // },
    {
      title: 'Company',
      links: [
        'About Us',
        'Our Team',
        'Careers',
        'Case Studies',
        'Blog',
        'News & Events',
        'Partners',
        'Contact'
      ]
    },
    {
      title: 'Resources',
      links: [
        'Documentation',
        'API Reference',
        'Support Center',
        'Community Forum',
        'Training',
        'Certification',
        'White Papers',
        'Webinars'
      ]
    }
  ];

  // const socialLinks = [
  //   { icon: Linkedin, href: 'https://www.linkedin.com/company/cloudstall-inc/', name: 'LinkedIn' },
  //   { icon: Twitter, href: 'https://twitter.com/cloudstall', name: 'Twitter' },
  //   { icon: Github, href: 'https://github.com/cloudstall', name: 'GitHub' },
  //   { icon: Instagram, href: 'https://instagram.com/cloudstall', name: 'Instagram' }
  // ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 lg:px-8 pt-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              {/* Logo */}
              <div className="mb-6">
                <div 
                  className="relative inline-block cursor-pointer"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <img 
                    src={cloudstallLogo} 
                    alt="Cloudstall Logo" 
                    className="h-30 w-auto object-contain hover:scale-105 transition-transform duration-300"
                    style={{ height: '7.5rem' }}
                  />
                </div>
              </div>

              <p className="font-open-sans text-gray-300 mb-6 leading-relaxed">
                Supporting technology implementation for businesses of all sizes, 
                delivering compelling experiences through innovative solutions and 
                cutting-edge technologies.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="mailto:info@cloudstall.net" className="font-open-sans text-gray-300 hover:text-white transition-colors duration-300">
                    info@cloudstall.net
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="tel:+16308286620" className="font-open-sans text-gray-300 hover:text-white transition-colors duration-300">
                    +1 (630) 828-6620
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-open-sans text-gray-300">
                    27475 Ferry Rd, Warrenville, IL 60555
                  </span>
                </div>
              </div>

              {/* LinkedIn Link */}
              <div className="mt-6">
                <motion.a
                  href="https://www.linkedin.com/company/cloudstall-inc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-3 px-4 py-2 bg-gradient-to-br from-primary to-secondary rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="font-open-sans text-sm">Follow us on LinkedIn</span>
                </motion.a>
              </div>

              {/* Social Links - Moved LinkedIn next to logo */}
              {/* <div className="flex space-x-4 mt-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-primary hover:to-secondary transition-all duration-300"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div> */}
            </motion.div>

            {/* Footer Sections */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (sectionIndex + 1) * 0.1 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <h3 className="text-lg font-poppins font-semibold mb-4 text-white">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleFooterClick(section.title, link);
                        }}
                        className="font-open-sans text-gray-300 hover:text-primary transition-colors duration-300 text-sm text-left w-full hover:underline"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Signup */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-gray-800"
          >
            <div className="max-w-lg mx-auto text-center">
              <h3 className="text-xl font-poppins font-semibold mb-2">
                Stay Updated
              </h3>
              <p className="font-open-sans text-gray-300 mb-4">
                Get the latest insights on technology trends and industry updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white placeholder-gray-400 font-open-sans"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  onClick={() => {
                    alert('Thank you for subscribing! We\'ll keep you updated with the latest tech insights.');
                  }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div> */}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="font-open-sans text-gray-400 text-sm text-center md:text-left">
                © 2024 Cloudstall. All rights reserved. Built with cutting-edge technology.
              </div>
              
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <button 
                  onClick={() => showAlert('🔒 Privacy Policy', 'We respect your privacy and protect your personal information. Full policy document is being prepared.', 'info')}
                  className="font-open-sans text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => showAlert('📋 Terms of Service', 'Our comprehensive terms of service document is being finalized. Contact us for any questions.', 'info')}
                  className="font-open-sans text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline"
                >
                  Terms of Service
                </button>
                <button 
                  onClick={() => showAlert('🍪 Cookie Policy', 'We use essential cookies to improve your experience. Full cookie policy coming soon.', 'info')}
                  className="font-open-sans text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline"
                >
                  Cookie Policy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Scroll Button */}
        <motion.button
          onClick={handleScrollClick}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          title={isNearTop ? "Scroll to Footer" : "Scroll to Top"}
        >
          <motion.div
            key={isNearTop ? 'down' : 'up'}
            initial={{ opacity: 0, rotate: 180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isNearTop ? (
              <ArrowDown className="w-6 h-6 text-white" />
            ) : (
              <ArrowUp className="w-6 h-6 text-white" />
            )}
          </motion.div>
        </motion.button>

        {/* Alert Modal */}
        <AlertModal
          isOpen={alertModal.isOpen}
          onClose={closeAlert}
          title={alertModal.title}
          message={alertModal.message}
          type={alertModal.type}
        />
      </div>
    </footer>
  );
};

export default Footer;