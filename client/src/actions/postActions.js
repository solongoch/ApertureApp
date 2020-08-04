import axios from 'axios';
import {
  CREATE_POST,
  DELETE_POST,
  GET_SINGLE_POST,
  GET_POSTS,
  GET_ERRORS,
  CLEAR_POSTS
} from './types';

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
      }
    });
};

//Delete Post by PostId

export const deletePostById = (postId, username, history) => dispatch => {
  if (window.confirm("Are you sure you want to delete this post?")) {
    axios.delete(`/api/posts/${postId}`)
      .then(res => {
        dispatch({
          type: DELETE_POST,
          payload: postId
        });
        window.alert("Post deleted...")
        history.push(`/profile/${username}`);
      })
      // .then(res => history.push(`/profile/${username}`))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  }
}

//Get Posts
export const getAllPosts = () => dispatch => {
  axios.get('/api/posts/')
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    })
}

// Post Comment
export const addComment = (postId, commentData) => dispatch => {
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
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

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_SINGLE_POST,
        payload: res.data
      })
    )
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
    .put(`/api/posts/${id}/lu`)
    .then(res => dispatch(getSinglePost()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};



// Clear current profile
export const clearPosts = () => {
  return {
    type: CLEAR_POSTS
  };
};
