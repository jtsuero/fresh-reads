import React, { Component } from 'react';
import './App.css';
import FetchStories from './FetchStories.js';
import StoryRender from './StoryRender.js';

class App extends Component {
  constructor() {
    super()
    this.state = {
      gitRepos: null,
      hackerStories: null,
      redditStories: null
    }
  }

  componentDidMount = () => {
    this.getReddit();
    this.getHackerNews();
    this.getGit();
  }

  getGit = () => {
    FetchStories.getGit().then((gitRepos) => {
      this.setState({gitRepos})
    });
  }

  getHackerNews = () => {
    FetchStories.getTopHackerNewsStories().then((hackerStories) => {
      this.setState({hackerStories});
    });
  }

  getReddit = () => {
    FetchStories.getReddit().then((redditStories) => {
      this.setState({redditStories})
    });
  }

  renderLoadingHeader = () => {
    return (
      <div className="App-header">
        loading...
      </div>
    )
  }

  renderStories = () => {
    return (
      <div className = "App-link">
        <header className = "App-header">
          <StoryRender redditStories = {this.state.redditStories} gitRepos = {this.state.gitRepos} hackerNews = {this.state.hackerStories}/>
        </header>
      </div>

    )
  }

  render() {
    if(this.state.redditStories !== null && this.state.gitRepos !== null & this.state.hackerStories !== null) {
      return (
        this.renderStories()
      )	
    } else {
      return (
        this.renderLoadingHeader()
      )
    }
  }
}

export default App;
