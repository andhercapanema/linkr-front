import axios from "axios";

const api = axios.create({
    baseURL: "https://linkr-api-dj08.onrender.com",
});

export default api;
