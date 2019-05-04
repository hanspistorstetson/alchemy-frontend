import React, { Component } from "react";
import { connect } from "react-redux";
import { postTweet } from "../actions/tweet.actions";
import history from "../history";

export class CreateTweet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      username: this.props.email.split("@")[0]
    };
  }
  validateData = () => {
    const { content, username } = this.state;
    return content.length > 0 && username.length > 0;
  };
  handleSubmit = event => {
    event.preventDefault();
    if (!this.validateData()) {
      return;
    }
    this.props.dispatch(postTweet(this.state));
  };

  handleChange = event => {
    this.setState({ ...this.state, [event.target.id]: event.target.value });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-sm-8">
              <div className="form-group">
                <textarea
                  className="form-control"
                  onChange={this.handleChange}
                  id="content"
                  rows="3"
                  placeholder="Mix your potion..."
                  aria-describedby="contentHelp"
                />
              </div>
            </div>
            <div className="col-sm-4 vertical-center">
              <div className="form-group">
                <input
                  type="text"
                  onChange={this.handleChange}
                  className="form-control"
                  id="username"
                  name="username"
                  disabled={true}
                  value={this.state.username}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <button
                onSubmit={this.handleSubmit}
                type="submit"
                className="btn btn-primary btn-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ email: state.UserReducer.email });

export default connect(mapStateToProps)(CreateTweet);
