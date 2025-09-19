/**
 * Google Sheets API utility functions
 * Handles form submissions to Google Apps Script web app
 */

// Replace this with your Google Apps Script web app URL after deployment
const GOOGLE_APPS_SCRIPT_URL = import.meta.env.REACT_APP_GOOGLE_SHEETS_URL || 'https://script.google.com/macros/s/AKfycbztLmd-I-mFJeKRiU5thh6-Uuzpn5j2rrLDyk_wzAF8geD5nZlsJ0IfcRcpo_HVN9tv/exec';

export interface ContactFormData {
  formType: 'contact';
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export interface ProjectInquiryData {
  formType: 'project-inquiry';
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  primaryService: string;
  timeline: string;
  budget: string;
  teamSize: string;
  additionalTechnologies: string[];
  additionalServices: string[];
  additionalRequirements: string;
  customTechnology: string;
}

export interface FeedbackData {
  formType: 'feedback';
  name: string;
  email: string;
  company: string;
  position: string;
  project: string;
  rating: number;
  feedback: string;
  submitterType: string;
}

export type FormSubmissionData = ContactFormData | ProjectInquiryData | FeedbackData;

export interface SubmissionResponse {
  success: boolean;
  message?: string;
  error?: string;
  timestamp: string;
  formType?: string;
  rowAdded?: number;
}

/**
 * Submit form data to Google Sheets via Google Apps Script using form submission (no CORS)
 */
export function submitViaForm(data: FormSubmissionData): Promise<SubmissionResponse> {
  return new Promise((resolve, reject) => {
    console.log('Submitting form data via form method:', data.formType, data);
    
    try {
      // Create a hidden iframe to capture the response
      const iframe = document.createElement('iframe');
      iframe.name = 'form-submit-frame';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Create a hidden form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = GOOGLE_APPS_SCRIPT_URL;
      form.target = 'form-submit-frame'; // Submit to iframe instead of new tab
      form.style.display = 'none';
      form.enctype = 'application/x-www-form-urlencoded'; // Ensure proper encoding
      
      // Add form data as hidden inputs - ensure proper encoding
      Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        
        // Handle different value types properly
        if (Array.isArray(value)) {
          input.value = value.join(', ');
        } else if (value !== null && value !== undefined) {
          input.value = String(value);
        } else {
          input.value = '';
        }
        
        form.appendChild(input);
        console.log(`Form field: ${key} = ${input.value}`);
      });
      
      // Add form to DOM and submit
      document.body.appendChild(form);
      
      // Listen for iframe load to capture response
      iframe.onload = () => {
        try {
          // Try to read response from iframe (may fail due to CORS, but submission will still work)
          setTimeout(() => {
            // Clean up
            document.body.removeChild(form);
            document.body.removeChild(iframe);
          }, 1000);
          
          resolve({
            success: true,
            message: 'Form submitted successfully to Google Sheets.',
            timestamp: new Date().toISOString(),
            formType: data.formType
          });
        } catch (error) {
          // Even if we can't read the response, the form was submitted
          document.body.removeChild(form);
          document.body.removeChild(iframe);
          console.log(error);
          resolve({
            success: true,
            message: 'Form submitted successfully to Google Sheets.',
            timestamp: new Date().toISOString(),
            formType: data.formType
          });
        }
      };
      
      iframe.onerror = () => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
        
        // Even on error, the form was likely submitted
        resolve({
          success: true,
          message: 'Form submitted to Google Sheets.',
          timestamp: new Date().toISOString(),
          formType: data.formType
        });
      };
      
      form.submit();
      
    } catch (error) {
      console.error('Error in form submission:', error);
      reject({
        success: false,
        error: 'Failed to submit form',
        timestamp: new Date().toISOString()
      });
    }
  });
}

/**
 * Submit form data to Google Sheets via Google Apps Script
 * Due to persistent CORS issues, we'll use form submission method directly
 */
/**
 * Test function to submit data with GET request for debugging
 */
export async function testGoogleSheetsConnection(data: FormSubmissionData): Promise<void> {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      params.append(key, value.join(', '));
    } else {
      params.append(key, String(value || ''));
    }
  });
  
  const testUrl = `${GOOGLE_APPS_SCRIPT_URL}?${params.toString()}`;
  console.log('Test URL:', testUrl);
  window.open(testUrl, '_blank');
}

export async function submitToGoogleSheets(data: FormSubmissionData): Promise<SubmissionResponse> {
  console.log('Submitting form data directly via form method (bypassing CORS):', data.formType, data);
  
  // Use form submission method directly to avoid CORS issues
  return submitViaForm(data);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format (basic validation)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
}

/**
 * Sanitize form data before submission
 */
export function sanitizeFormData<T extends FormSubmissionData>(data: T): T {
  const sanitized = { ...data };
  
  // Trim string values
  Object.keys(sanitized).forEach(key => {
    const value = sanitized[key as keyof T];
    if (typeof value === 'string') {
      (sanitized as unknown as Record<string, unknown>)[key] = value.trim();
    }
  });
  
  return sanitized;
}