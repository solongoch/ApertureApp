import {
  UPLOAD_AVATAR,
  PROFILE_LOADING,
  GET_PROFILE,
  GET_PROFILE_BY_USERNAME,
  GET_FOLLOWING,
  UNFOLLOW_USER,
  GET_SUGGESTED_PROFILES
} from "../actions/types";

const initialState = {
  profile: "",
  loading: false,
  followingLists: null
};

export default function (state = initialState, action) {
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
    case GET_FOLLOWING:
      return {
        ...state,
        followingLists: action.payload.Following
      };
      case UNFOLLOW_USER:
        {
          console.log("action.payload",action.payload);
          console.log("oldFollowingList",state.followingLists);
          
          return {
            ...state,
            followingLists: state.followingLists.filter(user => user.user._id !==action.payload)
          };

        }
    case GET_SUGGESTED_PROFILES:
      return {
        ...state,
        suggestions: action.payload
      };
    default:
      return state;
  }
}