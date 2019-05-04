import tweetConstants from "../constants/tweet.constants";
const initialState = {
  tweets: []
};
const TweetReducer = (state = initialState, action) => {
  console.log("tweetin");
  switch (action.type) {
    case tweetConstants.GET_ALL_TWEETS:
      return { ...state, tweets: action.tweets };

    case tweetConstants.GET_SEARCH_TWEETS:
      return { ...state, tweets: action.tweets };
    default:
      return state;
  }
};

export default TweetReducer;
