import React, { useEffect, useState } from 'react'
import { getUserPlaylists } from '../api/GetUsersPlalists'
import { NavLink } from 'react-router-dom'
import './Playlist.css'
import VideoCard from './VideoCard'

const Playlist = () => {
  const user=JSON.parse(localStorage.getItem('user'));
  const [playlists,setPlaylists]=useState([])
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    const fetchPlaylists=async()=>{
      try{
        const response=await getUserPlaylists(user._id);
        setPlaylists(response.data.data)
      }catch(e){
        console.log(e)
      }finally{
        setLoading(false)
      }
    }
    fetchPlaylists()
  },[user?._id])

  return (
    <div className='playlist'>
      {loading ? (<p>Loading...</p>) : playlists.length===0 ? (<p>No playlists found</p>) : (
        playlists.map((pl)=>(
          <div key={pl._id} className='playlist-info'>
            <div className='name'>{pl.name}{pl.description}</div>            

            <NavLink to={`/playlist/${pl._id}`}>
              <button>Edit</button>
            </NavLink>

            {pl.videos.length===0?(<p>No videos in the playlist yet</p>):(<div>
              <div className='total'></div>
              <div className='videos'>{pl.videos.map((v)=>{return<VideoCard key={v._id} video={v}/>})}</div>
            </div>)}
          </div>
        ))
      )}
    </div>
  )
}

export default Playlist