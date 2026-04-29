/* =========================
   Dream Ladders AI
   config.js
========================= */

/*
IMPORTANT:
Replace the value below with your
Google Apps Script Web App URL
after deployment.

Example:
https://script.google.com/macros/s/AKfycbxxxxxxxxxxxx/exec
*/

const API_BASE_URL =
  "https://script.google.com/macros/s/AKfycbw90SwYoP27h87wTDTC5ZY1gBXdmM7NVlgzWa9jbzO9RWoCOwhfQMnUbzwCXig1A8UnGQ/exec";

/* =========================
   Business Settings
========================= */

const APP_CONFIG = {
  brandName: "Dream Ladders AI",
  tagline: "Smart Construction Starts Here",

  whatsappNumber: "917093218658",
  leadEmail: "dreamladdersservices@gmail.com",

  defaultLanguage: "en",
  currency: "INR",
  country: "India",

  serviceAreas: [
    "Nizamabad",
    "Hyderabad",
    "Warangal",
    "Karimnagar",
    "Telangana",
    "Andhra Pradesh"
  ]
};

/* =========================
   Optional Feature Flags
========================= */

const FEATURES = {
  enableAIChat: true,
  enableLeadCapture: true,
  enableEstimator: true,
  enableDashboard: true,
  enableWhatsApp: true
};

/* =========================
   Notes
========================= */

/*
1. Do NOT put Gemini API key here.
2. Keep Gemini key only inside Apps Script.
3. This file is safe for GitHub hosting.
4. You can later add more settings here.
*/
