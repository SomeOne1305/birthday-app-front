import api from "@/config/auth"
import { API_URLS } from "@/exports/urls"

const AuthService = {
    async login(data:string){
        return await api.post(API_URLS.login, data)
    },
    async verify(token:string){
        return await api.post(API_URLS.verify, {token})
    }
}

export default AuthService