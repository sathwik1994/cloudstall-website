import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, MessageSquare, X, Send } from 'lucide-react';
import { submitToGoogleSheets, type FeedbackData } from '../utils/googleSheetsApi';
import { fetchApprovedFeedbacks, convertFeedbackToTestimonial } from '../utils/feedbacksApi';
import AlertModal from './AlertModal';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  rating: number;
  feedback: string;
  project: string;
  location: string;
  submitterType?: string;
}

// Sample testimonials data (moved outside component to prevent dependency issues)
const sampleTestimonials: Testimonial[] = [
    {
      id: 'test-1',
      name: 'Sarah Johnson',
      position: 'CTO',
      company: 'TechFlow Solutions',
      rating: 5,
      feedback: 'Cloudstall transformed our entire SAP infrastructure. Their expertise in S/4HANA implementation was exceptional, and they delivered the project 2 weeks ahead of schedule. The team\'s professionalism and technical depth exceeded our expectations.',
      project: 'SAP S/4HANA Implementation',
      location: 'Chicago, IL',
      submitterType: 'Client'
    },
    {
      id: 'test-2',
      name: 'Michael Chen',
      position: 'VP of Engineering',
      company: 'DataVantage Corp',
      rating: 5,
      feedback: 'The AI/ML solutions developed by Cloudstall have revolutionized our data analytics capabilities. Their custom machine learning models increased our prediction accuracy by 40% and saved us millions in operational costs.',
      project: 'AI/ML Analytics Platform',
      location: 'San Francisco, CA',
      submitterType: 'Client'
    },
    {
      id: 'test-3',
      name: 'Emily Rodriguez',
      position: 'HR Director',
      company: 'GlobalTech Industries',
      rating: 5,
      feedback: 'Our Workday implementation with Cloudstall was seamless. They understood our complex HR requirements and delivered a solution that streamlined our entire human capital management process. Outstanding work!',
      project: 'Workday HCM Implementation',
      location: 'Austin, TX',
      submitterType: 'Client'
    },
    {
      id: 'test-4',
      name: 'David Thompson',
      position: 'IT Manager',
      company: 'RetailMax Solutions',
      rating: 5,
      feedback: 'Cloudstall developed our e-commerce platform from scratch. The web application they built is fast, scalable, and user-friendly. Our online sales increased by 200% after launch. Highly recommended!',
      project: 'E-commerce Web Application',
      location: 'New York, NY',
      submitterType: 'Client'
    },
    {
      id: 'test-5',
      name: 'Lisa Park',
      position: 'CIO',
      company: 'HealthCare Plus',
      rating: 5,
      feedback: 'The mobile app developed by Cloudstall has been a game-changer for our patient engagement. The app is intuitive, secure, and has significantly improved our patient satisfaction scores. Excellent partnership!',
      project: 'Patient Engagement Mobile App',
      location: 'Boston, MA',
      submitterType: 'Client'
    },
    {
      id: 'test-6',
      name: 'James Wilson',
      position: 'Operations Director',
      company: 'Manufacturing Pro',
      rating: 5,
      feedback: 'Cloudstall\'s cloud migration services helped us move our entire infrastructure to AWS with zero downtime. Their DevOps expertise and attention to detail made the transition smooth and cost-effective.',
      project: 'Cloud Migration & DevOps',
      location: 'Detroit, MI',
      submitterType: 'Client'
    }
  ];

