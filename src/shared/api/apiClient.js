// shared/api/apiClient.js

import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});