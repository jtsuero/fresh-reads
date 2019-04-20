import React, { Component } from 'react';
import './App.css';
import loading from './loading.gif';

class App extends Component {
  constructor() {
    super()
    this.getStories = this.getStories.bind(this);
    this.state = {
      stories: null,
      isLoaded: false,
      eachStory: null,
      isGitLoaded: false,
      gitStories: null,
      redditLoaded: false,
      redditStories: null
    }
  }
  componentDidMount () {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
      .then(res => res.json())
      .then((result) => {
        this.setState({stories: result, isLoaded: true}, ()=> console.log('loaded:', this.state));
      });
  }

  getStories() {
    if(this.state.isLoaded && this.state.eachStory === null ) {

      let storyHolder = [];
      for(let i = 0; i < this.state.stories.length; i++) {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${this.state.stories[i]}.json?print=pretty`)
          .then(res => res.json())
          .then((result) => {
            storyHolder.push(result)
            if (storyHolder.length === this.state.stories.length){
              this.setState({eachStory: storyHolder}, ()=> console.log(this.state))
            }
          });
      }
    }
  }

  getGit() {
    let headers = {"Authorization": "token 2dadcf6008f73aae2f5307d95d15a1aa1407086f"};
    let popularRepos = [];
    let today = new Date();
    let year = today.getFullYear();
    let day = today.getDate();
    let month = today.getMonth();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    let date = year + "-"+ month + "-" + day;
    fetch(`https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc`, headers)
      .then(res => res.json())
      .then((result) => {
        for(let i=0; i<result.items.length; i++) {
          if (result.items[i].stargazers_count >= 200) {
            popularRepos.push(result.items[i]);
          }
        }
        this.setState({gitStories : popularRepos}, () => console.log(this.state))
      });
  }

  getReddit() {
    fetch("https://www.reddit.com/r/all.json")
      .then(res => res.json())
      .then((result) => {
        if(!this.state.redditLoaded && result !== null){
          console.log(result);
          let topRedditList = result.data.children
          console.log(result.data.children);
          this.setState({redditLoaded: true, redditStories: result.data.children})
        }
      })
  }


  render() {
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
