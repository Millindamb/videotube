import React from 'react'
import './comment.css'

const Comment = ({avatar,username,date,content}) => {
    const formatTimeAgo = (dateString) => {
    const now = new Date();
    const created = new Date(dateString);
    const seconds = Math.floor((now - created) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };
    for (let key in intervals) {
        const interval = Math.floor(seconds / intervals[key]);
        if (interval >= 1) {
        return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
        }
    }

    return "Just now";
    };
    return (
    <div className='comment'>
        <div className='part1'>
            <img src={avatar}/>
        </div>
        <div className='part2'>
            <div className='userInfo'><p className='name'>{username}</p><p className='date'>{formatTimeAgo(date)}</p></div>
            <div className='content'>{content}</div>
        </div>
        <div className="like"><button><i className="fa-regular fa-thumbs-up"></i></button></div>
    </div>
  )
}

export default Comment
