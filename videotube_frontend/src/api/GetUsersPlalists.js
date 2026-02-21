import api from "./axios"

export const getUserPlaylists=async(userId)=>{
    const playlists=await api.get(`/playlist/user/${userId}`)
    return playlists;
}