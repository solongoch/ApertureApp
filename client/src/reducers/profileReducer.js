import {
  UPLOAD_AVATAR,
  PROFILE_LOADING,
  GET_PROFILE,
  GET_PROFILE_BY_USERNAME,
  GET_SEARCHED_PROFILE_BY_USERNAME,
  GET_MY_FOLLOWING,
  GET_FOLLOWING,
  GET_FOLLOWERS,
  FOLLOW_USER,
  UNFOLLOW_USER,
  CLEAR_CURRENT_PROFILE,
  GET_SUGGESTED_PROFILES
} from "../actions/types";

const initialState = {
  profile: "",
  loading: false,
  followingLists: [],
  followersLists: [],
  searchedProfile: ""
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
    case GET_SEARCHED_PROFILE_BY_USERNAME:
      return {
        ...state,
        searchedProfile: action.payload
      };
    case GET_MY_FOLLOWING:
      return {
        ...state,
        myFollowingList: action.payload || []
      };
    case GET_FOLLOWING:
      return {
        ...state,
        followingLists: action.payload.Following || []
      };
    case GET_FOLLOWERS:
      return {
        ...state,
        followersLists: action.payload.Followers || []
      };
    case FOLLOW_USER: {
      return {
        ...state,
        myFollowingList: [action.payload, ...state.myFollowingList],
        followersLists: [action.myUser, ...state.followersLists]
      };
    }
    case UNFOLLOW_USER: {
      return {
        ...state,
        myFollowingList: state.myFollowingList.filter(
          user => user.user._id !== action.payload.user._id
        ),
        followersLists: state.followersLists.filter(
          user => user.user._id !== action.payload.myId
        ),
      };
    }
    case CLEAR_CURRENT_PROFILE:
      return {
        profile: "",
        followingLists: null,
        searchedUserProfile: null,
        followersLists: null
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