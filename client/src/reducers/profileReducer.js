import {
  UPLOAD_AVATAR,
  PROFILE_LOADING,
  GET_PROFILE,
  GET_PROFILE_BY_USERNAME,
  GET_SUGGESTED_PROFILES
} from "../actions/types";

const initialState = {
  profile: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_AVATAR:
      return {
        ...state,
        profile: action.payload
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case GET_PROFILE_BY_USERNAME:
      return {
        ...state,
        profile: action.payload
      };
    case GET_SUGGESTED_PROFILES:
      return {
        ...state,
        suggestions: action.payload
      };
    default:
      return state;
  }
}