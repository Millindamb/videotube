import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPlaylistById,updatePlaylist,removeVideoFromPlaylist } from '../api/GetUsersPlalists'
import VideoCard from './VideoCard'

const SpecificPlaylist = () => {
    const [loading,setLoading]=useState(true)
    const {playlistid}=useParams()
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [playlist,setPlaylist]=useState(null)
    const [canEdit,setCanEdit]=useState(false)

    const updatePlaylistdetails=async(e)=>{
      e.preventDefault()
      try{
        const response=await updatePlaylist(playlistid,name,description)
        setCanEdit(false)
      }catch(e){
        console.log(e)
      }
    }

    const removeVideo=async(videoId)=>{
      try{
        const response=await removeVideoFromPlaylist(playlistid,videoId)
        setPlaylist((prev)=>({
          ...prev,
          videos: prev?.videos?.filter((v)=>v._id !== videoId) || []
        }))
      }catch(e){
        console.log(e)
      }
    }

    useEffect(()=>{
      const fetchPlaylistData=async()=>{
        try{
          const response=await getPlaylistById(playlistid);
          setPlaylist(response.data.data)
          setName(response.data.data.name)
          setDescription(response.data.data.description)
          setLoading(false)
        }catch(e){console.log(e)}
      }
      fetchPlaylistData()
    },[playlistid])
    return (
    <div className='playlist'>
      <div className='editbox'>
        {canEdit?
          <form onSubmit={updatePlaylistdetails}>
            <p>Name</p>
            <input type="text" required value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <p>Description</p>
            <input type="text" required value={description} onChange={(e)=>{setDescription(e.target.value)}}/>  
            <button type='submit'>Update</button>
          </form>
          :
          <div>
            <div className='name'>{name}</div>
            <div className='description'>{description}</div>
          </div>
        }
        <button onClick={()=>{setCanEdit(!canEdit)}}>edit</button>
      </div>
      <div className='vdo'>
        {loading ? (
          <div>Loading...</div>
        ) : !playlist?.videos ? (
          <div>No videos found</div>
        ) : playlist.videos.length === 0 ? (
          <div>No Videos in the playlist Yet</div>
        ) : (
          playlist.videos.map((v) => (
            <div key={v._id}>
              <VideoCard video={v} />
              <button onClick={() => removeVideo(v._id)}>
                Remove Video
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default SpecificPlaylist
