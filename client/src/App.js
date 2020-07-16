import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Landing from './components/Layouts/Landing';
import Login from './components/Auth/Login';
import EditProfile from './components/Auth/Edit-profile'

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route exact path="/accounts/edit" component={EditProfile} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
    );
  }
}

export default App;
