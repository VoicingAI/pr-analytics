export const API_BASE_URL = "http://staging-pr-voicing-orchestration-service.demo.svc.cluster.local:80";

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
  };

  const formatted = dateObj.toLocaleString("en-US", options);
  return formatted;
};
