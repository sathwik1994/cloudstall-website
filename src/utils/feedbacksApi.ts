// Google Sheets API for fetching approved feedbacks
// This file handles fetching approved feedback data from Google Sheets

export interface ApprovedFeedback {
  id: string;
  name: string;
  email: string;
  company: string;
  position: string;
  project: string;
  rating: number;
  feedback: string;
  timestamp: string;
  approved: string;
}

// Google Sheets configuration for feedbacks
const FEEDBACKS_SHEET_ID = '1UzIwQBH6WgIJlKKzbRM59pnUwcbUg3s12WB79wsymF0';
const FEEDBACKS_SHEET_NAME = 'Sheet1'; // Default sheet name, adjust if needed
const FEEDBACKS_API_KEY = import.meta.env.REACT_APP_GOOGLE_SHEETS_API_KEY || 'AIzaSyDS2BwnUNjxRfk4yyTDE8ZoxDa_J_zwsB8';

// Google Sheets API URL for reading data
const getFeedbacksSheetUrl = () => {
  const range = `${FEEDBACKS_SHEET_NAME}!A:J`; // Columns A through J (including new Approved column)
  return `https://sheets.googleapis.com/v4/spreadsheets/${FEEDBACKS_SHEET_ID}/values/${range}?key=${FEEDBACKS_API_KEY}`;
};

// Parse Google Sheets row data into ApprovedFeedback object
const parseFeedbackFromRow = (row: string[], index: number): ApprovedFeedback | null => {
  try {
    // Skip if row is empty or doesn't have minimum required fields
    if (!row || row.length < 8 || !row[1] || !row[2]) { // Name and Email are required
      return null;
    }

    // Check if feedback is approved (column J - index 9)
    const approvedValue = row[9]?.toString().trim().toLowerCase();
    if (approvedValue !== 'y' && approvedValue !== 'yes') {
      return null; // Skip non-approved feedbacks
    }

    return {
      id: `feedback-${index}`,
      name: row[1] || '', // Column B
      email: row[2] || '', // Column C
      company: row[3] || '', // Column D
      position: row[4] || '', // Column E
      project: row[5] || '', // Column F
      rating: parseInt(row[6]) || 5, // Column G
      feedback: row[7] || '', // Column H
      timestamp: row[0] || '', // Column A
      approved: row[9] || '' // Column J
    };
  } catch (error) {
    console.error('Error parsing feedback row:', error, row);
    return null;
  }
};

// Fetch approved feedbacks from Google Sheets
export const fetchApprovedFeedbacks = async (): Promise<ApprovedFeedback[]> => {
  try {
    console.log('Fetching approved feedbacks from Google Sheets...');
    console.log('API URL:', getFeedbacksSheetUrl());

    const response = await fetch(getFeedbacksSheetUrl());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.values || !Array.isArray(data.values)) {
      console.warn('No feedback data found in Google Sheets');
      return [];
    }

    // Skip header row (index 0) and parse data rows
    const feedbacks: ApprovedFeedback[] = [];
    for (let i = 1; i < data.values.length; i++) {
      const feedback = parseFeedbackFromRow(data.values[i], i);
      if (feedback) {
        feedbacks.push(feedback);
      }
    }

    console.log(`Loaded ${feedbacks.length} approved feedbacks from Google Sheets`);
    return feedbacks;

  } catch (error) {
    console.error('Error fetching feedbacks from Google Sheets:', error);
    console.log('Returning empty array for feedbacks');
    return [];
  }
};

// Test connection to Google Sheets feedbacks
export const testFeedbacksSheetConnection = async (): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    const response = await fetch(getFeedbacksSheetUrl());

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

// Convert ApprovedFeedback to Testimonial format
export const convertFeedbackToTestimonial = (feedback: ApprovedFeedback): any => {
  // Generate a placeholder image based on name
  const generateImage = (name: string) => {
    const hash = name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const imageNumber = Math.abs(hash % 70) + 1; // Use a range of available avatars
    return `https://i.pravatar.cc/150?img=${imageNumber}`;
  };

  return {
    id: feedback.id,
    name: feedback.name,
    position: feedback.position || 'Client',
    company: feedback.company || 'Valued Client',
    image: generateImage(feedback.name),
    rating: feedback.rating,
    feedback: feedback.feedback,
    project: feedback.project || 'Service',
    location: 'Client Location' // Default location since not captured in feedback
  };
};

export default fetchApprovedFeedbacks;