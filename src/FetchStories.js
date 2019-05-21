class FetchStories {

  static getReddit() {
    const redditUrl = "https://www.reddit.com/r/all.json";
    return fetch(`${redditUrl}`)
      .then(res => res.json())
      .then((result) => result.data.children)
      .then((storyArray) => {
        let storyData = [];
        for(let i = 0; i < storyArray.length; i++) {
          let storyLink = "https://www.reddit.com" + storyArray[i].data.permalink;
          let storyTitle = storyArray[i].data.title;
          storyData.push({title: storyTitle, link: storyLink});
        }
        return storyData;
      });
  }

  static getHackerNewsStory(storyId) {
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`)
      .then(res => res.json())
      .then(story => {
          return {title: story.title, link: story.url, score: story.score};
        }
      );
  }

  static getHackerNewsStoriesIds() {
    const hackerNewsUrl = "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty";
    // const storyScore = 150;
    return fetch(hackerNewsUrl)
      .then(res => res.json())
  }

  static getTopHackerNewsStories() {
    const minStoryScore = 150;
    return this.getHackerNewsStories().then(stories => {
      return stories.filter(story => story.score > minStoryScore && story.link);
    });
  }

  static getHackerNewsStories() {
    return this.getHackerNewsStoriesIds().then(storyIds => {
    let storyRequests = [];
      storyIds.forEach(storyId => {
        storyRequests.push(this.getHackerNewsStory(storyId));
      });
      return Promise.all(storyRequests)
    });
  }

  static getGit() {
    const headers = {"Authorization": "token 2dadcf6008f73aae2f5307d95d15a1aa1407086f"};
    const today = new Date();
    const year = today.getFullYear();
    const minStarGazers = 200; //number of people following that particular Repo
    let day = today.getDate();
    let month = today.getMonth();

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }


    let popularRepos = [];
    const gitHubUrl = `https://api.github.com/search/repositories?q=created:>${year}-${month}-${day}&sort=stars&order=desc`
    return fetch(`${gitHubUrl}`, headers)
      .then(res => res.json())
      .then((result) => {
        for(let i=0; i<result.items.length; i++) {
          if (result.items[i].stargazers_count >= minStarGazers) {
            popularRepos.push({title: result.items[i].name, link: result.items[i].svn_url});
          }
        }
        return popularRepos;
      });
  }


}

export default FetchStories;
