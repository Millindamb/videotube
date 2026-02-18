import React, { useEffect, useState } from 'react'
import { getChannelInfo } from '../api/watchChannel'

const ChannelInfo = ({owner}) => {
  const [channelInfo,setChannelInfo]=useState({});
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const fetchInfo=async()=>{
      try{
        const data=await getChannelInfo(owner);
        console.log(data.data.data)
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
    <div>
       <div className='image'><img src={channelInfo.avatar} alt="" /></div>
       <div className='info'><p>{channelInfo.fullName}</p><p>{channelInfo.subscribersCount}</p></div>
       <div className='sub-button'>
        {channelInfo.isSubscribed ? <button>unsubscribe</button> : <button>subscribe</button>}
       </div>
    </div>
  )
}

export default ChannelInfo
