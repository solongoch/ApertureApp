import { UPLOAD_AVATAR, GET_ERRORS } from './types'
import axios from 'axios';

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
