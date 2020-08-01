import {
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  GET_HOMEPAGE_POSTS
} from '../actions/types';


const initialState = {
  posts: [],
  post: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      }; 
    case GET_HOMEPAGE_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    default:
      return state;
  }
}