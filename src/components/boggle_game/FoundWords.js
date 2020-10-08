import React from 'react'

export default function FoundWords({foundWords}) {
    const words = foundWords.map((word, index) =>
        <li key={index}>{word}</li>
    );
    return (
        <div style={{display:"flex"}}>
            <ul>{words}</ul>
        </div>
    )
}
