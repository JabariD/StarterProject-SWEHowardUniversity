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
    
    // Display all challenges
    render() {
        return (
            <div>
                <br></br>
                <label>Random Grid <input type="radio" name="board" className="radio" onChange={() => this.props.updateGameType("random")} defaultChecked/>
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

