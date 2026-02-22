import React, { useEffect, useState } from 'react'
import { getUserPlaylists,createPlaylist,deletePlaylist } from '../api/GetUsersPlalists'
import { NavLink } from 'react-router-dom'
import './Playlist.css'
import VideoCard from './VideoCard'

const Playlist = () => {
  const user=JSON.parse(localStorage.getItem('user'));
  const [playlists,setPlaylists]=useState([])
  const [loading,setLoading]=useState(true)
  const [name,setName]=useState("")
  const [description,setDescription]=useState()
  const [create,setCreate]=useState(false)

  const deleteUsersPlaylist=async(playlistId)=>{
    try{
      const res=await deletePlaylist(playlistId)
      setPlaylists((prev)=>prev.filter((playlist)=>playlist._id!==playlistId));
    }catch(e){console.log(e)}
  } 

  const createUserPlaylist=async(e)=>{
    e.preventDefault()
    try{
      const response=await createPlaylist(name,description)
      if(response.data.success){
        setCreate(false)
        setDescription("")
        setName("")
      }
    }catch(e){
      console.log(e);
    }
  }

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
  },[user?._id,create])

  return (
    <div className='playlist'>
      <div className='create-button' onClick={()=>{setCreate(!create)}}><button>Create Playlist</button></div>
      {create && <form onSubmit={createUserPlaylist} className='add_playlist'>
        <div className='playlist-inputs'>
          <p>Name</p>
          <input type="text" required onChange={(e)=>{setName(e.target.value)}} placeholder='Playlist Name'/>
          <p>Decription</p>
          <input type="text" required onChange={(e)=>{setDescription(e.target.value)}} placeholder='description'/>
          <button>Add</button>
        </div>
      </form>}
      {loading ? (<p>Loading...</p>) : playlists.length===0 ? (<p>No playlists found</p>) : (
        playlists.map((pl)=>(
          <div key={pl._id} className='playlist-info'>
            <div className='playlist-controls'>
              <div className='name'>{pl.name}</div>
              <p className='description'>{pl.description}</p>          
              <div className='buttons'>
                <NavLink to={`/playlist/${pl._id}`}>
                  <button className='edit'>Edit <i className="fa-solid fa-pen"></i></button>
                </NavLink>
                <button className='delete' onClick={()=>{deleteUsersPlaylist(pl._id)}}>Delete <i className="fa-solid fa-delete-left"></i></button>
                <NavLink to={`/playlist/${pl._id}`}>
                  <button className='more'>More <i className="fa-solid fa-arrow-right"></i></button>
                </NavLink>
              </div>
            </div>

            {pl.videos.length===0?(<p>No videos in the playlist yet</p>):(
            <div>
              <div className='total'>Total videos: {pl.videos.length}</div>
              <div className='videos'>{pl.videos.map((v)=>{return<VideoCard key={v._id} video={v}/>})}</div>
            </div>)}
          </div>
        ))
      )}
    </div>
  )
}

export default Playlist