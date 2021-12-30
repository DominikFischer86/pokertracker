import React from "react"
import { object, string } from "prop-types"

const Seat = ({seat, seatedPlayer}) => {
    if (!seatedPlayer) {
        return (
            <div className={`seat seat_empty ${seat}`}>
                <p className="playerPosition"></p>       
                <p className="playerName">{seat.replace("_", " ").toUpperCase()}</p>
                <p className="playerStack">-</p>
            </div>
        )
    }
    const { playerOutOfHand, playerSitOut, playerPosition, playerSeat, playerName, playerStack, playerBigBlind } = seatedPlayer
    const positionClass = (playerPosition.replace("+", "")).toLowerCase()

    return (
        <div className={`seat ${playerSeat} ${positionClass}`}>
            <p className="playerPosition">{playerPosition}</p>       
            <p className="playerName">{playerName}</p>
            <p className="playerStack">{playerStack}</p>
        </div>
    )
}

Seat.propTypes = {
    seat: string,
    seatedPlayer: object
}

export default Seat
