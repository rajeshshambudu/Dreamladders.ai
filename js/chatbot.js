const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

if (chatSend) {
  chatSend.addEventListener("click", async () => {
    const userText = chatInput.value.trim();
    if (!userText) return;

    const userMsg = document.createElement("div");
    userMsg.className = "message user";
    userMsg.textContent = userText;
    chatMessages.appendChild(userMsg);
    chatInput.value = "";

    const response = await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=askGemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userText, context: "engineering" })
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
