import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import history from "../history";
import { addMessage } from "../actions/user.actions";

class AuthenticatedRoute extends React.Component {
  render() {
    if (!this.props.isLoggedIn) {
      this.props.dispatch(
        addMessage("You must be logged in to view that", "danger")
      );
      history.push("/");
      return null;
    } else {
      return <Route {...this.props} />;
    }
  }
}

const mapStateToProps = state => ({ isLoggedIn: !!state.email });

export default connect(mapStateToProps)(AuthenticatedRoute);
