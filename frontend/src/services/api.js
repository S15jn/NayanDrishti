import axios from "axios";

const API = axios.create({
  baseURL: "https://jaineyecare.onrender.com/api",
});

/* =========================
   REQUEST INTERCEPTOR
========================= */
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error),
);

/* =========================
   RESPONSE INTERCEPTOR
========================= */
API.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized access");
    }

    return Promise.reject(error);
  },
);

export default API;
