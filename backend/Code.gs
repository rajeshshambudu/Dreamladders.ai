function doGet(e) {
  const action = e.parameter.action;
  const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID");

  if (action === "getServices") {
    const data = sheet.getSheetByName("Services").getDataRange().getValues();
    return ContentService.createTextOutput(JSON.stringify(data.slice(1)))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === "getJobs") {
    const data = sheet.getSheetByName("Careers").getDataRange().getValues();
    return ContentService.createTextOutput(JSON.stringify(data.slice(1)))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID").getSheetByName("Contacts");
  sheet.appendRow([e.parameter.name, e.parameter.email, e.parameter.message, new Date()]);
  return ContentService.createTextOutput("Success");
}
