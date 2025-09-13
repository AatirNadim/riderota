import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.API_URL || "http://lvh.me:4000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosClient;
