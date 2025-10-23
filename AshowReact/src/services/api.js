import axios from "axios";

// 🔹 Garante que todas as requisições enviem cookies por padrão
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "https://localhost:5001/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
