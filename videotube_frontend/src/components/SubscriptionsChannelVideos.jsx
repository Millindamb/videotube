import React, { useEffect, useState } from 'react'
import { getChannelsVideo } from '../api/GetChannelsVideo'
import VideoCard from './VideoCard'
import './SubscriptionsChannelVideos.css'

const SubscriptionsChannelVideos = ({channelId,channelAvatar,channelUserName}) => {
    const [videos,setVideos]=useState([])
    useEffect(()=>{
        const fetchVideo=async()=>{
            try{
                const video=await getChannelsVideo(channelId,5,1);
                setVideos(video.data.data);
            }catch(e){
                console.log(e)
            }
        }
        fetchVideo()
    },[channelId])
  return (
    <div>
        <div className='channelInfo'>
            <div className='ch-img'><img src={channelAvatar}/></div>
            <div className='ch-username'>{channelUserName}</div>
        </div>
        <div className='hd'>
            Latest Videos
        </div>
        <div className='channel-videos'>
            {videos.length===0?<div className='fd'>No Video Found</div>:videos.map((v)=>{return <VideoCard key={v._id} video={v}/>})}
        </div>
    </div>
  )
}

export default SubscriptionsChannelVideos
