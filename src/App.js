import React, { Component } from 'react';
import BoggleGame from './components/BoggleGame.js';
import './App.css';

/* Components */
import Button from './components/Button.js';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Challenges from './components/Challenges.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "home", // home or notReady or ready
      currentUser: null,
      gameType: {
        gameType: "random",
        challengeID: "",
      }, // {gameType: random or challenges | challengeID}
    };
  }

  // Sets the current route of the page
  setCurrentRoute = (page) => {
    this.setState({route: page});
  }

  // Adds the update logged in state
  updateUser = async(state) => {
    this.setState({currentUser: state});
  }

  // Determine if random or challenge grid.
  updateGameType = (event) => {
    // If user clicked on a challenge or random board we update the state accordingly!
    if (event.target !== undefined) {
      const dataId = event.target.getAttribute("data-id");
      this.setState({gameType: {gameType: "challenge", challengeID: dataId} });
    } else {
      this.setState({gameType: {gameType: "random", challengeID: ""}});
    }
  }

  render() {
    console.log(this.state.gameType);
    // user not logged in
    if (this.state.route === "home" && !this.state.currentUser) {
      return (
        <div className="App">
          <Login setLoggedIn={this.updateUser}/>
          <h1>Let's Play Boggle!</h1>
          <Button setCurrentRoute={this.setCurrentRoute} page={"notReady"} text={"Click to Start!"}/>
        </div>
      );
    } 
    // user logged in
    else if (this.state.route === "home" && this.state.currentUser) {
      return (
        <div className="App">
          <div><p style={{float: "right"}}>Hello {this.state.currentUser.displayName}</p></div>
          <div><Logout setLoggedOut={this.updateUser}/></div>
          <h1>Let's Play Boggle!</h1>
          <Button setCurrentRoute={this.setCurrentRoute} page={"notReady"} text={"Click to Start!"}/>
          <div>
            <Challenges updateGameType={this.updateGameType}/>
          </div>
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
            <BoggleGame gameType={this.state.gameType} setCurrentRoute={this.setCurrentRoute} user={this.state.currentUser} />
          </div>
        );
      }
    }
  } 
}

export default App;
