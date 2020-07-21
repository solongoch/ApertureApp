import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import CSS
import "./App.css";
import "./components/css/global.css";
// import Components
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Homepage from "./components/Layout/Homepage";
import Suggestion from "./components/Layout/Suggestion";
import Profile from "./components/Layout/Profile";

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