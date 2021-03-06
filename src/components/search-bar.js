import React, {Component} from 'react'
import '../style/style.css'

class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      search: ""
    }
  }
  render(){
    return (
      <div className="search-bar">
        <input
          value={this.props.search}
        />
      </div>
    )
  }
}

export default SearchBar