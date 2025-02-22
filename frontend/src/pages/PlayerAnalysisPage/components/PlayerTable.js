import React, { useState } from "react"
import PropTypes from "prop-types"

import { FaTrashAlt } from "react-icons/fa"

import Spinner from "../../../components/Spinner/Spinner"
import { Pagination } from "../../../hooks/Pagination"

const PlayerTable = ({isLoading, players, onDelete}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [entriesPerPage] = useState(15)

    const filteredPlayers = players.filter(player => player.playerTournaments.length > 9).sort((a, b) => b.playerTournaments.length - a.playerTournaments.length)

    // Get current entries
    const indexOfLastEntry = currentPage * entriesPerPage
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage
    const currentEntries = filteredPlayers.slice(indexOfFirstEntry, indexOfLastEntry)

    const paginate = pageNumber => setCurrentPage(pageNumber)
    
    return (
        <>
        <div className="results_table">
            {filteredPlayers?.length < 1 && <p>No players found</p>}
            {isLoading && <Spinner />}
            {!isLoading && filteredPlayers?.length > 0 &&
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
                    {currentEntries.map(player => {
                        return (
                        <tr key={player.playerId} style={
                            player.playerIsHero 
                                ? {color: "rgb(0,0,150)", fontWeight: "500"} 
                                : null                                            
                            }>
                            <td>#{player.playerId}</td>
                            <td><a href={`/player/${player.playerId}`}>{player.playerName}</a></td>
                            <td>{player.playerCountry}</td>
                            <td>{player.playerTournaments.length}</td>
                            <td>
                                <FaTrashAlt 
                                    onClick={() => onDelete(player.playerId)}
                                    className="trash-icon"
                                    style={{color: "red"}}
                                    title={`Remove user ${player.playerName}`}
                                />
                            </td>                              
                        </tr>
                        )
                    })}
                </tbody>
            </table>
          }
        </div>
        <Pagination 
            entriesPerPage={entriesPerPage} 
            totalEntries={filteredPlayers.length}
            paginate={paginate}
        />
    </>
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