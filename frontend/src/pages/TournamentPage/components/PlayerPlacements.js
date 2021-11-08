import React from "react"
import PropTypes from "prop-types"

import { FaCoins } from "react-icons/fa"

const PlayerPlacements = ({players, tournament, heroPosition, heroName}) => {
    const url = "http://localhost:3000/player/"

    const playerUrl = playerName => {
        const player = players.find(player => player.playerName === playerName)
        const { playerId } = player
        return url+playerId
    }

    return (        
         <div className="results_table">
            <table>
                <thead>
                    <tr>
                        <th>Placement</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Known result</th>
                    </tr>
                </thead>
                <tbody>
                    {tournament?.placements.map((placement,index) => {
                        const { finishPosition, playerName, playerCountry, prizeMoney } = placement
                        return (
                        <tr key={index}  style={{ fontWeight: playerName == heroName ? "bold" : "normal", color: playerName == heroName ? "royalblue" : "#000"}}>
                            <td>{finishPosition}</td>
                            <td><a href={playerUrl(playerName)}>{playerName}</a></td>
                            <td>{playerCountry}</td>
                            {prizeMoney > 0 && <td><FaCoins className="cash_icon" color="orange" /> {prizeMoney} USD</td>}
                            {!prizeMoney && heroPosition > finishPosition && <td>Not finished</td>}
                            {!prizeMoney && heroPosition <= finishPosition && <td>Busted</td>}     
                            </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}

PlayerPlacements.propTypes = {
    players: PropTypes.array.isRequired,
    tournament: PropTypes.object.isRequired,
    heroPosition: PropTypes.number.isRequired,
    heroName: PropTypes.string.isRequired
}

export default PlayerPlacements
