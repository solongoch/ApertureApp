import { CREATE_POST } from '../actions/types';

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
    default:
      return state;
  }

}