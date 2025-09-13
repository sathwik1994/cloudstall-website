import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'info@cloudstall.net',
      link: 'mailto:info@cloudstall.net'
    },
    // {
    //   icon: Phone,
    //   title: 'Call Us',
    //   content: '+1 (630) 828-6620',
    //   link: 'tel:+16308286620'
    // },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '27475 Ferry Rd, Warrenville, IL 60555',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-6">
            Let's Connect and <span className="text-gradient">Discuss Your Needs</span>
          </h2>
          <p className="text-xl font-open-sans text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business? Reach out to our expert team for a free consultation 
            and discover how we can help achieve your technology goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-poppins font-bold text-gray-900 mb-8">
              Get in Touch
            </h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mr-4">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-gray-900 mb-1">
                      {info.title}
                    </h4>
                    <a 
                      href={info.link} 
                      className="font-open-sans text-gray-600 hover:text-primary transition-colors duration-300"
                    >
                      {info.content}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white"
            >
              <h4 className="text-xl font-poppins font-bold mb-4">
                Why Partner with Cloudstall?
              </h4>
              <ul className="space-y-2 font-open-sans">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  Free initial consultation and project assessment
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  24/7 support with dedicated project managers
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  Guaranteed on-time delivery and quality assurance
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  Post-launch support and continuous optimization
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Quick Contact Actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
          >
            <h3 className="text-2xl font-poppins font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h3>

            <div className="space-y-6">
              {/* Email Us Button */}
              <motion.a
                href="mailto:info@cloudstall.net?subject=Project Inquiry&body=Hi, I'm interested in discussing a project with Cloudstall."
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-4 px-6 rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Us Directly
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </motion.a>

              {/* Schedule Call Button */}
              {/* <motion.a
                href="tel:+16308286620"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-primary border-2 border-primary font-semibold py-4 px-6 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center group"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </motion.a> */}

              <div className="text-center py-6">
                <div className="w-full h-px bg-gray-200 relative">
                  <div className="absolute inset-0 flex justify-center">
                    <span className="bg-white px-4 text-gray-500 text-sm font-medium">or</span>
                  </div>
                </div>
              </div>

              {/* Browse Services */}
              <div className="text-center">
                <p className="text-gray-600 font-open-sans mb-4">
                  Need a detailed project quote?
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-primary hover:text-primary/80 font-semibold transition-colors duration-300 inline-flex items-center"
                >
                  Browse Our Services
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform hover:translate-x-1" />
                </motion.button>
              </div>

              {/* Business Hours */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-poppins font-semibold text-gray-900 mb-3">
                  Business Hours
                </h4>
                <div className="space-y-2 text-sm font-open-sans text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 5:00 PM CST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday & Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  * Emergency support available 24/7 for active projects
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;