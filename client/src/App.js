import React,{Component}from 'react';
import './App.css';
// import Navbar from './components/Layout/Navbar';
import Signup from './components/Auth/Signup';

class App extends Component {
 
  render(){
    return (
      <div className="App">
        {/* <Navbar/> */}
        <Signup/>
      </div>
    );


  }
}

export default App;
