/**
 * Google Apps Script — deploy as Web App (Execute as: Me, Access: Anyone).
 * Create a Sheet with headers: timestamp | name | email | company | service | budget | message
 * Set VITE_GOOGLE_SHEET_URL in .env to the deployed Web App URL.
 */
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  var data = JSON.parse(e.postData.contents)
  sheet.appendRow([
    new Date().toISOString(),
    data.name || '',
    data.email || '',
    data.company || '',
    data.service || '',
    data.budget || '',
    data.message || '',
  ])
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON,
  )
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, method: 'POST required' })).setMimeType(
    ContentService.MimeType.JSON,
  )
}
