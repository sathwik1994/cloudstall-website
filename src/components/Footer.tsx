import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Github, 
  Instagram,
  ArrowUp
} from 'lucide-react';
import cloudstallLogo from '../assets/cloudstall-logo.png';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          'Cloud Solutions': 'Cloud Solutions',
          'Mobile Development': 'Mobile App Development',
          'Web Applications': 'Web Applications',
          'System Integration': 'System Integration',
          'Cybersecurity': 'Cybersecurity'
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
          alert('👥 Our Team: We have 50+ expert consultants working from our headquarters and remote locations. Meet our team page is coming soon!');
        } else if (item === 'Careers') {
          alert('🚀 Careers: Join our growing team! We\'re always looking for talented developers and consultants. Send your resume to careers@cloudstall.net');
        } else if (item === 'Case Studies') {
          alert('📊 Case Studies: Explore our 500+ successful projects. Detailed case studies are being prepared!');
        } else if (item === 'Blog') {
          alert('📝 Blog: Stay tuned for tech insights, tutorials, and industry trends. Our blog is launching soon!');
        } else if (item === 'News & Events') {
          alert('📢 News & Events: Follow our latest company updates and upcoming events. Coming soon!');
        } else if (item === 'Partners') {
          alert('🤝 Partners: We work with leading technology companies worldwide. Partner directory coming soon!');
        }
        break;
      
      case 'Resources':
        if (item === 'Support Center') {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        } else if (item === 'Documentation') {
          alert('📚 Documentation: Comprehensive guides and API documentation are being prepared. Subscribe to our newsletter for updates!');
        } else if (item === 'API Reference') {
          alert('🔧 API Reference: Complete API documentation with examples coming soon. Contact us for early access!');
        } else if (item === 'Community Forum') {
          alert('💬 Community Forum: Connect with other developers and get support. Forum launching soon!');
        } else if (item === 'Training') {
          alert('🎓 Training: Professional training programs on latest technologies. Course catalog coming soon!');
        } else if (item === 'Certification') {
          alert('🏆 Certification: Get certified in cutting-edge technologies. Certification program launching soon!');
        } else if (item === 'White Papers') {
          alert('📄 White Papers: In-depth research and industry insights. Technical papers coming soon!');
        } else if (item === 'Webinars') {
          alert('🎥 Webinars: Live sessions with our experts. Webinar schedule will be announced soon!');
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
        'Cloud Solutions',
        'Mobile Development',
        'Web Applications',
        'System Integration',
        'Cybersecurity'
      ]
    },
    {
      title: 'Technologies',
      links: [
        'React & Angular',
        'Node.js & Express',
        'Python & Django',
        'AWS & Google Cloud',
        'Docker & Kubernetes',
        'TensorFlow & PyTorch',
        'React Native & Flutter',
        'PostgreSQL & MongoDB'
      ]
    },
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

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/cloudstall-inc/', name: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/cloudstall', name: 'Twitter' },
    { icon: Github, href: 'https://github.com/cloudstall', name: 'GitHub' },
    { icon: Instagram, href: 'https://instagram.com/cloudstall', name: 'Instagram' }
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
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
                <div className="relative inline-block">
                  <img 
                    src={cloudstallLogo} 
                    alt="Cloudstall Logo" 
                    className="h-30 w-auto object-contain"
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

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
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
              </div>
            </motion.div>

            {/* Footer Sections */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (sectionIndex + 1) * 0.1 }}
                viewport={{ once: true }}
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
                  onClick={() => alert('Privacy Policy: We respect your privacy and protect your personal information. Full policy document is being prepared.')}
                  className="font-open-sans text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => alert('Terms of Service: Our comprehensive terms of service document is being finalized. Contact us for any questions.')}
                  className="font-open-sans text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline"
                >
                  Terms of Service
                </button>
                <button 
                  onClick={() => alert('Cookie Policy: We use essential cookies to improve your experience. Full cookie policy coming soon.')}
                  className="font-open-sans text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline"
                >
                  Cookie Policy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        >
          <ArrowUp className="w-6 h-6 text-white" />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;