import TweetReducer from "./tweet.reducer";
import UserReducer from "./user.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  TweetReducer,
  UserReducer
});

export default rootReducer;
