function getDivisionContext() {
  // Detect which page we're on by looking at the body class or URL
  if (window.location.href.includes("engineering.html")) return "engineering";
  if (window.location.href.includes("technology.html")) return "technology";
  if (window.location.href.includes("creative.html")) return "creative";
  return "general";
}

const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

if (chatSend) {
  chatSend.addEventListener("click", async () => {
    const userText = chatInput.value.trim();
    if (!userText) return;

    // Show user message
    const userMsg = document.createElement("div");
    userMsg.className = "message user";
    userMsg.textContent = userText;
    chatMessages.appendChild(userMsg);
    chatInput.value = "";

    // Determine context
    const context = getDivisionContext();

    // Call backend proxy
    const response = await fetch("https://script.google.com/macros/s/AKfycbxHHLkh-DaL46YVrk_ZbB02Uy1oaY1VhWNO6jYSBqy6SqZGp_VZE_30vRPeHAjj7fuLjQ/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userText, context })
    });

    const result = await response.json();
    const botReply = result.reply || "Sorry, I couldn’t process that.";

    const botMsg = document.createElement("div");
    botMsg.className = "message bot";
    botMsg.textContent = botReply;
    chatMessages.appendChild(botMsg);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
}
