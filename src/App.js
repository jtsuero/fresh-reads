import React, { Component } from 'react';
import './App.css';
import FetchStories from './FetchStories.js';
import StoryRender from './StoryRender.js';

class App extends Component {
  constructor() {
    super()
    this.state = {
      storySources: {},
    }
  }

  componentDidMount = () => {
    this.getReddit();
    this.getHackerNews();
    this.getGit();
  }

  getGit = () => {
    FetchStories.getGit().then((gitRepos) => {
      let sourceName = "Github Repos";
      this.setStoriesFromSource(gitRepos, sourceName);
    });
  }

  getHackerNews = () => {
    FetchStories.getTopHackerNewsStories().then((hackerStories) => {
      let sourceName = "Hacker News";
      this.setStoriesFromSource(hackerStories, sourceName);
    });
  }

  getReddit = () => {
    FetchStories.getReddit().then((redditStories) => {
      let sourceName = "Reddit Stories";
      this.setStoriesFromSource(redditStories, sourceName);
    });
  }

  setStoriesFromSource(stories, sourceName) {
    const storySources = Object.assign({}, this.state.storySources);
    storySources[sourceName] = stories;
    this.setState({storySources});
  }

  renderLoading = () => {
    return (
      <div>
        loading...
      </div>
    )
  }

  renderStories = () => {
    const sourceNames = Object.keys(this.state.storySources)

    return (
      <div>
         {sourceNames.map(sourceName => {
            const stories = this.state.storySources[sourceName]
            return <StoryRender stories={stories} sourceName={sourceName} />
         })}
      </div>

    )
  }

  render() {
    if(Object.keys(this.state.storySources).length > 0) {
      return (
        this.renderStories()
      )	
    } else {
      return (
        this.renderLoading()
      )
    }
  }
}

export default App;
