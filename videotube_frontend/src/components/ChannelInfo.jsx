import React, { useEffect, useState, useContext } from 'react'
import { isAuthContext } from '../context/context';
import { getChannelInfo } from '../api/watchChannel'
import { toggelSubscribe } from '../api/Togglesub';
import './channelInfo.css'

const ChannelInfo = ({owner}) => {
  const values=useContext(isAuthContext)
  const [channelInfo,setChannelInfo]=useState({});
  const [loading,setLoading]=useState(true);

  const toggleSub=async()=>{
    try{
      // const res=await toggelSubscribe(owner);
    }catch(e){
      console.log(e);
    }
  }

  const checkCurrentUser=async()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    return user._id===owner;
  }

  useEffect(()=>{
    const fetchInfo=async()=>{
      try{
        const data=await getChannelInfo(owner);
        setChannelInfo(data.data.data)
      }catch(e){
        console.log(e);
      }finally{
        setLoading(false)
      }
    }
    fetchInfo();
  },[owner])
  if (loading) return <div>Loading...</div>;
  if (!channelInfo) return <div>Channel not found</div>;
  return (
    <div className='channel-info'>
      <div className='image'><img src={channelInfo.avatar} alt="" /></div>
      <div className='info'><p className='chn-name'>{channelInfo.fullName}</p><p className='chn-sub'>{channelInfo.subscribersCount} subscribers</p></div>
      {values.isLoggedIn && !checkCurrentUser() && <div className='sub-button'>
       {channelInfo.isSubscribed ? <button onClick={()=>{toggleSub()}}>unsubscribe</button> : <button onClick={()=>{toggleSub()}}>subscribe</button>}
      </div>}
      {values.isLoggedIn && <div className='like-video'>
       <button>like <i className="fa-regular fa-thumbs-up"></i></button>
      </div>}
    </div>
  )
}

export default ChannelInfo
