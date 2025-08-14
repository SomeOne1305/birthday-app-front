import {createStore} from 'zustand'


export interface IUser {
    _id?: string;
    first_name?: string;
    last_name?:string;
    email?:string;
    createdAt?:string;
    updatedAt?:string
}

interface IAuthStore {
    isAuthenticated:boolean
    user: IUser
    getUser: ()=> Promise<void>
}

export const useAuthStore = createStore<IAuthStore>((set, getState)=>({
    isAuthenticated: !!localStorage.getItem('access_token'),
    user: {} as IUser,
    getUser: async ()=> await new Promise((resolve, reject)=>{resolve()})
}))

