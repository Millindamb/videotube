import React, { useEffect, useState } from 'react'
import { getTweets,createTweet } from '../api/Tweet'
import './tweet.css'

const Tweets = () => {
  const [tweets,setTweets]=useState({})
  const [create,setCreate]=useState(false)
  const [loading,setLoading]=useState(true);
  const [content,setContent]=useState("");
  const user=JSON.parse(localStorage.getItem('user'));

  const createNewTweet=async()=>{
    try{
      const response=await createTweet(content)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    const fetchTweets=async()=>{
      try{
        const response=await getTweets(user._id);
        console.log(response.data.data)
        setTweets(response.data.data)
        setLoading(false)
      }catch(e){
        console.log(e)
      }
    }
    fetchTweets()
  },[create])
  return (
    <div>
      <div className='createTweet'>
        <button onClick={()=>{setCreate(!create)}}>Create Tweet</button>
        {create && <form onSubmit={()=>{createNewTweet()}} className='tweet-inputs'>
          <p>Content</p>
          <input type="text" placeholder='Content' onChange={(e)=>{setContent(e.target.value)}}/>
          <button type='submit'>Add</button>
        </form>}
      </div>
      {loading ? <div>Loading...</div>:
      <div className='Tweets'>
        {!tweets.length?<div>no Tweets avaliable</div>:
        tweets.map((t)=>{return(
          <div key={t._id}>
            <div className='user-info'>
              <img src={user.avatar} alt="" />
              <div className='name'>{user.username}</div>
            </div>
            <div>{t.content}</div>
            <div className='tweet-buttons'>
              <button>Delete</button>
              <button>Update</button>
            </div>
          </div>
        )})}
      </div>}
    </div>
  )
}

export default Tweets
