import axios from "axios";
import {
  CREATE_POST,
  GET_SINGLE_POST,
  POST_COMMENT,
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
export const sendComment = comment => dispatch => {
  axios
    .post("/api/post/comment/${postid}", comment)
    .then(res => {
      dispatch({
        type: POST_COMMENT,
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