import React, { Component } from "react";
import TweetList from "../components/TweetList";
import { connect } from "react-redux";
import { fetchTweets } from "../actions/tweet.actions";

export class HomePage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTweets());
  }

  render() {
    return (
      <div className="text-center">
        <h1>Recent Elixirs</h1>
        <TweetList tweets={this.props.tweets} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tweets: state.TweetReducer.tweets
});

export default connect(mapStateToProps)(HomePage);
