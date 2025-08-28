import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, TrendingUp, Globe } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'Supporting technology implementation for businesses of all sizes with compelling experiences.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Delivering top-tier solutions with cutting-edge technologies and best practices.'
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Building lasting partnerships through dedicated support and personalized service.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Staying ahead with the latest technologies and industry trends to drive growth.'
    }
  ];

  const stats = [
    { number: '5+', label: 'Years of Experience', description: 'Proven track record in technology consulting' },
    { number: '100+', label: 'Successful Projects', description: 'Delivered across various industries and scales' },
    { number: '50+', label: 'Expert Consultants', description: 'Certified professionals in latest technologies' },
    { number: '10+', label: 'Countries Served', description: 'Global reach with local expertise' }
  ];

  return (
    <section id="about" className="py-20 bg-white">
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
            About <span className="text-gradient">Cloudstall</span>
          </h2>
          <p className="text-xl font-open-sans text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a leading technology consultancy firm dedicated to transforming businesses through 
            innovative solutions and cutting-edge implementations.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-6 mx-auto">
              <Eye className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-poppins font-bold text-center text-gray-900 mb-4">
              Our Mission
            </h3>
            
            <p className="text-lg md:text-xl font-open-sans text-center text-gray-700 leading-relaxed max-w-4xl mx-auto">
              "Our mission is to support technology implementation for all sizes and deliver compelling experiences. 
              We bridge the gap between complex technology solutions and business success, ensuring every client 
              achieves their digital transformation goals with confidence and excellence."
            </p>
          </div>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-poppins font-bold text-center text-gray-900 mb-12">
            Our Core Values
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, translateY: -5 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="inline-flex p-4 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                
                <h4 className="text-xl font-poppins font-semibold text-gray-900 mb-2">
                  {value.title}
                </h4>
                
                <p className="font-open-sans text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-poppins font-bold mb-4">
                Trusted by Industry Leaders
              </h3>
              <p className="text-xl font-open-sans opacity-90 max-w-2xl mx-auto">
                Our proven expertise and commitment to excellence have made us a preferred partner 
                for businesses worldwide.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-poppins font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm opacity-80 font-open-sans">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-3xl font-poppins font-bold text-gray-900 mb-8">
            Why Choose Cloudstall?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Globe,
                title: 'Global Expertise',
                description: 'Worldwide experience with local market understanding and 24/7 support across time zones.'
              },
              {
                icon: TrendingUp,
                title: 'Proven Results',
                description: 'Track record of successful implementations with measurable ROI and business transformation.'
              },
              {
                icon: Users,
                title: 'Dedicated Team',
                description: 'Certified experts committed to your success with ongoing support and maintenance.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-6"
              >
                <div className="inline-flex p-3 bg-gradient-to-br from-primary to-secondary rounded-xl mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                
                <h4 className="text-xl font-poppins font-semibold text-gray-900 mb-3">
                  {item.title}
                </h4>
                
                <p className="font-open-sans text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;