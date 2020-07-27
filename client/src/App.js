import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import CSS
import "./App.css";
import "./components/css/global.css";
// import Components
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Homepage from "./components/Layout/Homepage";
import Suggestion from "./components/Layout/Suggestion";
import EditProfile from './components/EditProfile/EditProfile';
import CreateProfile from './components/EditProfile/CreateProfile.js';
import ChangePassword from './components/Auth/ChangePassword'
import Profile from './components/Layout/Profile';
import CreatePost from './components/Layout/CreatePost';
import Followers from './components/Layout/Followers';
import Followings from './components/Layout/Followings';
import Unfollow from './components/Layout/Unfollow';
import Footer from './components/Layout/Footer';
import SinglePost from "./components/Layout/SinglePost";
import { Provider } from 'react-redux';//import Provider
import store from './store';//import store
import setAuthToken from "./utils/setAuthToken";//For setting token on request header
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER } from './actions/types';
import { logoutUser } from './actions/authActions';

//scenario if User goes out to some other page(app) and comes back to our app before token expires
//Check for token
if (localStorage.jwtToken) {
  //Set auth header with the token
  setAuthToken(localStorage.jwtToken);
  //decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  //write user data to redux store
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });
  
  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Route exact path="/" component={Landing} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/home" component={Homepage} />
              <Route exact path="/suggestion" component={Suggestion} />
              <Route exact path="/edit" component={EditProfile} />
              <Route exact path="/createprofile" component={CreateProfile} />
              <Route exact path='/changepassword' component={ChangePassword} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/single-post" component={SinglePost} />
              <Route path='/create' component={CreatePost} />
              <Route exact path='/profile/followers' component={Followers} />
              <Route exact path='/profile/followings' component={Followings} />
              <Route exact path='/profile/unfollow' component={Unfollow} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
