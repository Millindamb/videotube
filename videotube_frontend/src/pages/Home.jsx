import React, { useEffect, useState,useContext } from 'react';
import { getVideos } from '../api/VideoApi';
import { isAuthContext } from '../context/context';

const Home = () => {
  const values=useContext(isAuthContext);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Videos {values.isLoggedIn && <p>final validation </p>}</h1>
      {videos.length === 0 ? (
        <p>No videos found</p>
      ) : (
        videos.map((v) => (
          <div key={v._id}>{v.title}</div>
        ))
      )}
    </div>
  );
};

export default Home;
