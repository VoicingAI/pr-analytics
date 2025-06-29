export const API_BASE_URL = "https://feature-plivo.demo.voicing.ai/api/v1";

export const FORMATTED_DATE_UI = (timestamp) => {
  if (!timestamp) return "";
  const dateObj = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata"
  };

  const formatted = dateObj.toLocaleString("en-US", options);
  return formatted;
};
