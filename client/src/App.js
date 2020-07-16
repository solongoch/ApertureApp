import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Signup from './components/Auth/Signup';
import ChangePassword from './components/Auth/ChangePassword'

class App extends Component {

  render(){
    return (
      <Router>
        <div className="App container">
          <Route exact path='/' component={Signup} />
          <Route exact path='/changePassword' component={ChangePassword} />
        </div>
      </Router>
    );
  }
}

export default App;