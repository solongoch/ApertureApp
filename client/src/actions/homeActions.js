import axios from "axios";
import { GET_HOMEPAGE_POSTS, GET_ERRORS } from "./types";

export const getHomepagePosts = history => dispatch => {
  axios
    .get("/api/home")
    .then(res => {
      if (res.data.length === 0) {
        history.push("/suggestion");
      } else {
        dispatch({
          type: GET_HOMEPAGE_POSTS,
          payload: res.data
        });
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    );
};

// Add Like in homepage
export const addLikeHome = (postId, history) => dispatch => {
  axios
    .put(`/api/posts/${postId}/lu`)
    .then(res => dispatch(getHomepagePosts(postId, history)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Post Comment in homepage
export const addCommentHome = (postId, commentData, history) => dispatch => {
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res => dispatch(getHomepagePosts(postId, history)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Comment in homepage
export const deleteCommentHome = (postId, commentId, history) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch(getHomepagePosts(commentId, history))
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};