class FetchStories {

  static getReddit() {
    return fetch("https://www.reddit.com/r/all.json")
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

  static getHackerNews() {
    return fetch("https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty")
       .then(res => res.json())
       .then((result) => {
         let storyHolder = [];
         for(let i=0; i<result.length; i++) {
           fetch(`https://hacker-news.firebaseio.com/v0/item/${result[i]}.json?print=pretty`)
            .then(res => res.json())
             .then((story) => {
               if(story.score > 150 && story.url) {
               storyHolder.push({title: story.title, link: story.url});
               }
             });
         }
         return storyHolder;
     });
  }

  static getGit() {
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

    return fetch(`https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc`, headers)
      .then(res => res.json())
      .then((result) => {
        for(let i=0; i<result.items.length; i++) {
          if (result.items[i].stargazers_count >= 200) {
            popularRepos.push({title: result.items[i].name, link: result.items[i].svn_url});
          }
        }
        return popularRepos;
      });
  }


}

export default FetchStories;
