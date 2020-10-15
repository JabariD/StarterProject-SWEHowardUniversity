import React from 'react'

// Log the user in 
async function signIn(firebase, auth, setLoggedIn) {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
        const result = await auth.signInWithPopup(provider);
        const user = await result.user;
        setLoggedIn(user);
    } catch (error) {
        console.log(error.message);
    }
    
}

export default function Login({firebase, auth, setLoggedIn}) {
    return (
        <>
            <button style={buttonStyle} onClick={() => signIn(firebase, auth, setLoggedIn)}>Sign In!</button>
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
