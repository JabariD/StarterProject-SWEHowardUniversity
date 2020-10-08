import React, { Component } from 'react'

import Board from './boggle_game/Board.js';
import Timer from './boggle_game/Timer';
import FoundWords from './boggle_game/FoundWords';
import TakeUserInput from './boggle_game/TakeUserInput';

// For init of boggle game
import RandomGrid from '../boggle/board_generator.js'; // generate board
import findAllSolutions from '../boggle/boggle_solver'; // solves board

import Button from './Button';

class BoggleGame extends Component {
    constructor() {
        super();
        this.state = {
          state: "running",
          foundWords: [],
          board:  [[]],
          dictionaryForBoard: [],
          userGuess: "",
          points: 0,
        };
    }

    componentDidMount() {
        this.getBoardAndDictionaryForBoard()
    }

    // Get board and dictionary for current board
    getBoardAndDictionaryForBoard = () => {
        const board = RandomGrid();
        this.setState({board: board})
        const dict = findAllSolutions(board, []);
        this.setState({dictionaryForBoard: dict});
        console.log("dict", dict);
    }

    // Update the text field of what user typed in
    updateUserGuess = (event) => {
        this.setState({userGuess: event.target.value});
    }

    // Update game state
    updateGameState = () => {
        this.setState({state: "halted"});
    }

    // Update overlay
    updateOverlay = (state) => {
        if (state) {
            document.getElementById("overlay").style.display = "block";
        } else {
            document.getElementById("overlay").style.display = "none";
        }
    }

    // User submitted word, let's try to update the state of the game
    submitWord = () => {
        const { userGuess, foundWords, dictionaryForBoard, points } = this.state;

        if (userGuess === "") {
            console.log("Cannot add empty word.");
        } else if (foundWords.includes(userGuess)) {
            this.updateOverlay(true);
        } 
        else if (dictionaryForBoard.includes(userGuess) && userGuess.length > 2) {
            // found word
            this.setState({foundWords: [userGuess, ...foundWords]})

            // update points
            const lengthOfWord = userGuess.length;
            if (lengthOfWord < 5) {
                this.setState({points: points + 1});
            } else if (lengthOfWord === 5) {
                this.setState({points: points + 2});
            } else if (lengthOfWord === 6) {
                this.setState({points: points + 3});
            } else if (lengthOfWord === 7) {
                this.setState({points: points + 5});
            } else {
                this.setState({points: points + 11});
            }
        } else {
            console.log("Could not add for some reason!");
        }

        document.getElementById("userWord").value = "";
    }

    render() {
        if (this.state.state === "running") {
            return (
                <div>
                    <div id="overlay" onClick={() => this.updateOverlay(false)} style={overlayStyle}>
                        <div id="text" style={overlayTextStyle}>Error - Duplicate word </div>
                    </div>
                    <Button text={"Stop"} page={""} setCurrentRoute={this.updateGameState}/><br></br>
                    <Timer updateGameState={this.updateGameState}/>
                    <h5>{this.state.points} points</h5>
                    <div>
                        <Board board={this.state.board}/>
                        <TakeUserInput updateUserGuess={this.updateUserGuess} submitWord={this.submitWord}/>
                        <FoundWords foundWords={this.state.foundWords}/>
                    </div>
                    
                </div>
            )
        } else if (this.state.state === "halted") {
            return (
                <div>
                    <h1>Done!</h1>
                    <Button text={"Play again?"} page={"notReady"} setCurrentRoute={this.props.setCurrentRoute}/>
                    <br></br>
                    <h5>{this.state.points} points</h5>
                    <div style={endGameStyle}>
                        <FoundWords foundWords={this.state.dictionaryForBoard}/>
                        <Board board={this.state.board}/>
                    </div>
                </div>
            )
        }
    }
}

const overlayStyle = {
    position: "fixed",
    display: "none",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: "2",
    cursor: "pointer",
};

const overlayTextStyle = {
    position: "absolute",
    textAlign: "center",
    top: "50%",
    left: "50%",
    fontSize: "25px",
    color: "red",
}

const endGameStyle = {
    display: "flex",
    justifyContent: "space-around",
}

export default BoggleGame;
