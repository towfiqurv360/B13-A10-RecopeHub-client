import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: "/api",
  withCredentials: true, 
});