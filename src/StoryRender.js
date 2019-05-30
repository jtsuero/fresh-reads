import React, { Component } from 'react';
import './App.css';

class StoryRender extends Component {

  renderList = (story) => {
    return (
        <p><a href = {story.link} className='app-link'>{story.title} </a></p>
    )
  }

  render() {
    const redditLinks = this.props.redditStories.map(this.renderList);
    const gitLinks = this.props.gitRepos.map(this.renderList);
    const hackerLinks = this.props.hackerNews.map(this.renderList);
    return(
      <div>
        <h1 className='stories-list-header'> GitHub Repos </h1>
          {gitLinks}
        <h1 className='stories-list-header'> Hacker News </h1>
          {hackerLinks}
        <h1 className='stories-list-header'> Reddit Posts </h1>
          {redditLinks}
      </div>
    )
  }
}

export default StoryRender;
