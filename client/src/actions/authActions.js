import { SET_CURRENT_USER, GET_ERRORS } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { clearCurrentProfile } from "./profileActions";
import { clearPosts } from "./postActions";

//Register User
export const registerUser = (userData, history) => dispatch => {
  //API call
  axios
    .post('/api/users/signup', userData)
    .then(res => {
      history.push('/login')
    })
    .catch(err =>
      dispatch({
        type: 'GET_ERRORS',
        payload: err.response.data
      }));
}

//Login - Get User Token
export const loginUser = userData => dispatch => {
  axios.post("/api/users/login", userData)
    .then((res) => {
      // Save token to localstorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // Set token to axios header
      setAuthToken(token);
      // Decode token
      const decoded = jwt_decode(token);
      // Dispatch set current user
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
};

// Logout user
export const logoutUser = (history) => dispatch => {
  //Remove token from local storage
  localStorage.removeItem('jwtToken');
  //Remove token from auth header
  setAuthToken(false);
  //Reset the redux store to false and {}
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  })
  dispatch(clearCurrentProfile());
  dispatch(clearPosts());
  history.push('/');
}

