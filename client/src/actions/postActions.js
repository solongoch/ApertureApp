import axios from 'axios';
import {
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  GET_POST,
  GET_ERRORS,
  POST_COMMENT
} from './types';

//Create Post
export const createPost = (newPost) => dispatch => {
  //API call to MongoDB to Create Post
  axios.post('/api/posts/create', newPost)
    .then(res => {
      dispatch({
        type: CREATE_POST,
        payload: res.data.post
      })

    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });

}

//Delete Post by PostId

export const deletePostById = (postId, username, history) => dispatch => {
  axios.delete(`/api/posts/${postId}`)
    .then(res => {
      window.confirm("Are you sure you want to delete this post?");
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

//Get post by id

export const getPost = (postId) => dispatch => {
  axios.get(`/api/posts/${postId}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_POST,
        payload: null
      })
    })
}
// Post Comment
export const sendComment = (postId, comment) => dispatch => {
  axios
    .post(`/api/post/comment/${postId}`, comment)
    .then(res => {
      dispatch({
        type: POST_COMMENT,
        payload: res.data.post
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

