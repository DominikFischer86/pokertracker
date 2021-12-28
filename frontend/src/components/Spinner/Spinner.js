import React from "react"
import { string } from "prop-types"

import "./spinner.scss"

const Spinner = ({message}) => {
    return (
        <div className="spinnerContainer">
            {!message &&
                <p>Loading data...</p>
            }
            {message &&
                <p>{message}</p>
            }
            <div className="spinner">
                <span className="spades">♠</span>
                <span className="clubs">♣</span>
                <span className="diamonds">♦</span>
                <span className="hearts">♥</span>
            </div>
        </div>
    )
}

Spinner.propTypes = {
    message: string
}

export default Spinner
