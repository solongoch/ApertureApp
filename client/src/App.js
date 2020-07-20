import React, {Component} from 'react';
import './App.css';
import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';
import Profile from './Layout/Profile';
import Homepage from './Layout/Homepage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Homepage />
          {/* <Profile /> */}
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;