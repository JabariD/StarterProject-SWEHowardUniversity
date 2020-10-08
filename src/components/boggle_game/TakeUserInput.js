import React from 'react'

export default function TakeInput({ updateUserGuess, submitWord }) {
    return (
        <div>
            <label htmlFor="userWord">Enter a word </label>
            <input type="text" id="userWord" name="userWord" onChange={updateUserGuess} /> 
            <button onClick={submitWord}> Submit </button>
            <br></br>
        </div>
    )
}
