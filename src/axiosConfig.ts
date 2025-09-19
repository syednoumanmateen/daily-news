import axios from "axios";
const apiKey = import.meta.env.VITE_NEWS_API_KEY;

const axiosInstance = axios.create({
    baseURL: "https://newsapi.org/v2/",
    headers: {
        "Content-Type": "application/json",
        "x-Api-key": apiKey
    }
})

export default axiosInstance