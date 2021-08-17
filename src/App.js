import React, {Component} from 'react';
import './App.css';
import FetchStories from './FetchStories.js';
import StoryRender from './StoryRender.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      storySources: {},
    };
  }

  componentDidMount = () => {
    this.getReddit();
    this.getHackerNews();
    this.getGit();
  };

  getGit = () => {
    FetchStories.getGit().then(gitRepos => {
      this.setStoriesFromSource(gitRepos, 'Github Repos');
    });
  };

  getHackerNews = () => {
    FetchStories.getTopHackerNewsStories().then(hackerStories => {
      this.setStoriesFromSource(hackerStories, 'Hacker News');
    });
  };

  getReddit = () => {
    FetchStories.getReddit().then(redditStories => {
      this.setStoriesFromSource(redditStories, 'Reddit Stories');
    });
  };

  setStoriesFromSource(stories, sourceName) {
    const storySources = Object.assign({}, this.state.storySources);
    storySources[sourceName] = stories;
    this.setState({storySources});
  }

  renderLoading = () => {
    return <div>loading...</div>;
  };

  renderStories = () => {
    const sourceNames = Object.keys(this.state.storySources);

    return (
      <div className="main-container">
        {sourceNames.map(sourceName => {
          const stories = this.state.storySources[sourceName];
          return <StoryRender stories={stories} sourceName={sourceName} />;
        })}
      </div>
    );
  };

  render() {
    if (Object.keys(this.state.storySources).length > 0) {
      return (
        <div>
          <div className="app-name">Fresh Reads</div>
          {this.renderStories()}
        </div>
      );
    } else {
      return this.renderLoading();
    }
  }
}

export default App;
