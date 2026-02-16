import api from "./axios";

export const getVideos=async ()=>{
    const res=await api.get('/videos')
    return res.data;
};