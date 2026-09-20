import axios from "axios";

const liveServerUrl = "https://b13-assignment-10-server-site.onrender.com/api";
const localServerUrl = "http://localhost:5000/api";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return localServerUrl;
    }
  }
  return process.env.NEXT_PUBLIC_SERVER_URL || liveServerUrl;
};

export const axiosSecure = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true, 
});