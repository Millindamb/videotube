import api from "./axios";

export const getTweets=async(userId)=>{
    const response=await api.get(`/tweets/user/${userId}`);
    return response
}

export const createTweet=async(content)=>{
    const response=await api.post('/tweets',{
        content:content
    })
    return response
}