import React, { Component } from 'react';
import './App.css';
import FetchStories from './FetchStories.js';
import StoryRender from './StoryRender.js';
import loading from './loading.gif';

class App extends Component {
  constructor() {
    super()
    this.state = {
      gitRepos: null,
      hackerNews: null,
      redditStories: null
    }
  }

  //have the calls live in component did mount, call out to module
  componentDidMount = () => {
    this.getReddit();
    this.getHackerNews();
    this.getGit();
  }

  getGit = () => {
    FetchStories.getGit().then((gitRepos) => {
      this.setState({gitRepos: gitRepos})
    });
  }

  getHackerNews = () => {
    FetchStories.getHackerNews().then((hackerStories) => {
     this.setState({hackerNews: hackerStories});
    });
  }

  //Gives back array of objects of title and link
  getReddit = () => {
    FetchStories.getReddit().then((redditStories) => {
          this.setState({redditStories: redditStories})
    });
  }


  render() {
    if(this.state.redditStories !== null && this.state.gitRepos !== null & this.state.hackerNews !== null) {
    return (
      <div className = "App-link">
      <header className = "App-header">
      <StoryRender redditStories = {this.state.redditStories} gitRepos = {this.state.gitRepos} hackerNews = {this.state.hackerNews}/>
      </header>
      </div>
    )	
    } else {
      return (
        <div className="App-header">
          loading...
        <br />
          <img src={loading} alt="" />
        </div>
      )
    }
  }
}

export default App;
