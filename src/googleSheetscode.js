const CONTACT_FORM_SHEET_ID = '1ZoKwQhg0l03hpQgNvNxvQ8sFLF3ndq1r12Swy3207xU';
  const PROJECT_INQUIRY_SHEET_ID = '1GnWl1KyT0Dokv-PynfylAhG-l1qDSUeGrvA6VVHdVyU';
  const FEEDBACK_SHEET_ID = '1UzIwQBH6WgIJlKKzbRM59pnUwcbUg3s12WB79wsymF0';

  function doPost(e) {
    return handleRequest(e);
  }

  function doGet(e) {
    return handleRequest(e);
  }

  function doOptions(e) {
    // Handle preflight CORS requests
    return createCorsResponse('', 'OPTIONS request handled');
  }

  function handleRequest(e) {
    try {
      let data = {};

      // Handle different types of requests
      if (e.postData && e.postData.contents) {
        // Try to parse as JSON first
        try {
          data = JSON.parse(e.postData.contents);
          console.log('Parsed JSON data:', data);
        } catch (jsonError) {
          // If JSON parsing fails, treat as form data
          console.log('Not JSON, parsing as form data');
          const formData = e.postData.contents;
          const pairs = formData.split('&');

          for (let pair of pairs) {
            const [key, value] = pair.split('=');
            // Replace + with spaces before decoding
            const decodedKey = decodeURIComponent(key.replace(/\+/g, ' '));
            const decodedValue = decodeURIComponent((value || '').replace(/\+/g, ' '));
            data[decodedKey] = decodedValue;
          }
          console.log('Parsed form data:', data);
        }
      } else if (e.parameter) {
        // Handle URL parameters (GET request)
        data = e.parameter;
        console.log('URL parameter data:', data);
      } else {
        throw new Error('No data received');
      }

      let result = { success: false };

      // Handle test requests
      if (data.test) {
        result = {
          success: true,
          message: 'Test successful - Google Apps Script is working!',
          timestamp: new Date().toISOString(),
          receivedData: data
        };
      }
      // Handle contact form
      else if (data.formType === 'contact') {
        result = handleContactForm(data);
      }
      // Handle project inquiry
      else if (data.formType === 'project-inquiry') {
        result = handleProjectInquiry(data);
      }
      // Handle feedback
      else if (data.formType === 'feedback') {
        result = handleFeedback(data);
      }
      else {
        throw new Error('Invalid or missing form type. Received: ' + data.formType);
      }

      return createCorsResponse(result);

    } catch (error) {
      console.error('Error in handleRequest:', error);
      return createCorsResponse({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString()
      });
    }
  }

  function createCorsResponse(data, debugMessage = '') {
    const jsonOutput = typeof data === 'string' ? data : JSON.stringify(data);

    return ContentService
      .createTextOutput(jsonOutput)
      .setMimeType(ContentService.MimeType.JSON);
  }

  function handleContactForm(data) {
    try {
      console.log('Processing contact form:', data);

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
      const newRow = [
        new Date(),
        data.name || '',
        data.email || '',
        data.phone || '',
        data.company || '',
        data.message || '',
        'Website Contact Form'
      ];

      sheet.appendRow(newRow);
      console.log('Contact form data added to sheet, row:', sheet.getLastRow());

      return {
        success: true,
        message: 'Contact form submitted successfully',
        formType: 'contact',
        rowAdded: sheet.getLastRow(),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error in handleContactForm:', error);
      throw new Error('Failed to save contact form: ' + error.toString());
    }
  }

  function handleProjectInquiry(data) {
    try {
      console.log('Processing project inquiry:', data);

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

      // Handle array data that might come as strings
      let additionalTechnologies = data.additionalTechnologies || '';
      if (typeof additionalTechnologies === 'string' && additionalTechnologies.includes(','))
   {
        additionalTechnologies = additionalTechnologies.split(',').map(s => s.trim()).join(',');
      } else if (Array.isArray(additionalTechnologies)) {
        additionalTechnologies = additionalTechnologies.join(', ');
      }

      let additionalServices = data.additionalServices || '';
      if (typeof additionalServices === 'string' && additionalServices.includes(',')) {
        additionalServices = additionalServices.split(',').map(s => s.trim()).join(', ');
      } else if (Array.isArray(additionalServices)) {
        additionalServices = additionalServices.join(', ');
      }

      // Add the data
      const newRow = [
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
        additionalTechnologies,
        additionalServices,
        data.additionalRequirements || '',
        data.customTechnology || '',
        'Website Project Inquiry'
      ];

      sheet.appendRow(newRow);
      console.log('Project inquiry data added to sheet, row:', sheet.getLastRow());

      return {
        success: true,
        message: 'Project inquiry submitted successfully',
        formType: 'project-inquiry',
        rowAdded: sheet.getLastRow(),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error in handleProjectInquiry:', error);
      throw new Error('Failed to save project inquiry: ' + error.toString());
    }
  }

  function handleFeedback(data) {
    try {
      console.log('Processing feedback:', data);

      const sheet = SpreadsheetApp.openById(FEEDBACK_SHEET_ID).getActiveSheet();

      // Check if headers exist, if not create them
      if (sheet.getLastRow() === 0) {
        sheet.appendRow([
          'Timestamp',
          'Name',
          'Email',
          'Company',
          'Position',
          'Project Type',
          'Rating',
          'Feedback',
          'Source',
          'Submitter Type',
          'Approved'
        ]);
      }

      // Add the data
      const newRow = [
        new Date(),
        data.name || '',
        data.email || '',
        data.company || '',
        data.position || '',
        data.project || '',
        data.rating || 5,
        data.feedback || '',
        'Website Feedback Form',
        data.submitterType || 'Client',
        'N' // Default to 'N' for Approved, admin can change to 'Y'
      ];

      sheet.appendRow(newRow);
      console.log('Feedback data added to sheet, row:', sheet.getLastRow());

      return {
        success: true,
        message: 'Feedback submitted successfully',
        formType: 'feedback',
        rowAdded: sheet.getLastRow(),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error in handleFeedback:', error);
      throw new Error('Failed to save feedback: ' + error.toString());
    }
  }

  // Test functions you can run manually
  function testContactFormManually() {
    const testData = {
      formType: 'contact',
      name: 'Manual Test User',
      email: 'manualtest@example.com',
      phone: '+1234567890',
      company: 'Manual Test Company',
      message: 'Manual test from Google Apps Script editor'
    };

    try {
      const result = handleContactForm(testData);
      console.log('Manual contact test result:', result);
      return result;
    } catch (error) {
      console.error('Manual test failed:', error);
      return { success: false, error: error.toString() };
    }
  }

  function testProjectInquiryManually() {
    const testData = {
      formType: 'project-inquiry',
      name: 'Manual Test User',
      email: 'manualtest@example.com',
      phone: '+1234567890',
      company: 'Manual Test Company',
      website: 'https://example.com',
      primaryService: 'Web Development',
      timeline: '3-6 months',
      budget: '$10,000 - $25,000',
      teamSize: '5-10 people',
      additionalTechnologies: 'React, Node.js',
      additionalServices: 'SEO Optimization',
      additionalRequirements: 'Manual test from Google Apps Script editor',
      customTechnology: 'Custom integrations needed'
    };

    try {
      const result = handleProjectInquiry(testData);
      console.log('Manual project inquiry test result:', result);
      return result;
    } catch (error) {
      console.error('Manual test failed:', error);
      return { success: false, error: error.toString() };
    }
  }

  function testFeedbackManually() {
    const testData = {
      formType: 'feedback',
      name: 'Manual Test User',
      email: 'manualtest@example.com',
      company: 'Manual Test Company',
      position: 'Test Manager',
      project: 'Web Applications',
      rating: 5,
      feedback: 'Manual test feedback from Google Apps Script editor. Great service and professional team!',
      submitterType: 'Employee'
    };

    try {
      const result = handleFeedback(testData);
      console.log('Manual feedback test result:', result);
      return result;
    } catch (error) {
      console.error('Manual feedback test failed:', error);
      return { success: false, error: error.toString() };
    }
  }