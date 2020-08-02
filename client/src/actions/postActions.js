import axios from 'axios';
import { CREATE_POST, GET_ERRORS, POST_COMMENT } from './types';

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

// Post Comment
export const sendComment = (comment) => dispatch => {
  axios
    .post(`/api/post/comment/${postid}`, comment)
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

