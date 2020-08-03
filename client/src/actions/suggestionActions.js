import { GET_SUGGESTED_PROFILES, GET_ERRORS } from "./types";
import axios from "axios";

// Get profile by username
export const getSuggestedProfiles = () => dispatch => {
  axios
    .get("/api/suggestion")
    .then(res => {
      dispatch({
        type: GET_SUGGESTED_PROFILES,
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