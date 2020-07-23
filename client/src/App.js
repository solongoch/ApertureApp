import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
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
import EditProfile from './components/Auth/EditProfile';
import ChangePassword from './components/Auth/ChangePassword'
import Profile from "./components/Layout/Profile";
import CreatePost from './components/Layout/CreatePost';
import Followers from './components/Layout/Followers';
import Followings from './components/Layout/Followings';
import Unfollow from './components/Layout/Unfollow';
import Footer from './components/Layout/Footer';
import store from './store';

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
            <Route exact path='/changePassword' component={ChangePassword} />
            <Route exact path="/profile" component={Profile} />
            <Route path='/create' component={CreatePost} />
            <Route exact path='/followers' component={Followers} />
            <Route exact path='/followings' component={Followings} />
            <Route exact path='/unfollow' component={Unfollow} />
            <Route exact path="/edit" component={EditProfile} />
          </div>
          <Footer />
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;