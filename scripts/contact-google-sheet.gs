/**
 * Bound to: https://docs.google.com/spreadsheets/d/1uw6S0gMAyNEs3ADqLLOoao3qznASzWCnL7kIkysasV4/
 *
 * Deploy (required for public form):
 * 1. Extensions → Apps Script → Deploy → New deployment → Web app
 * 2. Execute as: Me
 * 3. Who has access: Anyone  ← must NOT be "Anyone with Google account"
 * 4. Copy the /exec URL into VITE_GOOGLE_SHEET_URL
 */
var SPREADSHEET_ID = '1uw6S0gMAyNEs3ADqLLOoao3qznASzWCnL7kIkysasV4'

function doPost(e) {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0]
  var raw = e.postData && e.postData.contents ? e.postData.contents : '{}'
  var data = JSON.parse(raw)
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
