/**
 * Google Sheets API utility functions
 * Handles form submissions to Google Apps Script web app
 */

// Replace this with your Google Apps Script web app URL after deployment
const GOOGLE_APPS_SCRIPT_URL = import.meta.env.REACT_APP_GOOGLE_SHEETS_URL || 'https://script.google.com/macros/s/AKfycbz9KgmpIvAjVLKED98HIWZVN0-EsFL5xOn4ehqYDw1DLFqFlUepLi_zzqNeMDrWEAK-/exec';

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

export type FormSubmissionData = ContactFormData | ProjectInquiryData;

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
  return new Promise((resolve) => {
    console.log('Submitting form data via form method:', data.formType, data);
    
    // Create a hidden form
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = GOOGLE_APPS_SCRIPT_URL;
    form.target = '_blank'; // Open in new tab to see response
    form.style.display = 'none';
    
    // Add form data as hidden inputs
    Object.entries(data).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = Array.isArray(value) ? value.join(', ') : String(value);
      form.appendChild(input);
    });
    
    // Add form to DOM and submit
    document.body.appendChild(form);
    form.submit();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(form);
    }, 1000);
    
    // Since form submission opens in new tab, we assume success
    // In a real implementation, you might want to implement a callback mechanism
    resolve({
      success: true,
      message: 'Form submitted successfully. Check the new tab for confirmation.',
      timestamp: new Date().toISOString(),
      formType: data.formType
    });
  });
}

/**
 * Submit form data to Google Sheets via Google Apps Script
 */
export async function submitToGoogleSheets(data: FormSubmissionData): Promise<SubmissionResponse> {
  try {
    console.log('Submitting form data:', data.formType, data);

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: SubmissionResponse = await response.json();
    
    console.log('Form submission result:', result);
    
    if (!result.success) {
      throw new Error(result.error || 'Unknown error occurred');
    }

    return result;
    
  } catch (error) {
    console.error('Error submitting form to Google Sheets:', error);
    
    // If CORS error, try form submission method
    if (error instanceof Error && (error.message.includes('CORS') || error.message.includes('fetch'))) {
      console.log('CORS error detected, trying form submission method...');
      return submitViaForm(data);
    }
    
    // Return error response in consistent format
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString()
    };
  }
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