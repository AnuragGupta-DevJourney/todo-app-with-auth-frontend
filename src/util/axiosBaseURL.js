import axios from "axios";

const axiosBaseURL = axios.create({
    baseURL: "https://todo-app-with-auth-backend-1.onrender.com/api"
    // baseURL : "http://localhost:8080/api"
})

export default axiosBaseURL