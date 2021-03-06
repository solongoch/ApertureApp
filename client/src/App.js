import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import CSS
import "./global.css";
import "./App.css";
// import Components
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Signup from './components/Auth/SignUp/Signup';
import Login from './components/Auth/LogIn/Login';
import Homepage from './components/Home/Homepage';
import Suggestion from './components/Suggestion/Suggestion';
import EditProfile from './components/EditProfile/EditProfile';
import ChangePassword from './components/EditProfile/ChangePassword';
import ProfilePage from './components/Profile/ProfilePage';
import CreatePost from './components/Post/CreatePost';
import Followers from './components/Follow/Followers';
import Followings from './components/Follow/Followings';
import Unfollow from './components/Follow/Unfollow';
import Footer from './components/Layout/Footer';
import SinglePost from './components/Post/SinglePost';
import NotFound from './components/NotFound/NotFound'
//import Provide
import { Provider } from 'react-redux';
//import store
import store from './store';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER } from './actions/types';
import { logoutUser } from './actions/authActions';
import { getCurrentProfile } from './actions/profileActions';

import PrivateRoute from './components/common/PrivateRoute';


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
  else {
    /* to restore the currentUserProfile when user closes the browser and
    JWT token is still valid in local storage */
    store.dispatch(getCurrentProfile());
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
              {/* Add public routes here*/}
              <Route exact path="/" component={Landing} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile/:username" component={ProfilePage} />
              <Route exact path="/not-found" component={NotFound} />

              {/* Add private routes here */}
              <Switch>
                <PrivateRoute exact path="/home" component={Homepage} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/suggestion" component={Suggestion} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/changepassword" component={ChangePassword} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit/:username" component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profile/:username/followings" component={Followings} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profile/:username/followers" component={Followers} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profile/:username/unfollow" component={Unfollow} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:postId" component={SinglePost} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create" component={CreatePost} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;