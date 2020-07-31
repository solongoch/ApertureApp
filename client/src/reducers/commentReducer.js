import { POST_COMMENT } from '../actions/types';

const initialState = {
  comments: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comment]
      };
    default:
      return state;
  }

}