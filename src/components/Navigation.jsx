import React, { Component } from "react";
import { connect } from "react-redux";
import history from "../history";
import { signOutUser, CHANGE_PATH } from "../actions/user.actions";

export class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
  }

  handleLink = (event, path) => {
    event.preventDefault();

    this.props.dispatch(CHANGE_PATH({ path }));
  };

  logout = () => {
    this.props.dispatch(signOutUser());
  };
  handleSearch = event => {
    event.preventDefault();
    history.push("/tweet-search?q=" + this.state.search);
  };
  handleChange = event => {
    this.setState({
      search: event.target.value
    });
  };
  render() {
    const path = this.props.path;
    console.log(this.props.loggedIn);
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="/">
          Alchemy
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form
            onSubmit={this.handleSearch}
            className="form-inline my-2 my-lg-0 mr-auto"
          >
            <input
              onChange={this.handleChange}
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
          <ul className="navbar-nav">
            <li className={`nav-item ${path === "/" ? "active" : null}`}>
              <a
                onClick={event => this.handleLink(event, "/")}
                className="nav-link"
                href="/"
              >
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            {this.props.loggedIn && (
              <>
                <li
                  className={`nav-item ${
                    path === "/profile" ? "active" : null
                  }`}
                >
                  <a
                    onClick={event => this.handleLink(event, "/profile")}
                    className="nav-link"
                    href="/profile"
                  >
                    Profile
                  </a>
                </li>
                <li className={`nav-item `}>
                  <a onClick={this.logout} className="nav-link" href="/signout">
                    Sign out
                  </a>
                </li>
              </>
            )}
            {!this.props.loggedIn && (
              <li
                className={`nav-item ${path === "/signin" ? "active" : null}`}
              >
                <a
                  onClick={event => this.handleLink(event, "/signin")}
                  className="nav-link"
                  href="/signin"
                >
                  Sign In/Up
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.UserReducer.email,
  path: state.UserReducer.path
});

export default connect(mapStateToProps)(Navigation);
