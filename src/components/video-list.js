import React from 'react'
import VideoListItem from './video-list-item'

const VideoList = (props) => {
  const videoItems = props.videos.map((video) => {
    return (
      <VideoListItem 
        key={video.etag} 
        video={video}
        selectedVideo={props.selectedVideo}
        onVideoSelect={props.onVideoSelect}
      />
    )
  })
  return (
    <ul className="col-md-5 list-group">
      {videoItems}
    </ul>
  )
}

export default VideoList