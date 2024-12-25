import { AxiosResponse } from "axios"
import { api } from "./baseService"

export const userService = ()=>{
    function findAll(): Promise<AxiosResponse<IUser[]>>{
       return api.get('/')
    }
    function findById(id: String):Promise<AxiosResponse<IUser>>{
        return api.get(`/${id}`)
    }
    function del(id: String):Promise<AxiosResponse<IUser>>{
        return api.delete(`/${id}`)
    }
    function update(id: String, user: IUser):Promise<AxiosResponse<IUser>>{
        return api.put(`/${id}`, user)
    }

    return {
        findAll,
        findById,
        update,
        del
    }
}