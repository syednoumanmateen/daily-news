import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://newsapi.org/v2/",
    headers: {
        "Content-Type": "application/json",
        "x-Api-key": 'a35c4055350144aeb1f9dfeadf816aba'
    }
})

export default axiosInstance