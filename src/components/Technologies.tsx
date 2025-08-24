import React from 'react';
import { motion } from 'framer-motion';

const Technologies: React.FC = () => {
  const techCategories = [
    {
      category: 'Frontend Technologies',
      technologies: [
        { name: 'React', logo: '⚛️', description: 'Modern component-based UI library' },
        { name: 'Vue.js', logo: '💚', description: 'Progressive JavaScript framework' },
        { name: 'Angular', logo: '🅰️', description: 'Full-featured web framework' },
        { name: 'TypeScript', logo: '🔷', description: 'Type-safe JavaScript superset' },
        { name: 'Next.js', logo: '▲', description: 'Production-ready React framework' },
        { name: 'Tailwind CSS', logo: '💨', description: 'Utility-first CSS framework' }
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      category: 'Backend Technologies',
      technologies: [
        { name: 'Node.js', logo: '🟢', description: 'JavaScript runtime for server-side' },
        { name: 'Python', logo: '🐍', description: 'Versatile programming language' },
        { name: 'Java', logo: '☕', description: 'Enterprise-grade development' },
        { name: 'Go', logo: '🔵', description: 'Fast and efficient backend language' },
        { name: 'Express.js', logo: '🚀', description: 'Minimal Node.js web framework' },
        { name: 'Django', logo: '🎸', description: 'High-level Python web framework' }
      ],
      color: 'from-green-500 to-emerald-500'
    },
    {
      category: 'Cloud & DevOps',
      technologies: [
        { name: 'AWS', logo: '☁️', description: 'Amazon Web Services platform' },
        { name: 'Azure', logo: '🔷', description: 'Microsoft cloud platform' },
        { name: 'Google Cloud', logo: '☁️', description: 'Google Cloud Platform services' },
        { name: 'Docker', logo: '🐳', description: 'Containerization platform' },
        { name: 'Kubernetes', logo: '⚙️', description: 'Container orchestration system' },
        { name: 'Terraform', logo: '🔧', description: 'Infrastructure as code tool' }
      ],
      color: 'from-purple-500 to-indigo-500'
    },
    {
      category: 'Enterprise Solutions',
      technologies: [
        { name: 'SAP', logo: '💼', description: 'Enterprise resource planning' },
        { name: 'Workday', logo: '👥', description: 'Human capital management' },
        { name: 'Salesforce', logo: '☁️', description: 'Customer relationship management' },
        { name: 'Oracle', logo: '🔴', description: 'Database and enterprise solutions' },
        { name: 'Microsoft 365', logo: '📊', description: 'Productivity and collaboration suite' },
        { name: 'ServiceNow', logo: '⚡', description: 'Digital workflow platform' }
      ],
      color: 'from-orange-500 to-red-500'
    },
    {
      category: 'AI & Data Science',
      technologies: [
        { name: 'TensorFlow', logo: '🧠', description: 'Machine learning framework' },
        { name: 'PyTorch', logo: '🔥', description: 'Deep learning framework' },
        { name: 'OpenAI GPT', logo: '🤖', description: 'Advanced language models' },
        { name: 'Pandas', logo: '🐼', description: 'Data manipulation and analysis' },
        { name: 'Apache Spark', logo: '⚡', description: 'Big data processing engine' },
        { name: 'Elasticsearch', logo: '🔍', description: 'Search and analytics engine' }
      ],
      color: 'from-pink-500 to-rose-500'
    },
    {
      category: 'Mobile Development',
      technologies: [
        { name: 'React Native', logo: '📱', description: 'Cross-platform mobile development' },
        { name: 'Flutter', logo: '💙', description: 'Google\'s UI toolkit for mobile' },
        { name: 'Swift', logo: '🍎', description: 'Native iOS development' },
        { name: 'Kotlin', logo: '🟣', description: 'Modern Android development' },
        { name: 'Xamarin', logo: '🔷', description: 'Microsoft mobile platform' },
        { name: 'Ionic', logo: '⚡', description: 'Hybrid mobile app framework' }
      ],
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

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const techVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <section id="technologies" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
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
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
            Technology <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Stack</span>
          </h2>
          <p className="text-xl font-open-sans text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We leverage cutting-edge technologies and proven frameworks to build scalable, 
            secure, and innovative solutions for modern businesses.
          </p>
        </motion.div>

        {/* Technology Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              id={`tech-category-${categoryIndex}`}
              data-category-name={category.category}
              variants={categoryVariants}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-2">
                  {category.category}
                </h3>
                <div className={`w-24 h-1 bg-gradient-to-r ${category.color} rounded-full mx-auto`}></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {category.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={techIndex}
                    variants={techVariants}
                    whileHover={{ 
                      scale: 1.05, 
                      translateY: -5,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {tech.logo}
                    </div>
                    <h4 className="font-poppins font-semibold text-sm mb-2 group-hover:text-primary transition-colors duration-300">
                      {tech.name}
                    </h4>
                    <p className="font-open-sans text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {tech.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technology Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '50+', label: 'Technologies Mastered' },
              { number: '100%', label: 'Up-to-date Skills' },
              { number: '24/7', label: 'Technology Support' },
              { number: '∞', label: 'Learning & Innovation' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="text-3xl md:text-4xl font-poppins font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-open-sans text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-4">
              Ready to Build with Modern Technologies?
            </h3>
            <p className="text-lg font-open-sans opacity-90 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can leverage these cutting-edge technologies to build 
              your next revolutionary project.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary font-semibold py-3 px-8 rounded-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Your Project
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;