/* =========================
   Dream Ladders AI
   script.js
========================= */

/* Global State */
let currentLang = "en";

/* Language Data */
const LANG = {
  en: {
    brandTitle: "Dream Ladders AI",
    heroTitle: "Build Your Dream Home with AI Precision",
    heroText:
      "Instant estimates, expert planning, lead support and trusted civil engineering guidance.",
    estimatorHeading: "AI Construction Estimator",
    chatHeading: "Ask Dream Ladders AI",
    leadHeading: "Get Free Consultation"
  },

  te: {
    brandTitle: "డ్రీమ్ లాడర్స్ AI",
    heroTitle: "AI సహాయంతో మీ కలల ఇంటిని నిర్మించండి",
    heroText:
      "తక్షణ ఖర్చు అంచనా, ప్లానింగ్ సహాయం, ఇంజినీరింగ్ మార్గదర్శకం.",
    estimatorHeading: "AI నిర్మాణ ఖర్చు అంచనా",
    chatHeading: "డ్రీమ్ లాడర్స్ AI ను అడగండి",
    leadHeading: "ఉచిత సంప్రదింపు పొందండి"
  }
};

/* Init */
window.onload = function () {
  updateDashboard();
};

/* =========================
   Language Switch
========================= */
function setLanguage(lang) {
  currentLang = lang;

  document.getElementById("brandTitle").innerText =
    LANG[lang].brandTitle;

  document.getElementById("heroTitle").innerText =
    LANG[lang].heroTitle;

  document.getElementById("heroText").innerText =
    LANG[lang].heroText;

  document.getElementById("estimatorHeading").innerText =
    LANG[lang].estimatorHeading;

  document.getElementById("chatHeading").innerText =
    LANG[lang].chatHeading;

  document.getElementById("leadHeading").innerText =
    LANG[lang].leadHeading;
}

/* =========================
   WhatsApp
========================= */
function openWhatsApp() {
  window.open(
    "https://wa.me/917093218658?text=Hi%20Dream%20Ladders%20AI,%20I%20need%20construction%20support.",
    "_blank"
  );
}

/* =========================
   Scroll
========================= */
function scrollToEstimator() {
  document
    .getElementById("estimatorSection")
    .scrollIntoView({ behavior: "smooth" });
}

/* =========================
   Cost Estimator
========================= */
function estimateCost() {
  const city = document.getElementById("city").value.trim();
  const area =
    parseFloat(document.getElementById("area").value) || 0;

  const floors =
    parseFloat(document.getElementById("floors").value) || 1;

  const quality =
    document.getElementById("quality").value;

  let rate = 2200;

  if (quality === "premium") rate = 2800;
  if (quality === "luxury") rate = 3600;

  const total = area * floors * rate;
  const steel = Math.round(area * floors * 4.2);
  const cement = Math.round(area * floors * 0.45);
  const monthsMin = floors * 4;
  const monthsMax = floors * 6;

  document.getElementById("result").innerText =
    `City: ${city || "N/A"}
Estimated Cost: ₹${total.toLocaleString("en-IN")}
Steel: ${steel} kg
Cement: ${cement} bags
Timeline: ${monthsMin}-${monthsMax} months`;
}

/* =========================
   AI Chat
========================= */
async function askAI() {
  const prompt =
    document.getElementById("chat").value.trim();

  const replyBox = document.getElementById("reply");

  if (!prompt) {
    replyBox.innerText = "Please enter your question.";
    return;
  }

  replyBox.innerText = "Thinking...";

  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "AI",
        prompt: prompt
      })
    });

    const data = await response.json();

    replyBox.innerText =
      data.reply || "No response received.";

  } catch (error) {
    replyBox.innerText =
      "AI service unavailable. Please try again.";
  }
}

/* =========================
   Submit Lead
========================= */
async function submitLead() {
  const name =
    document.getElementById("name").value.trim();

  const phone =
    document.getElementById("phone").value.trim();

  const email =
    document.getElementById("email").value.trim();

  const city =
    document.getElementById("leadCity").value.trim();

  const requirement =
    document.getElementById("requirement").value.trim();

  const msg =
    document.getElementById("leadMessage");

  if (!name || !phone) {
    msg.innerText =
      "Please enter Name and Phone Number.";
    return;
  }

  msg.innerText = "Submitting...";

  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "LEAD",
        name,
        phone,
        email,
        city,
        requirement
      })
    });

    const data = await response.json();

    if (data.status === "success") {
      msg.innerText =
        "Thank you! We will contact you soon.";

      clearLeadForm();
      increaseLeadCount();
    } else {
      msg.innerText =
        "Submission failed. Please retry.";
    }

  } catch (error) {
    msg.innerText =
      "Network error. Please try again.";
  }
}

/* =========================
   Clear Form
========================= */
function clearLeadForm() {
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("leadCity").value = "";
  document.getElementById("requirement").value = "";
}

/* =========================
   Dashboard
========================= */
function updateDashboard() {
  let leads =
    parseInt(localStorage.getItem("dl_leads")) || 0;

  document.getElementById("todayLeads").innerText =
    leads;

  document.getElementById("hotLeads").innerText =
    Math.floor(leads * 0.35);

  document.getElementById("topCity").innerText =
    "Hyderabad";
}

function increaseLeadCount() {
  let leads =
    parseInt(localStorage.getItem("dl_leads")) || 0;

  leads++;

  localStorage.setItem("dl_leads", leads);

  updateDashboard();
}
