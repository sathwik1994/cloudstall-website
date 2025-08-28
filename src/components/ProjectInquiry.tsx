import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Send, 
  CheckCircle, 
  Calendar,
  DollarSign,
  Code,
  Users,
  Target,
  FileText,
  AlertCircle
} from 'lucide-react';
import { submitToGoogleSheets, isValidEmail, isValidPhone, sanitizeFormData, ProjectInquiryData } from '../utils/googleSheetsApi';

interface ProjectInquiryProps {
  selectedService?: string;
  selectedTechnology?: string;
  onBack?: () => void;
}

const ProjectInquiry: React.FC<ProjectInquiryProps> = ({ 
  selectedService, 
  selectedTechnology, 
  onBack 
}) => {
  // Ensure page starts at top on mobile
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    email: '',
    company: '',
    phone: '',
    
    // Project Details
    projectName: '',
    projectDescription: '',
    selectedService: selectedService || '',
    selectedTechnology: selectedTechnology || '',
    additionalTechnologies: [] as string[],
    
    // Requirements
    timeline: '',
    budget: '',
    teamSize: '',
    projectType: '',
    priority: '',
    
    // Specific Needs
    hasExistingSystem: '',
    needsMaintenance: '',
    needsTraining: '',
    additionalServices: [] as string[],
    
    // Additional Info
    additionalRequirements: '',
    customTechnology: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelect = (field: 'additionalTechnologies' | 'additionalServices', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter((item: string) => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    // Validation
    if (!formData.name.trim()) {
      setSubmitError('Please enter your name');
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.trim()) {
      setSubmitError('Please enter your email address');
      setIsSubmitting(false);
      return;
    }

    if (!isValidEmail(formData.email)) {
      setSubmitError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      setSubmitError('Please enter a valid phone number');
      setIsSubmitting(false);
      return;
    }

    if (!formData.projectName.trim()) {
      setSubmitError('Please enter a project name');
      setIsSubmitting(false);
      return;
    }

    if (!formData.projectDescription.trim()) {
      setSubmitError('Please provide a project description');
      setIsSubmitting(false);
      return;
    }

    if (!formData.timeline) {
      setSubmitError('Please select a timeline');
      setIsSubmitting(false);
      return;
    }

    if (!formData.budget) {
      setSubmitError('Please select a budget range');
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare data for Google Sheets
      const submissionData: ProjectInquiryData = sanitizeFormData({
        formType: 'project-inquiry',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        website: formData.website,
        primaryService: formData.primaryService,
        timeline: formData.timeline,
        budget: formData.budget,
        teamSize: formData.teamSize,
        additionalTechnologies: formData.additionalTechnologies,
        additionalServices: formData.additionalServices,
        additionalRequirements: `Project: ${formData.projectName}\n\nDescription: ${formData.projectDescription}\n\nAdditional: ${formData.additionalRequirements}`,
        customTechnology: formData.customTechnology,
      });

      console.log('Submitting project inquiry:', submissionData);

      // Submit to Google Sheets
      const result = await submitToGoogleSheets(submissionData);

      if (result.success) {
        setIsSubmitted(true);
        console.log('Project inquiry submitted successfully:', result);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          if (onBack) {
            onBack();
          }
        }, 5000);
      } else {
        setSubmitError(result.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting project inquiry:', error);
      setSubmitError('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const technologies = [
    'React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'Java',
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes',
    'TensorFlow', 'PyTorch', 'React Native', 'Flutter',
    'PostgreSQL', 'MongoDB', 'MySQL', 'Redis',
    'Workday', 'SAP', 'Data Analysis', 'Power BI', 'Tableau', 'Excel'
  ];

  const additionalServicesList = [
    'UI/UX Design', 'DevOps Setup', 'Quality Assurance', 'Performance Optimization',
    'Security Audit', 'Code Review', 'Documentation', 'Training & Support'
  ];

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-6"
      >
        <div className="text-center max-w-md mx-auto">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">
            Thank You!
          </h2>
          <p className="text-lg font-open-sans text-gray-600 mb-6">
            Your project inquiry has been submitted successfully. Our team will review your requirements and get back to you within 24 hours with a detailed proposal.
          </p>
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-lg">
            <p className="font-semibold">What's Next?</p>
            <p className="text-sm opacity-90">1. Requirements Review (24 hours)</p>
            <p className="text-sm opacity-90">2. Initial Consultation Call</p>
            <p className="text-sm opacity-90">3. Detailed Proposal & Timeline</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Services
            </button>
          )}
          
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
            Project Inquiry
          </h1>
          <p className="text-xl font-open-sans text-gray-600">
            Let's discuss your project requirements and create something amazing together.
          </p>
          
          {(selectedService || selectedTechnology) && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full">
              <Target className="w-4 h-4 mr-2" />
              Interested in: {selectedService || selectedTechnology}
            </div>
          )}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-2xl font-poppins font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2 text-primary" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    placeholder="+1 (630) 828-6620"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div>
              <h3 className="text-2xl font-poppins font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-primary" />
                Project Details
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    required
                    value={formData.projectName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    placeholder="E-commerce Platform, Mobile App, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    name="projectDescription"
                    required
                    rows={4}
                    value={formData.projectDescription}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    placeholder="Describe your project goals, target audience, and key features..."
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Service Needed
                    </label>
                    <select
                      name="selectedService"
                      value={formData.selectedService}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    >
                      <option value="">Select a service</option>
                      <option value="AI & Machine Learning">AI & Machine Learning</option>
                      <option value="SAP Implementation">SAP Implementation</option>
                      <option value="Workday Solutions">Workday Solutions</option>
                      <option value="Data Analysis & BI">Data Analysis & BI</option>
                      <option value="Cloud Solutions">Cloud Solutions</option>
                      <option value="Mobile Development">Mobile Development</option>
                      <option value="Web Applications">Web Applications</option>
                      <option value="System Integration">System Integration</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    >
                      <option value="">Select project type</option>
                      <option value="New Development">New Development</option>
                      <option value="System Upgrade">System Upgrade</option>
                      <option value="Migration">Migration</option>
                      <option value="Integration">Integration</option>
                      <option value="Maintenance & Support">Maintenance & Support</option>
                      <option value="Consulting">Consulting</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-2xl font-poppins font-semibold text-gray-900 mb-4 flex items-center">
                <Code className="w-6 h-6 mr-2 text-primary" />
                Technology Requirements
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-600 mb-4">Select all technologies you're interested in or currently use:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {technologies.map((tech) => (
                      <label
                        key={tech}
                        className="flex items-center space-x-2 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={formData.additionalTechnologies.includes(tech)}
                          onChange={() => handleMultiSelect('additionalTechnologies', tech)}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-primary transition-colors duration-300">
                          {tech}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other Technologies (Custom)
                  </label>
                  <input
                    type="text"
                    name="customTechnology"
                    value={formData.customTechnology}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    placeholder="e.g., Salesforce, Oracle, Dynamics 365, custom frameworks..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Specify any technologies not listed above, separated by commas
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline & Budget */}
            <div>
              <h3 className="text-2xl font-poppins font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-primary" />
                Timeline & Budget
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline *
                  </label>
                  <select
                    name="timeline"
                    required
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                  >
                    <option value="">Select timeline</option>
                    <option value="ASAP (Rush)">ASAP (Rush)</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="12+ months">12+ months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range *
                  </label>
                  <select
                    name="budget"
                    required
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                  >
                    <option value="">Select budget</option>
                    <option value="Under $10K">Under $10K</option>
                    <option value="$10K - $25K">$10K - $25K</option>
                    <option value="$25K - $50K">$25K - $50K</option>
                    <option value="$50K - $100K">$50K - $100K</option>
                    <option value="$100K - $250K">$100K - $250K</option>
                    <option value="$250K+">$250K+</option>
                    <option value="To be discussed">To be discussed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                  >
                    <option value="">Select priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Services */}
            <div>
              <h3 className="text-2xl font-poppins font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="w-6 h-6 mr-2 text-primary" />
                Additional Services
              </h3>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">What additional services do you need?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {additionalServicesList.map((service) => (
                    <label
                      key={service}
                      className="flex items-center space-x-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={formData.additionalServices.includes(service)}
                        onChange={() => handleMultiSelect('additionalServices', service)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-primary transition-colors duration-300">
                        {service}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Current System Questions */}
            <div>
              <h3 className="text-2xl font-poppins font-semibold text-gray-900 mb-4">
                Current Setup
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you have an existing system?
                  </label>
                  <select
                    name="hasExistingSystem"
                    value={formData.hasExistingSystem}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Partially">Partially</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Need ongoing maintenance?
                  </label>
                  <select
                    name="needsMaintenance"
                    value={formData.needsMaintenance}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Maybe">Maybe</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Need team training?
                  </label>
                  <select
                    name="needsTraining"
                    value={formData.needsTraining}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Maybe">Maybe</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Requirements or Questions
              </label>
              <textarea
                name="additionalRequirements"
                rows={4}
                value={formData.additionalRequirements}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                placeholder="Any specific requirements, constraints, or questions you'd like us to know about..."
              ></textarea>
            </div>

            {/* Error Display */}
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center"
              >
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                <p className="text-red-700 text-sm">{submitError}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? {} : { scale: 1.02 }}
              whileTap={isSubmitting ? {} : { scale: 0.98 }}
              className={`w-full font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center text-lg ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Project Inquiry
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectInquiry;