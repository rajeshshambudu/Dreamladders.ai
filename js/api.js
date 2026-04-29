// Generic fetch function for services
async function fetchServices(industry) {
  const url = `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getServices&industry=${industry}`;
  const res = await fetch(url);
  return res.json();
}
