import api from "./axios";

export const toggelSubscribe=async(channelId)=>{
    const res=await api.get(`/subscriptions/c/${channelId}`)
    console.log(res)
    return res
}