import React, { Component } from "react";
import { connect } from "react-redux";
import TweetCard from "./TweetCard";

export class TweetList extends Component {
  renderTweetCards = () => {
    console.log(this.props.tweets);
    return this.props.tweets.map(tweet => (
      <TweetCard
        key={tweet.id}
        username={tweet.username}
        content={tweet.content}
        created={tweet.created}
      />
    ));
  };

  render() {
    return (
      <div>
        <div className="row">{this.renderTweetCards()}</div>
      </div>
    );
  }
}

export default connect()(TweetList);
