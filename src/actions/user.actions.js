import axios from "axios";
import userConstants from "../constants/user.constants";
import urlConstants from "../constants/url.constants";
import history from "../history";

export const SIGN_IN_USER = ({ jwt, email }) => ({
  type: userConstants.SIGN_IN_USER,
  jwt: jwt,
  email: email
});

export const ADD_MESSAGE = ({ id, message, className }) => ({
  type: userConstants.ADD_MESSAGE,
  id,
  message,
  className
});

export const REMOVE_MESSAGE = id => ({
  type: userConstants.REMOVE_MESSAGE,
  id
});

export const CHANGE_PATH = ({ path }) => ({
  type: userConstants.CHANGE_PATH,
  path
});

export const SIGN_OUT_USER = () => ({
  type: userConstants.SIGN_OUT_USER
});

export const SIGN_IN_FAILED = () => ({
  type: userConstants.SIGN_IN_FAILED
});

export const GET_STATISTICS = ({ statistics }) => ({
  type: userConstants.GET_STATISTICS,
  statistics: statistics
});

let notificationId = 0;
export const addMessage = (message, className) => dispatch => {
  const id = notificationId++;
  dispatch(ADD_MESSAGE({ id, message, className }));
  setTimeout(() => {
    dispatch(REMOVE_MESSAGE(id));
  }, 5000);
};

export const getStatistics = jwt => dispatch => {
  let config = {
    headers: { Authorization: `bearer ${jwt}` }
  };

  axios.get(urlConstants.STATISTICS_URL, config).then(res => {
    const statistics = {
      total_tweets: res.data.total_tweets
    };
    console.log(statistics);
    dispatch(GET_STATISTICS({ statistics }));
  });
};

export const getMyUser = jwt => dispatch => {
  let config = {
    headers: { Authorization: `bearer ${jwt}` }
  };

  axios.get(urlConstants.MY_PROFILE_URL, config).then(res => {
    const email = res.data.email;
    dispatch(SIGN_IN_USER({ jwt, email }));
  });
};

export const signOutUser = () => dispatch => {
  localStorage.removeItem("jwt");
  dispatch(SIGN_OUT_USER());
  addMessage("Sad to see you go", "secondary");
};

export const signInUser = ({ email, password }) => dispatch => {
  const params = {
    email,
    password
  };
  console.log("Siging in");
  axios
    .post(urlConstants.SIGN_IN_URL, params)
    .then(res => {
      const { jwt, email } = res.data;
      dispatch(SIGN_IN_USER({ jwt, email }));
      localStorage.setItem("jwt", res.data.jwt);
      history.push("/");
      dispatch(addMessage("Welcome back!", "success"));
    })
    .catch(error => dispatch(SIGN_IN_FAILED()));
};

export const signUpUser = ({
  email,
  password,
  password_confirmation
}) => dispatch => {
  const params = {
    user: {
      email,
      password,
      password_confirmation
    }
  };

  console.log(params);
  axios
    .post(urlConstants.SIGN_UP_URL, params)
    .then(res => {
      const { jwt, email } = res.data;
      dispatch(SIGN_IN_USER({ jwt, email }));
      localStorage.setItem("jwt", res.data.jwt);
      history.push("/");
      dispatch(addMessage("Welcome to Alchemy!", "success"));
    })
    .catch(error => dispatch(SIGN_IN_FAILED()));
};
