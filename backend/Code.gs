function doGet(e) {
  const action = e.parameter.action;
  const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID");

  if (action === "getServices") {
    const industry = e.parameter.industry;
    const data = sheet.getSheetByName("Services").getDataRange().getValues();
    const rows = data.slice(1);
    const filtered = rows.filter(r => r[0] === industry).map(r => [r[1], r[2]]);
    return ContentService.createTextOutput(JSON.stringify(filtered))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  const action = e.parameter.action;
  if (action === "askGemini") {
    const payload = JSON.parse(e.postData.contents);
    const prompt = payload.prompt;
    const context = payload.context;

    const systemContext = `
      You are Dream Ladders AI Assistant.
      Division: ${context}.
      Only answer questions about Dream Ladders services,
