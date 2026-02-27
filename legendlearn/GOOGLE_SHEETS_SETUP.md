# Google Sheets Setup Instructions

Follow these steps to set up Google Sheets to receive video request form submissions.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Video Requests" or "LegendLearn Submissions"
4. In the first row (Row 1), add these column headers:
   - **A1**: Timestamp
   - **B1**: Name
   - **C1**: Email
   - **D1**: Phone
   - **E1**: Topic
   - **F1**: Description
   - **G1**: Category

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any default code in the editor
3. Copy and paste this code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Format timestamp
    const timestamp = new Date(data.timestamp).toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles'
    });
    
    // Add the data to the sheet
    sheet.appendRow([
      timestamp,
      data.name,
      data.email,
      data.phone,
      data.topic,
      data.description,
      data.category
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (💾 icon) and give your project a name (e.g., "Video Request Handler")

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type" and choose **Web app**
3. Set the following:
   - **Description**: "Video Request Form Handler" (or any description)
   - **Execute as**: "Me" (your email)
   - **Who has access**: "Anyone" (this allows your website to submit data)
4. Click **Deploy**
5. **IMPORTANT**: You may need to authorize the script:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to [Project Name] (unsafe)" if you see a warning
   - Click "Allow"
6. Copy the **Web App URL** (it will look like: `https://script.google.com/macros/s/.../exec`)

## Step 4: Add URL to Your Website

1. Open `legendlearn/videos.html` in your code editor
2. Find this line (around line 189):
   ```javascript
   const GOOGLE_SCRIPT_URL = ''; // Add your Google Apps Script URL here
   ```
3. Paste your Web App URL between the quotes:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
4. Save the file

## Step 5: Test It!

1. Go to your website's videos page
2. Click "Request a Video"
3. Fill out and submit the form
4. Check your Google Sheet - you should see the submission appear!

## Troubleshooting

- **Form doesn't submit**: Make sure the Web App URL is correct and the script is deployed
- **Data not appearing**: Check that "Who has access" is set to "Anyone"
- **Permission errors**: Make sure you authorized the script in Step 3
- **Still using localStorage**: If the URL is empty, it will fall back to localStorage

## Viewing Submissions

Simply open your Google Sheet to see all video request submissions in real-time. You can:
- Sort and filter the data
- Export to CSV/Excel
- Share with team members
- Set up email notifications (in Google Sheets: Tools → Notification rules)

---

# Setting Up Subscription Form (Optional)

Follow these steps to set up a separate Google Sheet for collecting email/phone subscriptions.

## Step 1: Create a Subscription Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Subscriptions" or "LegendLearn Subscribers"
4. In the first row (Row 1), add these column headers:
   - **A1**: Timestamp
   - **B1**: Email
   - **C1**: Phone

## Step 2: Create Google Apps Script for Subscriptions

1. In your Subscription Google Sheet, click **Extensions** → **Apps Script**
2. Delete any default code in the editor
3. Copy and paste this code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Format timestamp
    const timestamp = new Date(data.timestamp).toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles'
    });
    
    // Add the data to the sheet
    sheet.appendRow([
      timestamp,
      data.email || '',
      data.phone || ''
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** and give your project a name (e.g., "Subscription Handler")

## Step 3: Deploy Subscription Script as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type" and choose **Web app**
3. Set the following:
   - **Description**: "Subscription Form Handler"
   - **Execute as**: "Me" (your email)
   - **Who has access**: "Anyone"
4. Click **Deploy**
5. Authorize the script if prompted
6. Copy the **Web App URL**

## Step 4: Add Subscription URL to Your Website

1. Open `legendlearn/videos.html` in your code editor
2. Find this line (around line 300):
   ```javascript
   const SUBSCRIBE_SCRIPT_URL = ''; // Add your Google Apps Script URL for subscriptions here
   ```
3. Paste your Subscription Web App URL between the quotes:
   ```javascript
   const SUBSCRIBE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
4. Save the file

## Step 5: Test Subscription Form

1. Go to your website's videos page
2. Click the red "Subscribe" button
3. Fill out email and/or phone (at least one is required)
4. Submit the form
5. Check your Subscription Google Sheet - you should see the entry appear!
