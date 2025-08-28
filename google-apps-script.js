/**
 * Google Apps Script for handling Cloudstall website form submissions
 * This script receives form data and saves it to separate Google Sheets
 */

// Configuration - Replace these with your actual Google Sheets IDs
const CONTACT_FORM_SHEET_ID = '1ZoKwQhg0l03hpQgNvNxvQ8sFLF3ndq1r12Swy3207xU';
const PROJECT_INQUIRY_SHEET_ID = '1GnWl1KyT0Dokv-PynfylAhG-l1qDSUeGrvA6VVHdVyU';

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const formType = data.formType;
    
    // Log the submission for debugging
    console.log('Form submission received:', formType, data);
    
    let result;
    
    if (formType === 'contact') {
      result = handleContactForm(data);
    } else if (formType === 'project-inquiry') {
      result = handleProjectInquiry(data);
    } else {
      throw new Error('Invalid form type: ' + formType);
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
        timestamp: new Date().toISOString(),
        ...result
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

function doGet(e) {
  // Handle preflight requests
  return ContentService
    .createTextOutput('Cloudstall Form Handler is running')
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function handleContactForm(data) {
  const sheet = SpreadsheetApp.openById(CONTACT_FORM_SHEET_ID).getActiveSheet();
  
  // Check if headers exist, if not create them
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Company',
      'Message',
      'Source'
    ]);
  }
  
  // Add the data
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.company || '',
    data.message || '',
    'Website Contact Form'
  ]);
  
  return {
    formType: 'contact',
    rowAdded: sheet.getLastRow()
  };
}

function handleProjectInquiry(data) {
  const sheet = SpreadsheetApp.openById(PROJECT_INQUIRY_SHEET_ID).getActiveSheet();
  
  // Check if headers exist, if not create them
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Company',
      'Website',
      'Primary Service',
      'Project Timeline',
      'Budget Range',
      'Team Size',
      'Additional Technologies',
      'Additional Services',
      'Additional Requirements',
      'Custom Technology',
      'Source'
    ]);
  }
  
  // Add the data
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.company || '',
    data.website || '',
    data.primaryService || '',
    data.timeline || '',
    data.budget || '',
    data.teamSize || '',
    Array.isArray(data.additionalTechnologies) ? data.additionalTechnologies.join(', ') : '',
    Array.isArray(data.additionalServices) ? data.additionalServices.join(', ') : '',
    data.additionalRequirements || '',
    data.customTechnology || '',
    'Website Project Inquiry'
  ]);
  
  return {
    formType: 'project-inquiry',
    rowAdded: sheet.getLastRow()
  };
}

// Test function (you can run this to test the setup)
function testContactForm() {
  const testData = {
    formType: 'contact',
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1234567890',
    company: 'Test Company',
    message: 'This is a test message'
  };
  
  const result = handleContactForm(testData);
  console.log('Test result:', result);
}

function testProjectInquiry() {
  const testData = {
    formType: 'project-inquiry',
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1234567890',
    company: 'Test Company',
    website: 'https://example.com',
    primaryService: 'Web Development',
    timeline: '3-6 months',
    budget: '$10,000 - $25,000',
    teamSize: '5-10 people',
    additionalTechnologies: ['React', 'Node.js'],
    additionalServices: ['SEO Optimization'],
    additionalRequirements: 'Need mobile app too',
    customTechnology: 'Custom CRM integration'
  };
  
  const result = handleProjectInquiry(testData);
  console.log('Test result:', result);
}