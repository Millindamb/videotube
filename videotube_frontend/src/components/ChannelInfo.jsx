import React, { useEffect, useState, useContext } from "react";
import { isAuthContext } from "../context/context";
import { getChannelInfo } from "../api/watchChannel";
import { toggelSubscribe } from "../api/Togglesub";
import "./channelInfo.css";
import { useNavigate } from "react-router-dom";

const ChannelInfo = ({ owner }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(isAuthContext);

  const [channelInfo, setChannelInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const isCurrentUser = user?._id === owner;

  const toggleSub = async () => {
    try {
      await toggelSubscribe(owner);

      setChannelInfo((prev) => {
        const newState = !prev.isSubscribed;

        return {
          ...prev,
          isSubscribed: newState,
          subscribersCount: newState
            ? prev.subscribersCount + 1
            : prev.subscribersCount - 1,
        };
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await getChannelInfo(owner);
        setChannelInfo(res.data.data);
        console.log(res.data.data)
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [owner]);

  if (loading) return <div>Loading...</div>;
  if (!channelInfo) return <div>Channel not found</div>;

  return (
    <div className="channel-info">
      <div
        className="channel-left"
        onClick={() => navigate(`/channel/${channelInfo.username}`)}
      >
        <img
          className="channel-avatar"
          src={channelInfo.avatar}
          alt="avatar"
        />

        <div className="channel-text">
          <p className="chn-name">{channelInfo.username}</p>
          <p className="chn-sub">
            {channelInfo.subscribersCount} subscribers
          </p>
        </div>
      </div>

      {isLoggedIn && !isCurrentUser && (
        <button
          onClick={toggleSub}
          className={
            channelInfo.isSubscribed ? "subscribed-btn" : "subscribe-btn"
          }
        >
          {channelInfo.isSubscribed ? "Unsubscribe" : "Subscribe"}
        </button>
      )}
    </div>
  );
};

export default ChannelInfo;