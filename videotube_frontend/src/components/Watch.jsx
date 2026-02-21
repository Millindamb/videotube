import React, { useEffect,useState,useContext } from 'react'
import './watch.css'
import { isAuthContext } from '../context/context';
import ChannelInfo from './ChannelInfo';
import { getVideos } from '../api/VideoApi';
import { getCurrentVideo } from '../api/WatchVideo'
import { getComments } from '../api/GetComment';
import VideoCard from '../components/VideoCard';
import { useParams } from 'react-router-dom';
import Comment from './Comment';

const Watch = () => {
  const values=useContext(isAuthContext)
  const {videoId}=useParams()
  const [videos, setVideos] = useState([]);
  const [video,setVideo]=useState(null);
  const [loading,setLoading]=useState(true);
  const [page,setPage]=useState(1);
  const [limit,setLimit]=useState(10);
  const [comments,setComments]=useState([]);
  const [hasNextPage,setHasNextPage]=useState(true);

  useEffect(()=>{
  if(!videoId)return;
  let isMounted=true;

  const fetchVideo=async()=>{
    try{
      setLoading(true);
      const res=await getCurrentVideo(videoId);
      if(isMounted){
        setVideo(res.data.data);
      }
    }catch(e){
      console.log(e);
    }finally{
      if(isMounted){
        setLoading(false);
      }
    }
  };

  fetchVideo();
    return()=>{
      isMounted=false;
    };
  },[videoId]);


  useEffect(()=>{
    const fetchVideos=async()=>{
      try{
        const response=await getVideos();
        setVideos(response.data.docs);
      }catch(e){
        console.error(e);
      }
    }
    fetchVideos()
  },[]);

  useEffect(()=>{
    if(!videoId)return;
    const fetchComments=async()=>{
      if(!values.isLoggedIn){return;}
      try{
        const res=await getComments(videoId,page,limit);
        const newComments=res.data.docs;
        setComments(prev=>page===1?newComments:[...prev,...newComments]);
        setHasNextPage(res.data.hasNextPage);
      }catch(e){
        console.log(e);
      }
    };
    fetchComments();
  },[videoId,page]);

  useEffect(()=>{
    setComments([]);
    setPage(1);
  }, [videoId]);
  
  const loadMore=()=>{if(hasNextPage){setPage(prev=>prev+1);}};
  
  if (loading) return <div>Loading...</div>;
  if (!video) return <div>Video not found</div>;
  return (
    <div className='video-section'>
      <div className='about-current-video'>
        <div className='video-playing'>
          <video key={videoId} width="80%" height="500" controls>
            <source src={video.videoFile} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
          <h2>{video.title}</h2>
        </div>

        <div className='channel-info'>
          <ChannelInfo owner={video.owner}/>
        </div>

        <div className='video-info'>
          <p>{video.views} views • {new Date(video.createdAt).toLocaleDateString()}</p>
          <hr />
          <p>{video.description}</p>
        </div>
        {values.isLoggedIn && <div className='video-comments'>
          <h3>Comments</h3>

          {comments.length===0?(<p>No comments yet</p>):(
            comments.map((c)=>(
              <Comment key={c._id} avatar={c.userInfo.avatar} username={c.userInfo.username} date={c.createdAt} content={c.content}/>
            ))
          )}

          {hasNextPage && (
            <button onClick={loadMore}>Load More</button>
          )}
        </div>}

      </div>
      <div className='more-videos'>
        {videos.length===0 ? (<p>No videos found</p>):(
            videos.map((v)=>(v._id!=videoId && <VideoCard key={v._id} video={v}/>))
          )}
        </div>
    </div>
  )
};

export default Watch;