import React, { Component } from 'react';
import _ from 'lodash'
import './style/style.css'
import SearchBar from './components/search-bar'
import VideoViewer from './components/video-viewer'
import VideoList from './components/video-list'
import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone'
import YTSearch from 'youtube-api-search'
const API_KEY = 'AIzaSyC8VbL5xwHclL4HkCui8yF6-uMWyAW6HKc'

class App extends Component {
  constructor() {
    super()
    this.state = {
      search: "",
      videos: [],
      selectedVideo: null,
      videoPlaying: false,
      listening: false,
    }
    this.onVideoPlay = this.onVideoPlay.bind(this)
    this.videoSearch = this.videoSearch.bind(this)
    this.onVideoPause = this.onVideoPause.bind(this)
    this.videoSearch('space trip')
  }

  onListenClick(){

    if(!this.state.videoPlaying){
      this.setState({ listening: true })
    
    // fetch('http://localhost:3002/api/speech-to-text/token')
    fetch('https://sayseeserver-boisterous-raven.eu-gb.mybluemix.net/api/speech-to-text/token')
    .then(function(response) {
        return response.text();
    }).then((token) => {
      console.log('token is', token)
      this.stream = recognizeMic({
          token: token,
          objectMode: true, // send objects instead of text
          extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
          format: false, // optional - performs basic formatting on the results such as capitals an periods
      });
      this.stream.on('data', (data) => {
          this.setState({
            search: data.alternatives[0].transcript,
          }, this.streamUpdate(this.state.search))
        });
    
        this.stream.on('error', function(err) {
            console.log(err);
        });
      //  stream.stop()
      }).catch(function(error) {
          console.log(error);
      });
    } else {
      this.stream.stop()
      this.setState({ listening: false, search: "" })
    }
  };

  streamUpdate(search){
    console.log(this.state.videoPlaying)
    if(this.state.videoPlaying){
      this.stream.stop()
      this.setState({ search: "" })
    }
    console.log(this.state.search)
    this.videoSearch(search)
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
,      })
    })
  }

  onVideoPlay(){
    this.setState({ videoPlaying: true, listening: false })
    this.stream.stop()
  }

  onVideoPause(){
    this.setState({ videoPlaying: false })
  }

  
  render() {
    // const search = this.state.search
    // _.debounce((search) => { this.videoSearch(search)}, 300)
    // this.videoSearch
    return (
      <div className="App">
        <div className="container-listen-button">
          <button 
            onClick={this.onListenClick.bind(this)}
            className={this.state.listening && !this.state.videoPlaying ? "listening listen-button" : "listen-button"}
          >
          <i className="fa fa-commenting listen-button-icon"></i>
          </button>
        </div>
        <SearchBar
          search={this.state.search}
        />
        <div className="container col-md-8">
          <div className="row">
        <VideoViewer
          video={this.state.selectedVideo}
          onVideoPlay={this.onVideoPlay}
          onVideoPause={this.onVideoPause}
        />
        <div className="col-md-1">
        </div>
        <VideoList
          videos={this.state.videos}
          selectedVideo={this.state.selectedVideo}
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
        />
        </div>
        </div>
      </div>
     
    );
  }
}


export default App;
