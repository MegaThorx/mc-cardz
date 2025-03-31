import {createContext, PropsWithChildren, useContext} from "react";
import axios, {AxiosInstance} from "axios";
import {useAuth} from "./AuthProvider.tsx";
import {useNavigate} from "react-router";

const ApiContext = createContext<AxiosInstance>(axios.create());

const ApiProvider = ({children}: PropsWithChildren) => {
    const api = axios.create({
        baseURL: 'https://localhost:7016'
    });
    
    const {setToken} = useAuth();
    const navigate = useNavigate();

    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');

            if (token && token !== '') {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => Promise.reject(error));

    api.interceptors.response.use(
        (config) => config,
        (error) => {
            if (error.response && error.response.status === 401) {
                if (error.response.request.responseURL.indexOf('/api/auth/login') !== -1) {
                    // If it is the login page just return the promise
                    return Promise.reject(error);
                }
                setToken('');
                navigate('/login');
            }

            return Promise.reject(error);
        }
    )

    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
    return useContext(ApiContext)
};

export default ApiProvider;