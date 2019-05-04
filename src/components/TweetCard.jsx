import React, { Component } from "react";
import { Link } from "react-router-dom";
import dateformat from "dateformat";

export class TweetCard extends Component {
  render() {
    const { username, content, created } = this.props;
    const date = dateformat(
      new Date(created),
      "dddd, mmmm dS, yyyy h:MM:ss TT"
    );
    return (
      <div className="col-md-4 mb-5">
        <div className="card h-100">
          <div className="card-body">
            <h2 className="card-title">
              <Link to={`/user-search?q=${username}`}>{username}</Link>
            </h2>
            <p className="card-text">{content}</p>
          </div>
          <div className="card-footer">
            <h5>Created on:</h5> {date}
          </div>
        </div>
      </div>
    );
  }
}

export default TweetCard;
