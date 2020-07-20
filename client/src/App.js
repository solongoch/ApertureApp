import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Landing from './components/Layout/Landing';
import Login from './components/Auth/Login';
import EditProfile from './components/Auth/EditProfile';
import './App.css';
import Footer from './components/Layout/Footer';


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <div className="container">
        <Route exact path="/" component={Landing} />
        <Route exact path="/edit" component={EditProfile} />
        <Route exact path="/login" component={Login} />
        <Footer />
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
