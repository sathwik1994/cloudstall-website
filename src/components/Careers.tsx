import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Filter,
  X,
  ChevronDown,
  Briefcase,
  Star,
  Calendar,
  ArrowLeft,
  ExternalLink,
  Heart
} from 'lucide-react';
import AlertModal from './AlertModal';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  level: 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Executive';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedDate: string;
  featured: boolean;
}

interface CareersProps {
  onBack: () => void;
}

const Careers: React.FC<CareersProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
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

  const [filters, setFilters] = useState({
    department: '',
    location: '',
    type: '',
    level: ''
  });

  // Sample job data
  const jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Warrenville, IL',
      type: 'Full-time',
      level: 'Senior',
      salary: { min: 120000, max: 180000, currency: 'USD' },
      description: 'Join our engineering team to build cutting-edge web applications using modern technologies. You\'ll work on both frontend and backend systems that serve millions of users.',
      requirements: [
        '5+ years of experience in full stack development',
        'Proficiency in React, Node.js, TypeScript',
        'Experience with cloud platforms (AWS, Azure, GCP)',
        'Strong understanding of database design',
        'Experience with microservices architecture'
      ],
      responsibilities: [
        'Design and develop scalable web applications',
        'Collaborate with cross-functional teams',
        'Mentor junior developers',
        'Participate in code reviews and architectural decisions',
        'Optimize application performance and scalability'
      ],
      benefits: [
        'Comprehensive health insurance',
        'Flexible work arrangements',
        '401(k) matching',
        'Professional development budget',
        'Unlimited PTO'
      ],
      postedDate: '2024-01-15',
      featured: true
    },
    {
      id: '2',
      title: 'SAP Consultant',
      department: 'Consulting',
      location: 'Remote',
      type: 'Full-time',
      level: 'Mid',
      salary: { min: 90000, max: 130000, currency: 'USD' },
      description: 'Help clients optimize their business processes through SAP implementations. Work with Fortune 500 companies to transform their operations.',
      requirements: [
        '3+ years of SAP implementation experience',
        'SAP S/4HANA certification preferred',
        'Strong business process knowledge',
        'Excellent client communication skills',
        'Experience with SAP modules (FI, CO, MM, SD)'
      ],
      responsibilities: [
        'Lead SAP implementation projects',
        'Analyze business requirements',
        'Configure SAP modules',
        'Train end users',
        'Provide post-implementation support'
      ],
      benefits: [
        'Health, dental, vision insurance',
        'Remote work flexibility',
        'Travel opportunities',
        'Certification reimbursement',
        'Performance bonuses'
      ],
      postedDate: '2024-01-10',
      featured: true
    },
    {
      id: '3',
      title: 'AI/ML Engineer',
      department: 'AI & Data Science',
      location: 'Warrenville, IL',
      type: 'Full-time',
      level: 'Senior',
      salary: { min: 140000, max: 200000, currency: 'USD' },
      description: 'Build and deploy machine learning models at scale. Work on cutting-edge AI solutions for enterprise clients.',
      requirements: [
        'PhD or Masters in Computer Science, AI, or related field',
        'Experience with TensorFlow, PyTorch, or similar',
        'Strong Python programming skills',
        'Experience with MLOps and model deployment',
        'Knowledge of deep learning architectures'
      ],
      responsibilities: [
        'Design and implement ML algorithms',
        'Deploy models to production',
        'Collaborate with data scientists',
        'Optimize model performance',
        'Research new AI techniques'
      ],
      benefits: [
        'Competitive salary and equity',
        'Research time allocation',
        'Conference attendance budget',
        'State-of-the-art hardware',
        'Flexible schedule'
      ],
      postedDate: '2024-01-12',
      featured: true
    },
    {
      id: '4',
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      level: 'Mid',
      salary: { min: 75000, max: 110000, currency: 'USD' },
      description: 'Create beautiful and intuitive user experiences for our web and mobile applications. Work closely with development teams to bring designs to life.',
      requirements: [
        '3+ years of UI/UX design experience',
        'Proficiency in Figma, Sketch, Adobe Creative Suite',
        'Strong portfolio demonstrating design skills',
        'Experience with design systems',
        'Understanding of frontend development'
      ],
      responsibilities: [
        'Create wireframes and prototypes',
        'Design user interfaces for web and mobile',
        'Conduct user research and testing',
        'Collaborate with developers',
        'Maintain design system'
      ],
      benefits: [
        'Creative freedom and autonomy',
        'Design tool subscriptions',
        'Work from home stipend',
        'Professional development',
        'Flexible working hours'
      ],
      postedDate: '2024-01-08',
      featured: false
    },
    {
      id: '5',
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Warrenville, IL',
      type: 'Full-time',
      level: 'Mid',
      salary: { min: 100000, max: 150000, currency: 'USD' },
      description: 'Build and maintain CI/CD pipelines, manage cloud infrastructure, and ensure high availability of our systems.',
      requirements: [
        '4+ years of DevOps experience',
        'Experience with Docker, Kubernetes',
        'Knowledge of AWS/Azure/GCP',
        'Proficiency in scripting (Python, Bash)',
        'Experience with monitoring tools'
      ],
      responsibilities: [
        'Manage cloud infrastructure',
        'Build CI/CD pipelines',
        'Monitor system performance',
        'Automate deployment processes',
        'Ensure security best practices'
      ],
      benefits: [
        'Comprehensive benefits package',
        'On-call compensation',
        'Cloud certification support',
        'Home office setup budget',
        'Stock options'
      ],
      postedDate: '2024-01-05',
      featured: false
    },
    {
      id: '6',
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      level: 'Senior',
      salary: { min: 130000, max: 170000, currency: 'USD' },
      description: 'Lead product strategy and roadmap for our enterprise software solutions. Work cross-functionally to deliver exceptional products.',
      requirements: [
        '5+ years of product management experience',
        'Experience with B2B software products',
        'Strong analytical and communication skills',
        'Understanding of agile methodologies',
        'Technical background preferred'
      ],
      responsibilities: [
        'Define product strategy and roadmap',
        'Gather and prioritize requirements',
        'Work with engineering and design teams',
        'Analyze product metrics',
        'Communicate with stakeholders'
      ],
      benefits: [
        'Competitive salary and bonuses',
        'Equity participation',
        'Product management training',
        'Flexible work arrangements',
        'Health and wellness programs'
      ],
      postedDate: '2024-01-03',
      featured: false
    }
  ];

  const departments = Array.from(new Set(jobs.map(job => job.department)));
  const locations = Array.from(new Set(jobs.map(job => job.location)));
  const types = Array.from(new Set(jobs.map(job => job.type)));
  const levels = Array.from(new Set(jobs.map(job => job.level)));

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = !filters.department || job.department === filters.department;
      const matchesLocation = !filters.location || job.location === filters.location;
      const matchesType = !filters.type || job.type === filters.type;
      const matchesLevel = !filters.level || job.level === filters.level;

      return matchesSearch && matchesDepartment && matchesLocation && matchesType && matchesLevel;
    });
  }, [searchTerm, filters, jobs]);

  const showAlert = (title: string, message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    setAlertModal({ isOpen: true, title, message, type });
  };

  const closeAlert = () => {
    setAlertModal(prev => ({ ...prev, isOpen: false }));
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const clearFilters = () => {
    setFilters({
      department: '',
      location: '',
      type: '',
      level: ''
    });
  };

  const formatSalary = (salary: Job['salary']) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: salary.currency,
      maximumFractionDigits: 0
    });
    return `${formatter.format(salary.min)} - ${formatter.format(salary.max)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (selectedJob) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8 py-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedJob(null)}
            className="flex items-center space-x-2 text-primary hover:text-primary/80 mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-semibold">Back to Jobs</span>
          </motion.button>

          {/* Job Detail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-4 lg:mb-0">
                  <h1 className="text-3xl font-poppins font-bold mb-2">{selectedJob.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-white/90">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-5 h-5" />
                      <span>{selectedJob.department}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5" />
                      <span>{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>{selectedJob.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>{selectedJob.level} Level</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start lg:items-end space-y-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold">{formatSalary(selectedJob.salary)}</div>
                    <div className="text-white/80">per year</div>
                  </div>
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleSaveJob(selectedJob.id)}
                      className={`p-3 rounded-full transition-all duration-300 ${
                        savedJobs.includes(selectedJob.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${savedJobs.includes(selectedJob.id) ? 'fill-current' : ''}`} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => showAlert('🚀 Apply Now', 'Please send your resume and cover letter to careers@cloudstall.net with the job title in the subject line. We\'ll review your application and get back to you within 5 business days.', 'success')}
                      className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2"
                    >
                      <span>Apply Now</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Description */}
                  <div>
                    <h2 className="text-2xl font-poppins font-semibold mb-4">Job Description</h2>
                    <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <h2 className="text-2xl font-poppins font-semibold mb-4">Responsibilities</h2>
                    <ul className="space-y-2">
                      {selectedJob.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h2 className="text-2xl font-poppins font-semibold mb-4">Requirements</h2>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Benefits */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-poppins font-semibold mb-4">Benefits & Perks</h3>
                    <ul className="space-y-3">
                      {selectedJob.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Job Info */}
                  <div className="bg-primary/5 rounded-xl p-6">
                    <h3 className="text-xl font-poppins font-semibold mb-4">Job Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-primary" />
                        <div>
                          <div className="text-sm text-gray-500">Posted</div>
                          <div className="font-semibold">{formatDate(selectedJob.postedDate)}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <div>
                          <div className="text-sm text-gray-500">Salary Range</div>
                          <div className="font-semibold">{formatSalary(selectedJob.salary)}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => showAlert('🚀 Apply Now', 'Please send your resume and cover letter to careers@cloudstall.net with the job title in the subject line. We\'ll review your application and get back to you within 5 business days.', 'success')}
                    className="w-full btn-primary text-center flex items-center justify-center space-x-2"
                  >
                    <span>Apply for this Position</span>
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <AlertModal
          isOpen={alertModal.isOpen}
          onClose={closeAlert}
          title={alertModal.title}
          message={alertModal.message}
          type={alertModal.type}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 lg:px-8 py-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center space-x-2 text-primary hover:text-primary/80 mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-semibold">Back to Home</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
              Join Our <span className="text-gradient">Team</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Build the future of technology with us. We're looking for passionate individuals 
              who want to make a meaningful impact in the world of enterprise solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-600">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>50+ Team Members</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Remote-First Culture</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-primary" />
                <span>Competitive Benefits</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs by title, department, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
              />
            </div>

            {/* Filter Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                showFilters 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </motion.button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-gray-200 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {/* Department Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                    <select
                      value={filters.department}
                      onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">All Departments</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                    <select
                      value={filters.location}
                      onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">All Locations</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
                    <select
                      value={filters.type}
                      onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">All Types</option>
                      {types.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Level Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level</label>
                    <select
                      value={filters.level}
                      onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">All Levels</option>
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 font-semibold"
                  >
                    <X className="w-4 h-4" />
                    <span>Clear Filters</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredJobs.length}</span> of {jobs.length} positions
            {savedJobs.length > 0 && (
              <span className="ml-4">
                • <span className="font-semibold">{savedJobs.length}</span> saved jobs
              </span>
            )}
          </p>
        </motion.div>

        {/* Job Listings */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.01, y: -2 }}
                onClick={() => setSelectedJob(job)}
                className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                {/* Featured Badge */}
                {job.featured && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    FEATURED
                  </div>
                )}

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 mb-4 lg:mb-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-poppins font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveJob(job.id);
                        }}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          savedJobs.includes(job.id)
                            ? 'text-red-500 bg-red-50'
                            : 'text-gray-400 hover:text-red-500 hover:bg-gray-50'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                      </motion.button>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-3">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4" />
                        <span className="text-sm">{job.department}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{job.level} Level</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {job.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <span className="font-semibold text-green-600">
                          {formatSalary(job.salary)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Posted {formatDate(job.postedDate)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start lg:items-end space-y-2 lg:ml-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJob(job);
                      }}
                      className="btn-primary px-6 py-2"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-poppins font-semibold text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters to find more opportunities.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="btn-primary"
            >
              Clear All Filters
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Alert Modal */}
      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={closeAlert}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
      />
    </div>
  );
};

export default Careers;