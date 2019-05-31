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
      const storySources = Object.assign({}, this.state.storySources);
      storySources["Github Repos"] = gitRepos;
      this.setState({storySources});
    });
  }

  getHackerNews = () => {
    FetchStories.getTopHackerNewsStories().then((hackerStories) => {
      const storySources = Object.assign({}, this.state.storySources);
      storySources["Hacker News"] = hackerStories;
      this.setState({storySources});
    });
  }

  getReddit = () => {
    FetchStories.getReddit().then((redditStories) => {
      const storySources = Object.assign({}, this.state.storySources);
      storySources["Reddit Stories"] = redditStories;
      this.setState({storySources});
    });
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
