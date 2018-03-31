import React from 'react'

const VideoListItem = ({ video, onVideoSelect, selectedVideo }) => {
  
  const imageUrl = video.snippet.thumbnails.default.url

  return (
    <li onClick={() => onVideoSelect(video)} className={selectedVideo === video ? "list-group-item selected" : "list-group-item" }>
      <div className="video-list media">
        <div className="media-left">
          <img alt="video" className="media-object" src={imageUrl} />
        </div>

        <div className="media-body">
          <div className="media-heading item-title">{video.snippet.title}</div>
        </div>
      </div>
    </li>
  )
}


export default VideoListItem