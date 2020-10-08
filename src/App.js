import React, { Component } from 'react';
import BoggleGame from './components/BoggleGame.js';
import './App.css';


/* Components */
import Button from './components/Button.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "home",
    };
  }


  setCurrentRoute = (page) => {
    this.setState({route: page});
  }


  render() {
    // home
    if (this.state.route === "home") {
    return (
      <div className="App">
        <h1>Let's Play Boggle!</h1>
        <Button setCurrentRoute={this.setCurrentRoute} page={"notReady"} text={"Click to Start!"}/>
      </div>
    );

    // user not ready to play a game
    } else {
      if (this.state.route === "notReady") {
        return (
          <div className="center-screen">
            <Button setCurrentRoute={this.setCurrentRoute} page={"ready"} text={"Ready To Play!"}/>
          </div>
        );
      // user ready to play a game
      } else {
        return (
          <div className="App">
            <BoggleGame setCurrentRoute={this.setCurrentRoute} />
          </div>
        );
      }
    }
  } 
}

export default App;
