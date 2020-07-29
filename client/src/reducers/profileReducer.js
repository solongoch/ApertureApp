import { UPLOAD_AVATAR, GET_PROFILE } from '../actions/types'

const initialState =
{
  profile: null,
  // profiles: null
}

export default function (state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}