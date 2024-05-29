import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:'https://bookmyshow-b9r1.onrender.com',
  headers: {
    "Content-Type": "application/json",
    "authorization": `Bearer ${localStorage.getItem("token")}`,
  },
});
