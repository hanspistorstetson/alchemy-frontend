import userConstants from "../constants/user.constants";
import history from "../history";

const initialState = {
  jwt: [],
  email: "",
  statistics: {},
  path: "/",
  messages: {}
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.SIGN_IN_USER:
      return { ...state, jwt: action.jwt, email: action.email };

    case userConstants.CHANGE_PATH:
      history.push(action.path);
      return { ...state, path: action.path };

    case userConstants.GET_STATISTICS:
      return { ...state, statistics: action.statistics };

    case userConstants.ADD_MESSAGE:
      const newMessage = {
        id: action.id,
        message: action.message,
        className: action.className
      };
      const newState = Object.assign({}, state.messages);
      newState[action.id] = newMessage;
      return {
        ...state,
        messages: newState
      };

    case userConstants.REMOVE_MESSAGE:
      let newMessages = Object.assign(state.messages);
      delete newMessages[action.id];
      return { ...state, messages: newMessages };

    case userConstants.SIGN_OUT_USER:
      return { ...state, jwt: null, email: null, statistics: null };
    default:
      return { ...state };
  }
};

export default UserReducer;
