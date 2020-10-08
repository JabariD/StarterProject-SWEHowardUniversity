import React from 'react'

// Import functions for generating random board
import Card from './Card.js';

/* Generates the board */
export default function Board({board}) {

    return (
        <div>
           {board.map( (row) => {
               return row.map( (letter, letterIndex) => { 
                return <Card key={letterIndex} letterIndex={letterIndex} letter={letter} /> } 
            )  
               
           })}
            
        </div>
    )
}
