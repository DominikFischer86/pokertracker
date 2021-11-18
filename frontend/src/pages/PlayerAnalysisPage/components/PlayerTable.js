import React from "react"
import PropTypes from "prop-types"
import { FaTrashAlt } from "react-icons/fa"
import Spinner from "../../../components/Spinner/Spinner"

const PlayerTable = ({isLoading, players, onDelete}) => {
 
    return (
        <div className="results_table">
            {players?.length < 1 && <p>No players found</p>}
            {isLoading && <Spinner />}
            {!isLoading && players?.length > 0 &&
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Played tournaments</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>                     
                        {players.sort((a, b) => b.playerTournaments.length - a.playerTournaments.length).map((player, i) => {
                            return (
                            <tr key={i} style={
                                player.playerIsHero 
                                    ? {color: "rgb(0,0,150)", fontWeight: "500"} 
                                    : null                                            
                                }>
                                <td>#{i+1}</td>
                                <td><a href={`/player/${player.playerId}`}>{player.playerName}</a></td>
                                <td>{player.playerCountry}</td>
                                <td>{player.playerTournaments.length}</td>
                                <td>
                                    <FaTrashAlt 
                                        onClick={() => onDelete(player.playerId)}
                                        className="trash-icon"
                                        style={{color: "red"}}
                                    />
                                </td>                              
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
                }
        </div>
    )
}

PlayerTable.propTypes = {
    players: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    isLoading: PropTypes.bool,
    onDelete: PropTypes.func
}

export default PlayerTable