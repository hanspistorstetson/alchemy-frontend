import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./components/Navigation";
import CreateTweet from "./components/CreateTweet";
import HomePage from "./pages/HomePage";
import TweetSearchPage from "./pages/TweetSearchPage";
import UserSearchPage from "./pages/UserSearchPage";
import SignInPage from "./pages/SignInPage";
import ProfilePage from "./pages/ProfilePage";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import "./app.css";
import history from "./history";
import { getMyUser } from "./actions/user.actions";

class App extends Component {
  componentDidMount() {
    const jwt = localStorage.getItem("jwt");
    if (jwt != null) {
      this.props.dispatch(getMyUser(jwt));
    }
  }

  renderMessages = messages => {
    let alerts = Object.keys(messages).map(id => {
      const message = messages[id];
      return (
        <div className={`alert alert-${message.className}`}>
          {message.message}
        </div>
      );
    });

    return alerts;
  };

  render() {
    return (
      <div>
        <Router history={history}>
          <Navigation />
          <div className="container">
            {this.props.messages && this.renderMessages(this.props.messages)}

            {this.props.email && (
              <>
                <CreateTweet />
                <hr />
              </>
            )}
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/tweet-search" component={TweetSearchPage} />
              <Route exact path="/user-search" component={UserSearchPage} />
              <Route exact path="/signin" component={SignInPage} />
              <AuthenticatedRoute
                exact
                path="/profile"
                component={ProfilePage}
              />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.UserReducer.email,
  jwt: state.UserReducer.jwt,
  messages: state.UserReducer.messages
});

export default connect(mapStateToProps)(App);
