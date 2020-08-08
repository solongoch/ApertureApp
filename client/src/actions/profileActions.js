import {
  SET_CURRENT_USER,
  GET_PROFILE,
  GET_PROFILE_BY_USERNAME,
  GET_SEARCHED_PROFILE_BY_USERNAME,
  PROFILE_LOADING,
  UPLOAD_AVATAR,
  GET_ERRORS,
  GET_FOLLOWING,
  GET_FOLLOWERS,
  FOLLOW_USER,
  UNFOLLOW_USER,
  CLEAR_CURRENT_PROFILE
} from "./types";

import axios from "axios";
import { logoutUser } from "./authActions";

// Get profile by username
export const getProfileByUsername = (username, authUsername, history) => dispatch => {
  axios
    .get(`/api/profile/${username}`)
    .then(res => {
      if (username === authUsername) {
        dispatch({
          type: GET_PROFILE_BY_USERNAME,
          payload: res.data
        });
      } else {
        dispatch({
          type: GET_SEARCHED_PROFILE_BY_USERNAME,
          payload: res.data
        });
      }
      history.push(`/profile/${res.data.username}`);
    })
    .catch(err => {
      // 404 ERROR. if user not found redirect to "/not-found"
      if (err.response.status === 404) {
        history.push("/not-found");
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
};

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/accounts/edit")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Edit Profile
export const editProfile = profileData => dispatch => {
  axios
    .post("/api/profile/accounts/edit", profileData)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Upload Avatar
export const uploadAvatar = newAvatar => dispatch => {
  axios
    .put("/api/profile/editavatar", newAvatar)
    .then(res => {
      dispatch({
        type: UPLOAD_AVATAR,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete account & profile
export const deleteAccount = history => dispatch => {
  if (window.confirm("Are you sure you want to delete your account?")) {
    axios
      .delete("/api/remove")
      .then(res => {
        history.push("/");
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        });
        dispatch(logoutUser());
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};

//Change Password
export const changePassword = (changePass, history) => dispatch => {
  //API call
  axios
    .post("/api/changepassword", changePass)
    .then(res => {
      history.push("/home");
    })
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

//Get Followings
export const getFollowings = username => dispatch => {
  axios
    .get(`/api/${username}/following`)
    .then(res => {
      dispatch({
        type: GET_FOLLOWING,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//Get Followings
export const getFollowers = username => dispatch => {
  axios
    .get(`/api/${username}/followers`)
    .then(res => {
      dispatch({
        type: GET_FOLLOWERS,
        payload: res.data
      });
    })
    .catch(err => console.log(err.response.data));
};

// Follow user
export const followUser = userId => dispatch => {
  axios
    .put(`/api/${userId}/follow`)
    .then(res => {
      dispatch({
        type: FOLLOW_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err.response.data));
};

// Unfollow user
export const unfollowUser = userId => dispatch => {
    axios
      .put(`/api/${userId}/unfollow`)
      .then(res => {
        console.log(res.data)
        dispatch({
          type: UNFOLLOW_USER,
          payload: res.data
        });
      })
      .catch(err => console.log(err.response.data));
};

// Clear current profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
