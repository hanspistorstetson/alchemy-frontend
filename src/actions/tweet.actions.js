import axios from "axios";
import tweetConstants from "../constants/tweet.constants";
import urlConstants from "../constants/url.constants";
import history from "../history";

export const GET_ALL_TWEETS = tweets => ({
  type: tweetConstants.GET_ALL_TWEETS,
  tweets
});

export const GET_SEARCH_TWEETS = tweets => ({
  type: tweetConstants.GET_SEARCH_TWEETS,
  tweets
});

export const fetchTweetsByJwt = jwt => dispatch => {
  let config = {
    headers: { Authorization: `bearer ${jwt}` }
  };

  axios
    .get(urlConstants.USER_TWEETS_URL, config)
    .then(res => dispatch(GET_ALL_TWEETS(res.data.tweets)))
    .catch(error => console.error(error.response));
};

export const fetchTweets = () => dispatch => {
  axios
    .get(urlConstants.TWEET_URL)
    .then(res => dispatch(GET_ALL_TWEETS(res.data.tweets)))
    .catch(error => console.log(error.status));
};

export const fetchSearchTweets = query => dispatch => {
  axios
    .get(`${urlConstants.TWEET_URL}/search?q=${query}`)
    .then(res => dispatch(GET_SEARCH_TWEETS(res.data.tweets)))
    .catch(error => console.error(error.response));
};

export const fetchUserTweets = query => dispatch => {
  axios
    .get(`${urlConstants.TWEET_URL}/user?q=${query}`)
    .then(res => dispatch(GET_SEARCH_TWEETS(res.data.tweets)))
    .catch(error => console.error(error.response));
};

export const postTweet = ({ content, username }) => dispatch => {
  const tweetParams = {
    tweet: {
      content,
      username
    }
  };
  axios
    .post(urlConstants.TWEET_URL, tweetParams)
    .then(res => {
      dispatch(fetchTweets());
      history.push("/");
    })
    .catch(err => console.error(err.response));
};
