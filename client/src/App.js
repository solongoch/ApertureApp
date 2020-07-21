import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
//Import CSS
import './App.css';
//Import Components
import Landing from './components/Layout/Landing';
import Login from './components/Auth/Login';
import EditProfile from './components/Auth/EditProfile';
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
        </div>
        <Footer />
      </div>
    </Router>
    );
  }
}

export default App;
