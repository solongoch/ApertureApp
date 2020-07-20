import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import CSS
import "./App.css";
import "./css/global.css";
// import Components
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import Homepage from "./Layout/Homepage";
import Suggestion from "./Layout/Suggestion";
import Profile from "./Layout/Profile";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Route exact path="/" component={Homepage} />
            <Route exact path="/suggestion" component={Suggestion} />
            <Route exact path="/profile" component={Profile} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;