import axios from 'axios';
import {
  UPLOAD_AVATAR,
  GET_ERRORS,
  GET_PROFILE,
  PROFILE_LOADING,
  SET_CURRENT_USER,
  GET_PROFILE_BY_USERNAME
} from './types'


// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/accounts/edit')
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

//Edit Profile

export const editProfile = (profileData) => dispatch => {
  axios
    .post('/api/profile/accounts/edit', profileData)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
     
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    })
}

//Upload Avatar
export const uploadAvatar = (newAvatar) => dispatch => {

  axios.put('/api/profile/editavatar', newAvatar)
    .then(res => {
      dispatch({
        type: UPLOAD_AVATAR,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
}

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure you want to delete your account?')) {
    axios
      .delete('/api/remove')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Get profile by username
export const getProfileByUsername = (username, history) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/${username}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE_BY_USERNAME,
        payload: res.data
      });
    })
    .catch(err => {
      // if user not found redirect to /not-found
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