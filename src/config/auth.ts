import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = import.meta.env.API_BASE_URL

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
})


api.interceptors.request.use((err: InternalAxiosRequestConfig<AxiosError>)=>{
    return err
})

export default api