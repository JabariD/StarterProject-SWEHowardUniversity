import React from 'react'

import { auth } from '../../firebase';

// Log the user out
function signOut(setLoggedOut) {
    setLoggedOut(null);
    return auth.currentUser && auth.signOut();
}

export default function Logout({ setLoggedOut }) {
    return (
        <>
            <button style={buttonStyle} onClick={() => signOut(setLoggedOut)}>Sign Out!</button>
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
