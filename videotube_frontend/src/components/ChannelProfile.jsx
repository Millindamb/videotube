import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { getUserVideos } from '../api/Dashboard'
import { getChannelInfo } from '../api/GetChannelsVideo'
import VideoCard from './VideoCard'
import './ChannelProfile.css'
import { getUserPlaylists } from '../api/GetUsersPlalists'
import { getTweets } from '../api/Tweet'
import { toggelSubscribe } from '../api/Togglesub'

const ChannelProfile=()=>{
    const {channelName}=useParams()
    const [channelInfo,setChannelInfo]=useState({})
    const [isSubscribed,setIsSubscribed]=useState(null)
    const [videos,setVideos]=useState([])
    const user=JSON.parse(localStorage.getItem('user'))
    const [currentPart,setCurrentPart]=useState(1)
    const [playlists,setPlaylists]=useState([])
    const [tweets,setTweets]=useState([])

    useEffect(()=>{
        const fetchChannelInfo=async()=>{
            try{
                const response=await getChannelInfo(channelName)
                setIsSubscribed(response.data.data.isSubscribed)
                setChannelInfo(response.data.data)
            }catch(e){
                console.log(e)
            }
        }
        fetchChannelInfo()
    },[channelName])

    useEffect(()=>{
        const fetchChannelVideos=async()=>{
            try {
                const response=await getUserVideos(channelName);
                setVideos(response?.data?.data?.ChannelVideos || []);
            } catch (e) {
                console.log(e);
            }
        };
        fetchChannelVideos();
    }, [channelName]);

    useEffect(()=>{
        if(!channelInfo._id) return;

        const fetchPlaylists=async()=>{
            try {
                const response=await getUserPlaylists(channelInfo._id);
                setPlaylists(response.data.data || []);
            } catch (e) {
                console.log(e);
            }
        };

        fetchPlaylists();
    }, [channelInfo._id]);

    useEffect(()=>{
        if(!channelInfo._id) return;

        const fetchTweets=async()=>{
            try {
                const response=await getTweets(channelInfo._id);
                setTweets(response.data.data || []);
            } catch (e) {
                console.log(e);
            }
        };

        fetchTweets();
    }, [channelInfo._id]);


    const formatTimeAgo=(dateString)=>{
    const now=new Date();
    const created=new Date(dateString);
    const seconds=Math.floor((now-created)/1000);

    const intervals={
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    };

    for(let key in intervals){
        const interval=Math.floor(seconds/intervals[key]);
        if(interval>=1){
        return `${interval} ${key}${interval>1 ? "s":""} ago`;
        }
    }
    return "Just now";
    };

    const toggleSub=async()=>{
        try {
          await toggelSubscribe(channelInfo._id);
          setChannelInfo((prev)=>({...prev,
            subscribersCount:isSubscribed
              ? prev.subscribersCount-1
              : prev.subscribersCount+1,}));
    
          setIsSubscribed((prev)=>!prev);
        } catch(e){
          console.log(e);
        }
      };

    return (
    <div className='channel'>
        <div className='about-channel'>
            <div className="channel-info">
                <div className="channel-coverImage">
                    <img src={channelInfo.coverImage} alt="" />
                </div>
                <div className="info">
                    <img className="channel-avatar" src={channelInfo.avatar} alt="User Avatar"/>
                    <div>
                        <div className="channel-name">{channelInfo.username}</div>
                        <div className="channel-subscribers">
                            {channelInfo.subscribersCount} subscribers
                        </div>
                    </div>
                </div>

                {user && channelInfo._id !== user._id && (
                    <div className="subscribe-button">
                    <button onClick={()=>toggleSub()}>
                        {isSubscribed ? "Unsubscribe" : "Subscribe"}
                    </button>
                    </div>
                )}
            </div>
            <div className='channel-option'>
                <button onClick={()=>setCurrentPart(1)}>Video</button>
                <button onClick={()=>setCurrentPart(2)}>Tweets</button>
                <button onClick={()=>setCurrentPart(3)}>Playlist</button>
            </div>
            {currentPart==1 && <div className='channel-video'>
                {videos.length ? videos.map((v)=>{return<VideoCard key={v._id} video={v}/>}):<div>Channel Have No Videos</div>}
            </div>}

            {currentPart==2 && <div className='channel-tweets'>
                {!tweets.length?<div>no Tweets avaliable</div>:
                    tweets.map((t)=>{return(<div key={t._id}>
                        <div className='user-info'>
                        <img src={user.avatar} alt="" />
                        <div className='name'>{user.username}</div>
                        <div>{formatTimeAgo(t.createdAt)}</div>
                        </div>
                        <div>{t.content}</div>
                    </div>)})
                }
            </div>}

            {currentPart==3 && <div className='channel-playlists'>
                {playlists.length===0 ? (<p>No playlists found</p>) : (
                    playlists.map((pl)=>(
                    <div key={pl._id} className='playlist-info'>
                        <div className='playlist-controls'>
                            <div className='name'>{pl.name}</div>
                            <p className='description'>{pl.description}</p>          
                        </div>
                        {pl.videos.length===0?(<p>No videos in the playlist yet</p>):(
                        <div>
                            <div className='total'>Total videos: {pl.videos.length}</div>
                            <div className='videos'>{pl.videos.map((v)=>{return<VideoCard key={v._id} video={v}/>})}</div>
                        </div>)}
                    </div>
                    ))
                )}
            </div>}
        </div>
    </div>
    )
}

export default ChannelProfile;