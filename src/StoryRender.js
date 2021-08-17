import React, {Component} from 'react';
import './App.css';

class StoryRender extends Component {
  renderList = story => {
    return (
      <div className="link-box">
        <a href={story.link} className="link">
          {story.title}
        </a>
      </div>
    );
  };

  render() {
    if (!this.props.stories) {
      return null;
    }
    const stories = this.props.stories.map(this.renderList);
    return (
      <div className="source-container">
        <div className="stories-list-header">{this.props.sourceName}</div>
        {stories}
      </div>
    );
  }
}

export default StoryRender;
