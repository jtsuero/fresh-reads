import React, { Component } from 'react';
import './App.css';

class StoryRender extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  renderList = (story) => {
    return  <div>
      <p><a href = {story.link} className = "App-link">{story.title} </a></p>
      </div>
  }

  render() {
    let redditStories = this.props.redditStories;
    let gitRepos = this.props.gitRepos;
    let hackerNews = this.props.hackerNews;
    let redditLinks = redditStories.map(this.renderList);
    let gitLinks = gitRepos.map(this.renderList);
    let hackerLinks = hackerNews.map(this.renderList);
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
