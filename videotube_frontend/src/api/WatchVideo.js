import { useParams } from "react-router-dom";
import api from "./axios";

export const getCurrentVideo=async(videoId)=>{
    const response=await api.get(`/videos/${videoId}`)
    return response
}