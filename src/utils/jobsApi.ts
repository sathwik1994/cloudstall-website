// Google Sheets API for Jobs Data
// This file handles fetching job listings from Google Sheets

export interface Job {
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
  status: 'Active' | 'Inactive';
}

// Google Sheets configuration for jobs
const JOBS_SHEET_ID = process.env.REACT_APP_JOBS_SHEET_ID || 'your-jobs-sheet-id';
const JOBS_SHEET_NAME = 'Jobs'; // Sheet tab name
const JOBS_API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY || 'your-api-key';

// Google Sheets API URL
const getJobsSheetUrl = () => {
  const range = `${JOBS_SHEET_NAME}!A:M`; // Columns A through M
  return `https://sheets.googleapis.com/v4/spreadsheets/${JOBS_SHEET_ID}/values/${range}?key=${JOBS_API_KEY}`;
};

// Parse Google Sheets row data into Job object
const parseJobFromRow = (row: string[], index: number): Job | null => {
  try {
    // Skip if row is empty or doesn't have minimum required fields
    if (!row || row.length < 8 || !row[0] || !row[1]) {
      return null;
    }

    // Parse salary range (format: "120000-180000")
    const salaryRange = row[6]?.split('-') || ['0', '0'];
    const salaryMin = parseInt(salaryRange[0]) || 0;
    const salaryMax = parseInt(salaryRange[1]) || salaryMin;

    // Parse arrays from comma-separated strings
    const requirements = row[8] ? row[8].split('\n').filter(req => req.trim()) : [];
    const responsibilities = row[9] ? row[9].split('\n').filter(resp => resp.trim()) : [];
    const benefits = row[10] ? row[10].split('\n').filter(benefit => benefit.trim()) : [];

    return {
      id: `job-${index}`,
      title: row[0] || '',
      department: row[1] || '',
      location: row[2] || '',
      type: (row[3] as Job['type']) || 'Full-time',
      level: (row[4] as Job['level']) || 'Mid',
      salary: {
        min: salaryMin,
        max: salaryMax,
        currency: 'USD'
      },
      description: row[7] || '',
      requirements,
      responsibilities,
      benefits,
      postedDate: row[11] || new Date().toISOString().split('T')[0],
      featured: row[12]?.toLowerCase() === 'yes' || row[12]?.toLowerCase() === 'true',
      status: (row[13] as Job['status']) || 'Active'
    };
  } catch (error) {
    console.error('Error parsing job row:', error, row);
    return null;
  }
};

// Fetch jobs from Google Sheets
export const fetchJobsFromSheets = async (): Promise<Job[]> => {
  try {
    console.log('Fetching jobs from Google Sheets...');
    
    const response = await fetch(getJobsSheetUrl());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.values || !Array.isArray(data.values)) {
      console.warn('No job data found in Google Sheets');
      return getFallbackJobs();
    }

    // Skip header row (index 0) and parse data rows
    const jobs: Job[] = [];
    for (let i = 1; i < data.values.length; i++) {
      const job = parseJobFromRow(data.values[i], i);
      if (job && job.status === 'Active') {
        jobs.push(job);
      }
    }

    console.log(`Loaded ${jobs.length} active jobs from Google Sheets`);
    return jobs;

  } catch (error) {
    console.error('Error fetching jobs from Google Sheets:', error);
    console.log('Falling back to static job data');
    return getFallbackJobs();
  }
};

// Fallback static jobs data (same as current)
const getFallbackJobs = (): Job[] => {
  return [
    {
      id: 'static-1',
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
      featured: true,
      status: 'Active'
    },
    {
      id: 'static-2',
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
      featured: true,
      status: 'Active'
    },
    {
      id: 'static-3',
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
      featured: true,
      status: 'Active'
    },
    {
      id: 'static-4',
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
      featured: false,
      status: 'Active'
    },
    {
      id: 'static-5',
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
      featured: false,
      status: 'Active'
    },
    {
      id: 'static-6',
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
      featured: false,
      status: 'Active'
    }
  ];
};

// Test connection to Google Sheets
export const testJobsSheetConnection = async (): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    const response = await fetch(getJobsSheetUrl());
    
    if (!response.ok) {
      return {
        success: false,
        message: `HTTP error! status: ${response.status}`
      };
    }
    
    const data = await response.json();
    
    return {
      success: true,
      message: `Successfully connected! Found ${data.values?.length || 0} rows.`,
      data: data.values?.slice(0, 3) // Show first 3 rows for testing
    };
  } catch (error) {
    return {
      success: false,
      message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

export default fetchJobsFromSheets;