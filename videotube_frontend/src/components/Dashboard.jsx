import React, { useEffect, useRef, useState } from 'react'
import {NavLink,useLocation} from "react-router-dom"
import { getDashboardStats, getUserVideos, uploadVideo } from '../api/Dashboard'
import VideoCard from './VideoCard'
import './dashboard.css'
import DahsboardVideo from './DashboardVideo'

const Dashboard = () => {
  const [currentPart,setCurrentPart]=useState(true)
  const [videos,setVideos]=useState({})
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [video,setVideo]=useState(null)
  const [thumbnail,setThumbnail]=useState(null)
  const [upload,setUpload]=useState(false)
  const [user,setUser]=useState({})
  const videoRef=useRef(null)
  const thumbnailRef=useRef(null)
  const location=useLocation()

  useEffect(()=>{
    const fetchDashboardData=async()=>{
      try{
        const response=await getDashboardStats()
        setUser(response.data.data)
      }catch(e){console.log(e)}
    }
    fetchDashboardData()
  },[])

  useEffect(()=>{
    const fetchUserVideos=async()=>{
      const response=await getUserVideos(user.username);
      setVideos(response.data.data.ChannelVideos)
    }
    if(user?.username?.length){fetchUserVideos()}
  },[currentPart,user.username])

  const uploadNewVideo=async()=>{
    setUpload(true)
    try{
      const response=await uploadVideo(title,description,video,thumbnail)
    }catch(e){
      console.log(e)
    }finally{setUpload(false)}
  }

  function setEmpty(){
    setTitle("")
    setDescription("")
    setVideo(null)
    setThumbnail(null)
    if(videoRef.current){videoRef.current.value=""}
    if(thumbnailRef.current){thumbnailRef.current.value=""}
  }

  const handleDeleteVideo=(id)=>{
    setVideos((prev)=>prev.filter((video)=>video._id!==id));
  };

   useEffect(()=>{
    if(location.hash){
      const el=document.querySelector(location.hash);
      if(el){
        el.scrollIntoView({ behavior: "smooth" });
      }}
  }, [location]);

  return (
    <div className='dashboard'>
      <div className='profile'>
        <img className='coverImage' src={user?.coverImage} alt="user cover image" />
        <div className='info'>
          <img className='userAvatar' src={user?.avatar} alt="User Avatar"/>
          <div className='username'>{user.username}</div>
        </div>
      </div>
      <p>Dashboard</p>
      <div className='records'>
        <div className='totalVideos'>
          <p>Total Videos</p>
          <p>{user.totalVideos}</p>
          <p><i className="fa-solid fa-video"></i></p>
        </div>
        <div className='subscribers'>
          <p>Subscribers</p>
          <p>{user.totalSubscribers}</p>
          <p><i className="fa-solid fa-users"></i></p>
        </div>
        <div className='totalLikes'>
          <p>Total likes</p>
          <p>{user.totalLikes}</p>
          <p><i className="fa-solid fa-thumbs-up"></i></p>
        </div>
        <div className='totalViews'>
          <p>Total Views</p>
          <p>{user.totalViews}</p>
          <p><i className="fa-solid fa-eye"></i></p>
        </div>
      </div>
      <div className='options'>
        <button onClick={()=>{setCurrentPart(true)}} className='uploadVideo'>Upload Video</button>
        <button onClick={()=>{setCurrentPart(false)}} className='myvideos'>My videos</button>
        <NavLink className='playlist-button' to={`/playlist/user/${user._id}`}><button className='playlists'>Playlists</button></NavLink>
      </div>
      {currentPart?<div className='upload-video'>
        {!upload?<form id="upload-section" onSubmit={(e)=>{e.preventDefault();uploadNewVideo()}}>
          <p>Title</p>
          <input type="text" required value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
          <p>Description</p>
          <input type="text" required value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
          <p>Upload Video</p>
          <input type="file" ref={videoRef} required onChange={(e)=>{setVideo(e.target.files[0])}}/>
          <p>Thumbnail</p>
          <input type="file" ref={thumbnailRef} required onChange={(e)=>{setThumbnail(e.target.files[0])}}/>
          <br/>
          <button type='submit'>Upload Video</button> <button type="button" onClick={setEmpty}>Cancel</button>
        </form>:
        <div className='uploading'>
          the video is uploading...
        </div>}
      </div>:
      <div className='user-videos'>
        {videos?.length ? <div>
          {videos.map((v)=>(
            <DahsboardVideo key={v._id} video={v} onDelete={handleDeleteVideo}/>
          ))}
        </div>:<div>No Videos Uploaded Yet</div>}
      </div>}
    </div>
  )
}

export default Dashboard
