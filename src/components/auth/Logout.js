import React from 'react'

// Log the user out
function signOut(auth, setLoggedOut) {
    setLoggedOut(null);
    return auth.currentUser && auth.signOut();
}

export default function Logout({ auth, setLoggedOut }) {
    return (
        <>
            <button style={buttonStyle} onClick={() => signOut(auth, setLoggedOut)}>Sign Out!</button>
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
