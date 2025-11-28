import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",   
});

export const loginAPI = (data) => API.post("/login", data);
export const registerAPI = (data) => API.post("/register", data);
