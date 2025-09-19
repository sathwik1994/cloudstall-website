# Dynamic Jobs System - Google Sheets Integration

This guide explains how to set up dynamic job listings using Google Sheets as the data source.

## Overview

The careers page now pulls job data dynamically from Google Sheets instead of using static data. This allows you to easily manage job postings without code changes.

## Setup Instructions

### 1. Create Google Sheets API Credentials

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing one
3. Enable the Google Sheets API
4. Create credentials (API Key)
5. Copy the API key for later use

### 2. Create Your Jobs Google Sheet

1. Create a new Google Sheet
2. Set up columns exactly as shown below (Column A to Column N):

| A | B | C | D | E | F | G | H | I | J | K | L | M | N |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Title | Department | Location | Type | Level | Salary Range | Description | Requirements | Responsibilities | Benefits | Posted Date | Featured | Status |
| Senior Developer | Engineering | Remote | Full-time | Senior | 120000-180000 | Job description here | Req1\nReq2\nReq3 | Resp1\nResp2 | Ben1\nBen2 | 2024-01-15 | yes | Active |

**Column Details:**
- **A (Title)**: Job title
- **B (Department)**: Department name
- **C (Location)**: Job location
- **D (Type)**: Full-time, Part-time, Contract, or Remote
- **E (Level)**: Entry, Mid, Senior, Lead, or Executive
- **F (Salary Range)**: Format: "120000-180000" (min-max)
- **G (Description)**: Job description text
- **H (Requirements)**: Each requirement on new line (use Shift+Enter)
- **I (Responsibilities)**: Each responsibility on new line
- **J (Benefits)**: Each benefit on new line
- **K (Posted Date)**: Format: YYYY-MM-DD
- **L (Featured)**: "yes" or "no" (case insensitive)
- **M (Status)**: "Active" or "Inactive"

### 3. Make Sheet Public

1. Click "Share" button in your Google Sheet
2. Set sharing to "Anyone with the link can view"
3. Copy the sheet ID from the URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in your values:
```env
REACT_APP_GOOGLE_SHEETS_API_KEY=your-actual-api-key
REACT_APP_JOBS_SHEET_ID=your-sheet-id-from-url
```

### 5. Test the Setup

1. Start the development server: `npm run dev`
2. Navigate to the Careers page
3. Click "Test Connection" button to verify setup
4. Use "Refresh Jobs" to reload data from sheets

## Sheet Management Tips

### Adding New Jobs
1. Add a new row with all required columns filled
2. Set Status to "Active" to make it visible
3. Set Featured to "yes" to highlight important positions

### Editing Jobs
1. Update any column directly in the sheet
2. Changes appear immediately on refresh

### Removing Jobs
1. Set Status to "Inactive" to hide without deleting
2. Or delete the entire row

## Troubleshooting

### Common Issues

**Jobs not loading:**
- Check if API key is correct in `.env.local`
- Verify sheet ID matches your Google Sheet
- Ensure sheet is publicly viewable

**Empty job list:**
- Check if any rows have Status = "Active"
- Verify data starts from row 2 (row 1 is headers)
- Check browser console for errors

**Formatting issues:**
- Use exact column order as specified
- Use newline characters (Shift+Enter) for multi-line fields
- Follow date format: YYYY-MM-DD

### Testing Connection

Use the "Test Connection" button on the careers page to verify:
- API key is working
- Sheet ID is correct
- Data is accessible

## API Functions

The system provides several functions in `src/utils/jobsApi.ts`:

- `fetchJobsFromSheets()`: Fetches all active jobs
- `testJobsSheetConnection()`: Tests API connectivity
- `getFallbackJobs()`: Returns static jobs if API fails

## Fallback System

If Google Sheets API fails, the system automatically falls back to static job data to ensure the careers page always works.

## Security Notes

- Never commit `.env.local` to version control
- API key should be restricted to your domain in Google Cloud Console
- Consider using service account for production deployments