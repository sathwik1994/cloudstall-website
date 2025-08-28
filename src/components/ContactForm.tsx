import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Send, AlertCircle } from 'lucide-react';
import { submitToGoogleSheets, isValidEmail, isValidPhone, sanitizeFormData, testGoogleSheetsConnection, type ContactFormData } from '../utils/googleSheetsApi';

interface ContactFormProps {
  onBack: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onBack }) => {
  // Ensure page starts at top on mobile
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Validate form data
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

    if (!formData.message.trim()) {
      setSubmitError('Please enter your message');
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare data for Google Sheets
      const submissionData: ContactFormData = sanitizeFormData({
        formType: 'contact',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
      });

      console.log('Submitting contact form:', submissionData);
      
      // Debug: Show what we're about to send
      console.log('Form data being sent:', {
        formType: submissionData.formType,
        name: submissionData.name,
        email: submissionData.email,
        phone: submissionData.phone,
        company: submissionData.company,
        message: submissionData.message
      });

      // Submit to Google Sheets
      const result = await submitToGoogleSheets(submissionData);

      if (result.success) {
        setIsSubmitted(true);
        console.log('Contact form submitted successfully:', result);
        
        // Redirect back after 3 seconds
        const redirectDelay = 3000;
        
        setTimeout(() => {
          onBack();
        }, redirectDelay);
      } else {
        setSubmitError(result.error || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitError('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTestSubmission = () => {
    const testData: ContactFormData = {
      formType: 'contact',
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      company: 'Test Company',
      message: 'This is a test message from the debug function'
    };
    
    console.log('Testing with data:', testData);
    testGoogleSheetsConnection(testData);
  };

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
            We've received your message and will get back to you within 24 hours.
          </p>
          <p className="text-sm font-open-sans text-gray-500">
            Redirecting you back to our website...
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300 mr-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Website
            </motion.button>
            <div>
              <h1 className="text-2xl font-poppins font-bold text-gray-900">Contact Us</h1>
              <p className="text-sm font-open-sans text-gray-600">Let's start a conversation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-lg font-open-sans text-gray-600">
                Ready to discuss your next project? We'd love to hear from you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    placeholder="Your Company Name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                  placeholder="Tell us about your project or how we can help you..."
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

              <div className="space-y-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={isSubmitting ? {} : { scale: 1.02 }}
                  whileTap={isSubmitting ? {} : { scale: 0.98 }}
                  className={`w-full font-semibold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed text-white' 
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
                
                {/* Debug button - temporary for testing */}
                <motion.button
                  type="button"
                  onClick={handleTestSubmission}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full font-semibold py-2 px-8 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-all duration-300"
                >
                  🔧 Test Google Sheets Connection (Debug)
                </motion.button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-sm font-open-sans text-gray-500 mb-4">
                Need a detailed project quote?
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="text-primary hover:text-primary/80 font-semibold text-sm transition-colors duration-300"
              >
                Browse our services for detailed project inquiry →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;