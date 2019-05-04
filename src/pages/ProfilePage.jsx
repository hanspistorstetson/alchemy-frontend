import React from "react";
import { connect } from "react-redux";
import TweetList from "../components/TweetList";
import { fetchTweetsByJwt } from "../actions/tweet.actions";
import { getStatistics } from "../actions/user.actions";

class ProfilePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchTweetsByJwt(this.props.jwt));
    this.props.dispatch(getStatistics(this.props.jwt));
  }

  render() {
    return (
      <div className="text-center">
        <h1>Statistics </h1>
        <ul className="list" style={{ listStyle: "none" }}>
          <li className="list-item">
            <b>Total Tweets:</b> {this.props.stats.total_tweets}
          </li>
        </ul>
        <hr />
        <h1>Recent Elixirs</h1>
        <TweetList tweets={this.props.tweets} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tweets: state.TweetReducer.tweets,
  jwt: state.UserReducer.jwt,
  stats: state.UserReducer.statistics
});

export default connect(mapStateToProps)(ProfilePage);
