import React, { useEffect, useState } from 'react';
import { getVideos } from '../api/VideoApi';
import VideoCard from '../components/VideoCard';
import './Home.css';

const Home = () => {
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
    <div className="home">
      <h1 className="title">Videos</h1>

      <div className="video-grid">
        {videos.length === 0 ? (
          <p>No videos found</p>
        ) : (
          videos.map((v) => (
            <VideoCard key={v._id} video={v} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
