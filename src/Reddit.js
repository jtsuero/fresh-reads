import React, { Component } from 'react';
import './App.css';

class RedditSort extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  storyList = (story) => {
    let storyLink = "https://www.reddit.com" + story.data.permalink;
    let storyPic = story.data.thumbnail;
    return  <div>
      <img src= {storyPic} />
      <p><a href = {storyLink} className = "App-link">{story.data.title} </a></p>
      </div>
  }

  render() {
    let stories = this.props.stories;
    let links = stories.map(this.storyList);
    return(
      <div>
        {links}
      </div>
    )
  }
}

export default RedditSort;
