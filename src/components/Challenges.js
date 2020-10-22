import React, { Component } from 'react'

import { queryDB } from './firestore/firestore.js'

export class Challenges extends Component {
    constructor() {
        super();
        this.state = {
          challenges: [],
        };
    }

    componentDidMount = async() => {
        // Get all challenges from Firestore
        const currentComponent = this;
        const query = await queryDB("challenges");
        query.forEach( function(doc) {
            const challengeObject = {id: doc.id, data: doc.data()} // creation of challenge object
            currentComponent.setState({challenges: currentComponent.state.challenges.concat(challengeObject)});
        });
    }

    // make sure checked always reads from state
    componentDidUpdate() {
        const gameType = this.props.gameType.gameType;
        if (gameType === "random") {
            document.getElementById("random").checked = true;
        } else {
            const id = this.props.gameType.challengeID;
            const elements = document.getElementsByName("board");
            for (var i = 0; i < elements.length; i++) {
                const challenge = elements[i];
                if (challenge.dataset.id === id) {
                    challenge.checked = true;
                    break;
                }
            }
        }
    }
    
    // Display all challenges
    render() {
        return (
            <div>
                <br></br>
                <label>Random Grid <input type="radio" id="random" name="board" className="radio" onChange={() => this.props.updateGameType("random")} />
                </label>
                <br></br>
                <h3>Challenges</h3>
                {this.state.challenges.map( (challenge, index) => (
                    <li key={index}>
                        <label>
                        {challenge.data.title} Challenge | High Score: {challenge.data.high_score[0].points} by {challenge.data.high_score[0].name}
                        <input type="radio" className="radio" name="board" data-id={challenge.id} onClick={this.props.updateGameType} />
                        </label>
                    </li>
                ))}
            </div>
        )
    }
}

export default Challenges

