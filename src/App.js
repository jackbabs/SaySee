import React, { Component } from 'react';
import './style/style.css'
import SearchBar from './components/search-bar'
import VideoViewer from './components/video-viewer'
import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone'

const API_KEY = 'AIzaSyC8VbL5xwHclL4HkCui8yF6-uMWyAW6HKc'

class App extends Component {
  constructor() {
    super()
    this.state = {
      search: ""
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
        })
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
        <VideoViewer/>
      </div>
     
    );
  }
}


export default App;
