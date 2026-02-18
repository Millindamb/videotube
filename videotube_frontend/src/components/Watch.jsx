import React, { useEffect,useState } from 'react'
import './watch.css'
import ChannelInfo from './ChannelInfo';
import { getVideos } from '../api/VideoApi';
import { getCurrentVideo } from '../api/WatchVideo'
import VideoCard from '../components/VideoCard';
import { useParams } from 'react-router-dom';

const Watch = () => {
  const {videoId}=useParams()
  const [videos, setVideos] = useState([]);
  const [video,setVideo]=useState(null);
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    if(!videoId)return
    const fetchVideo=async()=>{
      try{
        const res=await getCurrentVideo(videoId);
        setVideo(res.data.data)
      }catch(e){
        console.log(e)
      }finally{
        setLoading(false)
      }
    }
    fetchVideo()
  },[videoId]);
  useEffect(() => {
      getVideos()
        .then((res) => {
          setVideos(res.data.docs);
        })
        .catch((err) => {
          setError("Failed to fetch videos");
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);

  if (loading) return <div>Loading...</div>;
  if (!video) return <div>Video not found</div>;
  return (
    <div className='video-section'>
      <div className='about-current-video'>
        <div className='video-playing'>
          <video width="80%" height="500" controls>
            <source src={video.videoFile} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
          <h2>{video.title}</h2>
        </div>

        {/* <div className='channel-info'>
          <ChannelInfo owner={video.owner}/>
        </div> */}

        <div className='video-info'>
          <p>{video.views} views • {new Date(video.createdAt).toLocaleDateString()}</p>
          <hr />
          <p>{video.description}</p>
        </div>
      </div>
      <div className='more-videos'>
          {videos.length === 0 ? (
            <p>No videos found</p>
          ) : (
            videos.map((v) => (
              <VideoCard key={v._id} video={v} />
            ))
          )}
        </div>
    </div>
  )
};

export default Watch;