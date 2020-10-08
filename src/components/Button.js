import React from 'react'

function Button({setCurrentRoute, page, text}) {
    return (
        <div>
            <button style={buttonStyle} onClick={() => setCurrentRoute(page)}>{text}</button>
        </div>
    )
}

const buttonStyle = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#54807e", /* Green */
    border: "none",
    borderRadius: "5px",
    color: "white",
    padding: "15px 32px",
    textDecoration: "none",
    fontSize: "16px",
}

export default Button;
