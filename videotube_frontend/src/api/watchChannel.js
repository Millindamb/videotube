import api from "./axios";

export const getChannelInfo=async(owner)=>{
    const response=await api.get(`/users/channel/${owner}`)
    return response
}