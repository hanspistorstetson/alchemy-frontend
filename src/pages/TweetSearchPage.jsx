import React, { Component } from "react";
import TweetList from "../components/TweetList";
import queryString from "query-string";
import { connect } from "react-redux";
import { fetchSearchTweets } from "../actions/tweet.actions";

export class TweetSearchPage extends Component {
  componentDidMount() {
    const query = queryString.parse(this.props.location.search).q;
    this.props.dispatch(fetchSearchTweets(query));
  }

  render() {
    const query = queryString.parse(this.props.location.search).q;
    return (
      <div className="text-center">
        <h1>Elixirs containing `{query}`</h1>
        <TweetList tweets={this.props.tweets} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tweets: state.TweetReducer.tweets
});

export default connect(mapStateToProps)(TweetSearchPage);
