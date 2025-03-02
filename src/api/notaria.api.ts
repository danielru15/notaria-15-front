import axios from "axios";

export const notaria15Api = axios.create({
    baseURL:"http://localhost:5000/api",
    withCredentials:true,
    headers:{
        
    }
})