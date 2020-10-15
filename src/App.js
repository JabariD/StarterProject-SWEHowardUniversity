import React, { Component } from 'react';
import BoggleGame from './components/BoggleGame.js';
import './App.css';

/* Components */
import Button from './components/Button.js';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout'

/* Firebase */
import firebase from 'firebase/app'; // firebase core
import 'firebase/firestore' // db
import 'firebase/auth' // auth


firebase.initializeApp({
  apiKey: "AIzaSyAxiryizTTWs__o8DDnGC9bJFQXyaScD1A",
  authDomain: "starterproject-swehu.firebaseapp.com",
  databaseURL: "https://starterproject-swehu.firebaseio.com",
  projectId: "starterproject-swehu",
  storageBucket: "starterproject-swehu.appspot.com",
  messagingSenderId: "853080662051",
  appId: "1:853080662051:web:00f1497fc144995e50d196"
});

//const firestore = firebase.firestore();
const auth = firebase.auth();

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "home",
      currentUser: null,
    };
  }

  // Sets the current route of the page
  setCurrentRoute = (page) => {
    this.setState({route: page});
  }

  // Adds the update logged in state
  updateUser = (state) => {
    this.setState({currentUser: state});
  }

  render() {
    console.log(this.state.currentUser);
    // user not logged in
    if (this.state.route === "home" && !this.state.currentUser) {
      return (
        <div className="App">
          <Login firebase={firebase} auth={auth} setLoggedIn={this.updateUser}/>
          <h1>Let's Play Boggle!</h1>
          <Button setCurrentRoute={this.setCurrentRoute} page={"notReady"} text={"Click to Start!"}/>
        </div>
      );
    } 
    // user logged in
    else if (this.state.route === "home" && this.state.currentUser) {
      console.log(this.state.currentUser);
    return (
      <div className="App">
        <div><p style={{float: "right"}}>Hello {this.state.currentUser.displayName}</p></div>
        <div><Logout auth={auth} setLoggedOut={this.updateUser}/></div>
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
