# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for the Cloudstall website forms.

## Overview

The website has 2 forms that will submit data to separate Google Sheets:
1. **ContactForm** - General contact inquiries
2. **ProjectInquiry** - Detailed project requirements

## Step 1: Create Google Sheets

1. Go to [Google Sheets](https://sheets.google.com)
2. Create two new spreadsheets:
   - **Cloudstall Contact Forms**
   - **Cloudstall Project Inquiries**
3. Note down the Sheet IDs from the URLs (the long string between `/d/` and `/edit`)

## Step 2: Set up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project
3. Replace the default code with the content from `google-apps-script.js`
4. Update the Sheet IDs at the top of the script:
   ```javascript
   const CONTACT_FORM_SHEET_ID = 'your_contact_form_sheet_id_here';
   const PROJECT_INQUIRY_SHEET_ID = 'your_project_inquiry_sheet_id_here';
   ```

## Step 3: Deploy the Web App

1. In Google Apps Script, click **Deploy** > **New deployment**
2. Choose type: **Web app**
3. Set execute as: **Me**
4. Set access: **Anyone**
5. Click **Deploy**
6. Copy the web app URL

## Step 4: Configure the Website

1. Create a `.env.local` file in the project root:
   ```
   REACT_APP_GOOGLE_SHEETS_URL=your_web_app_url_here
   ```

2. Or update the URL directly in `src/utils/googleSheetsApi.ts`:
   ```typescript
   const GOOGLE_APPS_SCRIPT_URL = 'your_web_app_url_here';
   ```

## Step 5: Test the Integration

1. Run the website locally: `npm run dev`
2. Fill out and submit both forms
3. Check that data appears in your Google Sheets

## Data Structure

### Contact Form Sheet Columns:
- Timestamp
- Name
- Email
- Phone
- Company
- Message
- Source

### Project Inquiry Sheet Columns:
- Timestamp
- Name
- Email
- Phone
- Company
- Website
- Primary Service
- Project Timeline
- Budget Range
- Team Size
- Additional Technologies
- Additional Services
- Additional Requirements
- Custom Technology
- Source

## Troubleshooting

1. **CORS Errors**: Make sure the web app is deployed with "Anyone" access
2. **Sheet Not Found**: Verify the Sheet IDs are correct
3. **Permission Errors**: Ensure the script has permission to access the sheets

## Security Notes

- The Google Apps Script runs with your permissions
- Form data is sent directly to your Google Sheets
- No sensitive data is stored on the website
- All form submissions are logged with timestamps