import axios from 'axios';
import {
  UPLOAD_AVATAR,
  GET_ERRORS,
  GET_PROFILE,
  PROFILE_LOADING,
  SET_CURRENT_USER
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

  // Create Profile
export const createProfile = (profileData, history) => dispatch => {
    axios
      .post('/api/profile/accounts/edit', profileData)
      .then(res => history.push('/profile'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

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
export const deleteAccount = (history) => dispatch => {
  if (window.confirm('Are you sure you want to delete your account?')) {
    axios
      .delete('/api/remove')
      .then(res => {history.push('/'); 
      dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })}
      )
      .catch(err => {
        console.log(err) 
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })}
    );
      
};
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};