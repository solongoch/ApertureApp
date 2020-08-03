import axios from "axios";
import {
  CREATE_POST,
  GET_SINGLE_POST,
  GET_ERRORS
} from "./types";

//Create Post
export const createPost = newPost => dispatch => {
  //API call to MongoDB to Create Post
  axios
    .post("/api/posts/create", newPost)
    .then(res => {
      dispatch({
        type: CREATE_POST,
        payload: res.data.post
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Get SinglePost
export const getSinglePost = (postId, history) => dispatch => {
  // API call to MongoDB to get SinglePost
  axios
    .get(`/api/posts/${postId}`)
    .then(res => {
      dispatch({
        type: GET_SINGLE_POST,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response.status === 404) {
        history.push("/not-found");
      } else {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }});
};

// Post Comment
export const addComment = (postId, commentData) => dispatch => {
  axios
    .post(`/api/post/comment/${postId}`, commentData)
    .then(res => {
      dispatch({
        type: GET_SINGLE_POST,
        payload: res.data.post
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/${id}/lu`)
    .then(res => dispatch(getSinglePost()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/${id}/lu`)
    .then(res => dispatch(getSinglePost()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

