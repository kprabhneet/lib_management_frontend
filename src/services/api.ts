import axios from "axios";

const API = axios.create({
  baseURL: "https://lib-management-backend-cu8w.onrender.com/api/",
});

export default API;