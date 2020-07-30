import {
  UPLOAD_AVATAR,
  GET_PROFILE,
  GET_PROFILE_BY_USERNAME,
  PROFILE_LOADING,
} from '../actions/types'

const initialState =
{
  profile: '',
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case UPLOAD_AVATAR:
      return {
        ...state,
        profile: action.payload
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
    default:
      return state;
  }
}