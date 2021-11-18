import React from "react"
import "./spinner.scss"

const Spinner = () => {
    return (
        <div className="spinnerContainer">
            <p>Loading data...</p>
            <div className="spinner">
                <span className="spades">♠</span>
                <span className="clubs">♣</span>
                <span className="diamonds">♦</span>
                <span className="hearts">♥</span>
            </div>
        </div>
    )
}

export default Spinner