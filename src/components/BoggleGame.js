import React, { Component } from 'react'

import Board from './boggle_game/Board.js';
import Timer from './boggle_game/Timer';
import FoundWords from './boggle_game/FoundWords';
import TakeUserInput from './boggle_game/TakeUserInput';

// For init of boggle game
import RandomGrid from '../boggle/board_generator.js'; // generate board
import { getDoc, setDoc } from './firestore/firestore'; // load challenge board
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
          remainingWords: [],
          userGuess: "",
          points: 0,
          rankChanged: false,
        };
    }

    componentDidMount() {
        this.getBoardAndDictionaryForBoard()
    }

    // Get board and dictionary for current board
    getBoardAndDictionaryForBoard = async() => {
        // Check if board is random
        let board = [];
        if (this.props.gameType.gameType === "random" || !this.props.user) {
            board = RandomGrid();
        } else {
            // load challenge board
            const challengeBoardID = this.props.gameType.challengeID;
            let boardObject = await getDoc(challengeBoardID);
            for (let i = 0; i < boardObject.board.length; i++) {
                let boardRow = [];

                // grab respective values
                const obj = boardObject.board[i];
                const arr = obj[i];
                console.log(arr);
                for (let value of arr) {
                    boardRow.push(value);
                }
                board.push(boardRow);
            }
        }
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
    updateGameState = async() => {
        this.setState({state: "halted"});
        this.getWordsNotFound(); // get words user did not find.

        if (this.props.gameType.gameType !== "random") {
            // check if this user beat a high score.
            // user email and all current highscores (send a request to this challenge ID)
            const challengeBoardObject = await getDoc(this.props.gameType.challengeID);
            const highscoresForChallenge = challengeBoardObject.high_score; // <---- current array
            
            // find the minimum score and try to replace. sort, reverse, set
            const minPoints = highscoresForChallenge[2].points; // only 3 appear in leaderboard and it is sorted in descending order
            if (minPoints < this.state.points) {
                this.setState({rankChanged: true});
                highscoresForChallenge.pop(); // delete min number of challenges
                const data = {name: this.props.user.email, points: this.state.points}
                highscoresForChallenge.push(data);
                highscoresForChallenge.sort().reverse();
                await setDoc(this.props.gameType.challengeID, highscoresForChallenge);
            }
        }

    }

    // Update overlay
    updateOverlay = (state) => {
        if (state) {
            document.getElementById("overlay").style.display = "block";
        } else {
            document.getElementById("overlay").style.display = "none";
        }
    }

    // Gets all words user did not find...
    getWordsNotFound = () => {
        const remainingwords = this.state.dictionaryForBoard.filter(word => !this.state.foundWords.includes(word) && word.length > 3).sort();
        this.setState({remainingWords: remainingwords});
    }

    // User submitted word, let's try to update the state of the game
    submitWord = () => {
        const { userGuess, foundWords, dictionaryForBoard, points } = this.state;

        if (userGuess === "") {
            return;
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
            const p = document.getElementById("wordState");
            p.innerText = `${userGuess} is found!`;
            p.style.color = "green";
        } else {
            const p = document.getElementById("wordState");
            p.innerText = `${userGuess} is not found.`;
            p.style.color = "red";
            return;
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
                        <Board board={this.state.board} boardSize={this.state.board[0].length}/>
                        <p id="wordState"></p>
                        <TakeUserInput updateUserGuess={this.updateUserGuess} submitWord={this.submitWord}/>
                        <FoundWords foundWords={this.state.foundWords}/>
                    </div>
                    
                </div>
            )
        } else if (this.state.state === "halted") {
            return (
                <div>
                    <h1>Done!</h1>
                    <Button text={"Play again?"} page={"home"} setCurrentRoute={this.props.setCurrentRoute}/>
                    <br></br>
                    {(this.state.rankChanged) ? <h2 style={{color: "green"}}>You've made the leaderboard!</h2> : <div></div>}
                    <h5>{this.state.points} points</h5>
                    <div style={endGameStyle}>
                        {(this.props.gameType.gameType === "challenge") ? <h3>Available Words do not display for challenge boards!</h3> : <FoundWords foundWords={this.state.remainingWords}/>}
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
