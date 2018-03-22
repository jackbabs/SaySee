import React from 'react'
import Youtube from 'react-youtube'


class VideoViewer extends React.Component {


  onVideoPlay(){
    this.props.onVideoPlay()
  }
  onVideoPause(){
    this.props.onVideoPause()
  }
  render(){
    const { video } = this.props
    if(!video){
      return <div>Loading...</div>
    }
    const videoId = video.id.videoId
    const opts = {
      height: '390',
      width: '640',
    }
    return (
      <div className="video-viewer col-md-6">
      <div className="text-center">
        <Youtube
          videoId={videoId}
          opts={opts}
          onPlay={this.onVideoPlay.bind(this)}
          onPause={this.onVideoPause.bind(this)}
  
        />
        </div>
        <div className="details">
          <div className="details-title">{ video.snippet.title }</div>
          <div>{ video.snippet.description }</div>
        
        </div>
      </div>
    )
  }
}


export default VideoViewer


// const url = `https://www.youtube.com/embed/${videoId}`
// <div 
//   className="iframeWrapper embed-responsive embed-responsive-16by9">
//   <iframe className="embed-responsive-item" src={url}></iframe>
// </div>