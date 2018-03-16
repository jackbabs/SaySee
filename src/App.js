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
    }
    this.videoSearch('space trip')
  }
  onListenClick(){
    fetch('http://localhost:3002/api/speech-to-text/token')
    .then(function(response) {
        return response.text();
    }).then((token) => {
      console.log('token is', token)
      var stream = recognizeMic({
          token: token,
          objectMode: true, // send objects instead of text
          extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
          format: false // optional - performs basic formatting on the results such as capitals an periods
      });
      stream.on('data', (data) => {
        this.setState({
          search: data.alternatives[0].transcript,
        }, this.videoSearch(this.state.search))
      });
      stream.on('error', function(err) {
          console.log(err);
      });
      // document.querySelector('#stop').onclick = stream.stop.bind(stream);
    }).catch(function(error) {
        console.log(error);
    });
  };

  videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
,      })
    })

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
            className="listen-button"
          >
          Listen to microphone
          </button>
          </div>
        <SearchBar
          search={this.state.search}
        />
        <VideoViewer
          video={this.state.selectedVideo}
        />
        <VideoList
          videos={this.state.videos}
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
        />
      </div>
     
    );
  }
}


export default App;
