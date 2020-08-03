import axios from "axios";
import { GET_HOMEPAGE_POSTS, GET_ERRORS } from "./types";

export const getHomepagePosts = (history) => dispatch => {
  axios
    .get("/api/home")
    .then(res => {
      if (res.data.length === 0) {
      history.push("/suggestion");
    } else {
      dispatch({
        type: GET_HOMEPAGE_POSTS,
        payload: res.data
      })}
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    );
};
