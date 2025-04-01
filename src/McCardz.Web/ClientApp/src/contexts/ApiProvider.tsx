import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import axios, {AxiosInstance} from "axios";
import {useAuth} from "./AuthProvider.tsx";
import {useNavigate} from "react-router";
import * as signalR from "@microsoft/signalr";
import {usePub} from "../hooks/usePubSub.ts";

const baseUrl = "https://localhost:7016";

export type ApiContextType = {
    api: AxiosInstance;
    sendMessage: (identifier: string, message: string) => void;
}

// @ts-ignore
const ApiContext = createContext<ApiContextType>(null);

const ApiProvider = ({children}: PropsWithChildren) => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [event] = useState(new CustomEvent("signalR"));
    const pub = usePub();

    const api = axios.create({
        baseURL: baseUrl
    });

    const {setToken} = useAuth();
    const navigate = useNavigate();
    const sendMessage = (identifier: string, message: string) => {
        if (connection) {
            connection.invoke('SendMessage', identifier, message);
        }
    };

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${baseUrl}/hub/gemini`)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.on('ReceiveMessage', (identifier, response) => {
                pub('ReceiveMessage', {identifier, response});
            });
            connection.start();
        }
    }, [connection, event]);

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
                // TODO: Implement logic to use the refresh token
                setToken('');
                navigate('/login');
            }

            return Promise.reject(error);
        }
    )

    return <ApiContext.Provider value={{api, sendMessage}}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
    return useContext(ApiContext)
};

export default ApiProvider;