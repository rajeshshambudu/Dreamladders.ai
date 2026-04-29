function doPost(e) {
  const action = e.parameter.action;
  if (action === "askGemini") {
    const payload = JSON.parse(e.postData.contents);
    const prompt = payload.prompt;
    const context = payload.context;

    // Tailored system context per division
    let systemContext = "You are Dream Ladders AI Assistant.";
    if (context === "engineering") {
      systemContext += " Focus only on civil engineering, surveying, interior design, and infrastructure services.";
    } else if (context === "technology") {
      systemContext += " Focus only on software, automation, AI solutions, and CI/CD pipelines.";
    } else if (context === "creative") {
      systemContext += " Focus only on music production, sound design, scoring, and creative services.";
    } else {
      systemContext += " Provide general information about Dream Ladders.";
    }

    const url = "https://api.gemini.google.com/v1/chat";
    const options = {
      method: "post",
      headers: {
        "Authorization": "AIzaSyDnpesDj6Btq1K7DdMYblijEiFE9l5J5sY",
        "Content-Type": "application/json"
      },
      payload: JSON.stringify({
        messages: [
          { role: "system", content: systemContext },
          { role: "user", content: prompt }
        ]
      })
    };

    const res = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(res.getContentText());
    const reply = json?.candidates?.[0]?.content?.[0]?.text || "No response";

    return ContentService.createTextOutput(JSON.stringify({ reply }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
