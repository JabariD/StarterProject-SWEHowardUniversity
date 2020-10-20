import React from 'react'

import { firebase, auth } from '../../firebase';

// Log the user in 
async function signIn(setLoggedIn) {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
        const result = await auth.signInWithPopup(provider);
        const user = result.user;
        setLoggedIn(user);
    } catch (error) {
        console.log(error.message);
    }
    
}

export default function Login({ setLoggedIn }) {
    return (
        <>
            <button style={buttonStyle} onClick={() => signIn(setLoggedIn)}>Sign In!</button>
        </>
    )
}

const buttonStyle = {
    display: "inline",
    margin: "25px",
    backgroundColor: "#54807e", /* Green */
    border: "none",
    borderRadius: "5px",
    color: "white",
    padding: "15px 32px",
    textDecoration: "none",
    fontSize: "12px",
}
