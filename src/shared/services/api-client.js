import axios from 'axios';

export const apiClient={
    async get(URL){
        try{
            const response=await axios.get(URL);
            return response;
        }
        catch(err){
            throw err;
        }
    },
    async getSecure(URL,token){
        try{
            const response=await axios.get(URL,{headers:{
                'Authorization': `Bearer ${token}`
            }});
            return response;
        }
        catch(err){
            throw err;
        }
    },
    async postSecure(URL,data,token){
        try{
            const response=await axios.post(URL,data,{headers:{
                'Authorization': `Bearer ${token}`
            }});
            return response;
        }
        catch(err){
            throw err;
        }
    },
    async post(URL,data){
        try{
            console.log(data);
            const response=await axios.post(URL,data);
            return response;
        }
        catch(err){
            throw err;
        }
    },
    put(){

    },
    remove(){

    }
}