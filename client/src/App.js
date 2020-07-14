import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Signup from './components/Auth/Signup';

class App extends Component {

  render(){
    return (
      <Router>
        <div className="App">
          <Route exact path='/signup' component={Signup} />
        </div>
      </Router>
    );
  }
}

export default App;