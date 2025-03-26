import axios from "axios";

const api = axios.create({
    baseURL: 'https://localhost:7016'
});

api.interceptors.request.use(
    (config) => {
       const token = localStorage.getItem('token');

       if (token && token !== '') {
           config.headers.Authorization = `Bearer ${token}`;
       }
       
       return config;
    },
    (error) => Promise.reject(error));

export default api;
