const apiConfig = {
  // baseUrl: process.env.REACT_APP_API_BASE_URL || "https://backend.chleeserver.synology.me/backend-api-0.0.1-SNAPSHOT",
  baseUrl: process.env.REACT_APP_API_BASE_URL || "http://localhost:7764",
  defaultHeaders: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

if (!apiConfig.baseUrl) {
  console.error("API Base URL is not defined. Please check your environment variables.");
}

export default apiConfig;
