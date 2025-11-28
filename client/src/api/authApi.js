import axios from "axios";
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,   
});

export const loginAPI = (data) => API.post("/login", data);
export const registerAPI = (data) => API.post("/register", data);
