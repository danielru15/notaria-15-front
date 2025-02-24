import axios from "axios";

export const notaria15Api = axios.create({
    baseURL:"https://vaccine-volumes-fate-accounts.trycloudflare.com/api",
    withCredentials:true,
    headers:{
        
    }
})