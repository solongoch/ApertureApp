import { GET_ERRORS, GET_PROFILE_BY_USERNAME } from "./types";
import axios from "axios";

// Get profile by username
export const getProfileByUsername = (username, history) => dispatch => {
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
