import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Signup from './components/Auth/Signup';
import ChangePassword from './components/Auth/ChangePassword'
import followers from './components/Layout/Followers';
import followings from './components/Layout/Followings';
import unfollow from './components/Layout/Unfollow';


class App extends Component {

  render(){
    return (
      <Router>
        <div className="App container">
          <Route exact path='/' component={Signup} />
          <Route exact path='/changePassword' component={ChangePassword} />
          <Route exact path='/followers' component={followers} />
          <Route exact path='/followings' component={followings} />
          <Route exact path='/unfollow' component={unfollow} />
        </div>
      </Router>
    );
  }
}

export default App;