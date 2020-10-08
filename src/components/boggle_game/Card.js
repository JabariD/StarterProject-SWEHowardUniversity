import React from 'react'

export default function Card( {letter, letterIndex} ) {
    if (letterIndex !== 4) {
        return (
            <>  
                <div style={card}>{letter}</div>
                {/* {letter}; */}
            </>
        )
    } else 
        return (
            <>
                
                <div style={card}>{letter}</div>
                <div></div>
            </>
        )
}

const card = {
    display: "inline-block",
    color: "white",
    backgroundColor: "DodgerBlue",
    fontSize: "2em",
    padding: "15px",
    margin: "25px",
    borderRadius: "5px",
};
