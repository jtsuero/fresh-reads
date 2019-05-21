import React, { Component } from 'react';
import './App.css';

class StoryRender extends Component {

  renderList = (story) => {
    return (
      <div>
        <p><a href = {story.link} className = "App-link">{story.title} </a></p>
      </div>
    )
  }

  render() {
    const redditLinks = this.props.redditStories.map(this.renderList);
    const gitLinks = this.props.gitRepos.map(this.renderList);
    const hackerLinks = this.props.hackerNews.map(this.renderList);
    return(
      <div className = "App-link">
        <h1> GitHub Repos </h1>
          {gitLinks}
        <h1> Hacker News </h1>
          {hackerLinks}
        <h1> Reddit Posts </h1>
          {redditLinks}
      </div>
    )
  }
}

export default StoryRender;
