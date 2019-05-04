import React from "react";
import { connect } from "react-redux";

import { signInUser, signUpUser } from "../actions/user.actions";

class SignInPage extends React.Component {
  state = {
    isLogin: true,
    email: "",
    password: "",
    password_confirmation: ""
  };

  handleSwapForm = event => {
    event.preventDefault();
    this.setState({ ...this.state, isLogin: !this.state.isLogin });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  handleChange = event => {
    this.setState({ ...this.state, [event.target.id]: event.target.value });
  };

  validateData = () => {
    const { isLogin, email, password, password_confirmation } = this.state;
    if (isLogin) return email.length > 0 && password.length > 0;
    return (
      email.length > 0 &&
      password.length > 0 &&
      password_confirmation.length > 0
    );
  };

  handleSubmit = event => {
    event.preventDefault();

    const { isLogin } = this.state;

    if (!this.validateData()) {
      return;
    }

    if (isLogin) {
      this.props.dispatch(signInUser(this.state));
    } else {
      this.props.dispatch(signUpUser(this.state));
    }
  };

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            onChange={this.handleChange}
            className="form-control"
            id="email"
            value={this.state.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={this.handleChange}
            className="form-control"
            id="password"
            placeholder="Password"
          />
        </div>
        {!this.state.isLogin && (
          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input
              type="password"
              onChange={this.handleChange}
              className="form-control"
              id="password_confirmation"
              placeholder="Confirm Password"
            />
          </div>
        )}
        <div className="row">
          <div className="col text-center">
            <button
              onClick={this.handleSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col text-center">
            <button onClick={this.handleSwapForm} className="btn btn-secondary">
              already have an account?
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default connect()(SignInPage);
