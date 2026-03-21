import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { getVideos } from '../api/VideoApi';
import VideoCard from '../components/VideoCard';
import { isAuthContext } from '../context/context';
import './Home.css';

const Home = () => {
  const values=useContext(isAuthContext)
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <div className="home-section">
      {!values.isLoggedIn && <div className='login-notification'><NavLink className="click-here" to="/users/login">Click here</NavLink> to sign up and start exploring! Use "user_99999" as username and "user@12345" as password to access more.</div>}
      <div className="home-video-grid">
        {videos.length===0 ? (
          <p>No videos found</p>):(
          videos.map((v)=>(
            <VideoCard key={v._id} video={v}/>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