const Testimonials: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    rating: 5,
    feedback: '',
    project: '',
    submitterType: 'Client'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info' as 'info' | 'success' | 'warning'
  });
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>([]);
  const [isLoadingFeedbacks, setIsLoadingFeedbacks] = useState(true);

  // Fetch approved feedbacks from Google Sheets on component mount
  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        setIsLoadingFeedbacks(true);
        const approvedFeedbacks = await fetchApprovedFeedbacks();

        // Convert approved feedbacks to testimonial format
        const convertedFeedbacks = approvedFeedbacks.map(convertFeedbackToTestimonial);

        // Combine sample testimonials with approved feedbacks
        const combinedTestimonials = [...sampleTestimonials, ...convertedFeedbacks];

        setAllTestimonials(combinedTestimonials);
        console.log(`Loaded ${convertedFeedbacks.length} approved feedbacks and ${sampleTestimonials.length} sample testimonials`);
      } catch (error) {
        console.error('Error loading feedbacks:', error);
        // Fall back to sample testimonials only
        setAllTestimonials(sampleTestimonials);
      } finally {
        setIsLoadingFeedbacks(false);
      }
    };

    loadFeedbacks();
  }, []); // sampleTestimonials is a constant, safe to exclude

  const testimonials = allTestimonials;

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
  const totalSlides = Math.ceil(testimonials.length / cardsPerView);

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

  // Show alert modal
  const showAlert = (title: string, message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    setAlertModal({
      isOpen: true,
      title,
      message,
      type
    });
  };

  // Close alert modal
  const closeAlert = () => {
    setAlertModal(prev => ({ ...prev, isOpen: false }));
  };


  // Handle feedback form input changes
  const handleFeedbackInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFeedbackForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle star rating click
  const handleRatingClick = (rating: number) => {
    setFeedbackForm(prev => ({
      ...prev,
      rating
    }));
  };

  // Handle feedback form submission
  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare data for Google Sheets
      const feedbackData: FeedbackData = {
        formType: 'feedback',
        name: feedbackForm.name,
        email: feedbackForm.email,
        company: feedbackForm.company,
        position: feedbackForm.position,
        project: feedbackForm.project,
        rating: feedbackForm.rating,
        feedback: feedbackForm.feedback,
        submitterType: feedbackForm.submitterType
      };

      console.log('Submitting feedback data:', feedbackData);

      // Submit to Google Sheets
      const response = await submitToGoogleSheets(feedbackData);

      if (response.success) {
        // Reset form and close modal
        setFeedbackForm({
          name: '',
          email: '',
          company: '',
          position: '',
          rating: 5,
          feedback: '',
          project: '',
          submitterType: 'Client'
        });
        setShowFeedbackModal(false);

        // Show success alert
        showAlert(
          'Feedback Submitted Successfully!',
          'Thank you for your valuable feedback! We appreciate your input and it has been saved successfully. Your feedback helps us improve our services.',
          'success'
        );
      } else {
        throw new Error(response.error || 'Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      showAlert(
        'Submission Failed',
        'Sorry, there was an error submitting your feedback. Please check your internet connection and try again.',
        'warning'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

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
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-xl font-open-sans text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
            Don't just take our word for it. Here's what our clients say about their experience working with Cloudstall.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
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
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  translateY: -5
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 flex-shrink-0 w-80"
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-6 pb-4">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Quote className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center mb-4">
                    <div className="flex space-x-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-600 font-open-sans mb-4 text-sm leading-relaxed text-center line-clamp-4">
                    "{testimonial.feedback.length > 120 ? testimonial.feedback.substring(0, 120) + '...' : testimonial.feedback}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="text-center">
                    {/* Client Details */}
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <h4 className="font-poppins font-semibold text-gray-900 text-base">
                        {testimonial.name}
                      </h4>
                      {testimonial.submitterType && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                          {testimonial.submitterType}
                        </span>
                      )}
                    </div>
                    <p className="text-primary font-medium text-sm">
                      {testimonial.position}
                    </p>
                    <p className="text-gray-600 font-open-sans text-sm mb-2">
                      {testimonial.company}
                    </p>

                    {/* Project Badge */}
                    <div className="bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-xs font-semibold mt-3">
                      {testimonial.project}
                    </div>
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

          {/* Auto-play indicator and loading status */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-500' : 'bg-gray-400'} transition-colors duration-300`}></div>
                <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="text-primary hover:text-primary/80 underline ml-2"
                >
                  {isAutoPlaying ? 'Pause' : 'Resume'}
                </button>
              </div>
              {isLoadingFeedbacks && (
                <div className="flex items-center space-x-2 text-primary">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
                  <span>Loading testimonials...</span>
                </div>
              )}
              {!isLoadingFeedbacks && (
                <div className="text-gray-400">
                  {testimonials.length} testimonials loaded
                </div>
              )}
            </div>
          </div>

          {/* Give Feedback Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-lg font-open-sans text-gray-600 mb-6">
              Have you worked with us? We'd love to hear about your experience!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFeedbackModal(true)}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Give Feedback
            </motion.button>
          </motion.div>
        </div>

        {/* Feedback Modal */}
        <AnimatePresence>
          {showFeedbackModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowFeedbackModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-poppins font-bold text-gray-900">
                    Share Your Feedback
                  </h3>
                  <button
                    onClick={() => setShowFeedbackModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                {/* Feedback Form */}
                <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={feedbackForm.name}
                        onChange={handleFeedbackInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={feedbackForm.email}
                        onChange={handleFeedbackInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Company and Position Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={feedbackForm.company}
                        onChange={handleFeedbackInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={feedbackForm.position}
                        onChange={handleFeedbackInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        placeholder="Your job title"
                      />
                    </div>
                  </div>

                  {/* Submitter Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      You are a *
                    </label>
                    <select
                      name="submitterType"
                      value={feedbackForm.submitterType}
                      onChange={handleFeedbackInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    >
                      <option value="Client">Client</option>
                      <option value="Employee">Employee</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type
                    </label>
                    <select
                      name="project"
                      value={feedbackForm.project}
                      onChange={handleFeedbackInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select project type</option>
                      <option value="SAP Implementation">SAP Implementation</option>
                      <option value="Workday Solutions">Workday Solutions</option>
                      <option value="AI/ML Development">AI/ML Development</option>
                      <option value="Web Applications">Web Applications</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="Cloud Solutions">Cloud Solutions</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Overall Rating *
                    </label>
                    <div className="flex space-x-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleRatingClick(index + 1)}
                          className="transition-transform duration-200 hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              index < feedbackForm.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Feedback *
                    </label>
                    <textarea
                      name="feedback"
                      value={feedbackForm.feedback}
                      onChange={handleFeedbackInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us about your experience working with Cloudstall..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg'
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Feedback
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto"
        >
          {[
            { number: '98%', label: 'Client Satisfaction' },
            { number: '150+', label: 'Projects Completed' },
            { number: '50+', label: 'Happy Clients' },
            { number: '24/7', label: 'Support Available' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-poppins font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-open-sans text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div> */}

        {/* Alert Modal */}
        <AlertModal
          isOpen={alertModal.isOpen}
          onClose={closeAlert}
          title={alertModal.title}
          message={alertModal.message}
          type={alertModal.type}
        />
      </div>
    </section>
  );
};

export default Testimonials;