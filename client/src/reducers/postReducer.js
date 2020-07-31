import { CREATE_POST, GET_HOMEPAGE_POSTS } from '../actions/types';

const initialState = {
  posts: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
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