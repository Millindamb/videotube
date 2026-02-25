import api from "./axios";

export const getDashboardStats=async()=>{
    const response=await api.get('/dashboard/stats');
    return response
}

export const uploadVideo=async(title,description,videoFile,thumbnail)=>{
    const response=await api.post(`/videos`,{
        title:title,
        description:description,
        videoFile:videoFile,
        thumbnail:thumbnail
    })
    return response
}