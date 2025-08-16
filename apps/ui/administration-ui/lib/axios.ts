import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.API_URL || "http://localhost:4000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
