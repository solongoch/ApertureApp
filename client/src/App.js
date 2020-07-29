import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
import ProfileHeader from './components/Profile/ProfileHeader';
import CreatePost from './components/Post/CreatePost';
import Followers from './components/Follow/Followers';
import Followings from './components/Follow/Followings';
import Unfollow from './components/Follow/Unfollow';
import Footer from './components/Layout/Footer';
import SinglePost from './components/Post/SinglePost';
//import Provide
import { Provider } from 'react-redux';
//import store
import store from './store';
import setAuthToken from './utils/setAuthToken';
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
              <Route exact path='/changepassword' component={ChangePassword} />
              <Route exact path="/profile" component={ProfileHeader} />
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