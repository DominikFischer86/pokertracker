import React from "react"
import PropTypes from "prop-types"
import { FaTrashAlt } from "react-icons/fa"

const ResultsTable = ({isLoading, tournaments, onDelete}) => {

    return (
        <div className="results_table">
            {tournaments?.length < 1 && <p>No tournaments found</p>}
            {isLoading && <p>Loading...</p>}
            {!isLoading && tournaments?.length > 0 &&
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Typ</th>
                            <th>Tournament Id</th>
                            <th>Buy-In</th>
                            <th>Rake</th>
                            <th>Rebuys</th>
                            <th>Prize Pool</th>
                            <th>Start Date</th>
                            <th>Start Time</th>
                            <th>Position</th>
                            <th>Cashes</th>
                            <th>Bounties</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>                     
                        {tournaments.map((tournament, i) => {
                            return (
                            <tr key={i} style={
                                tournament.playerPrizeMoney > 0 
                                    ? {color: "rgb(0,150,0)", fontWeight: "500"} 
                                    : null                                            
                                }>
                                <td>#{i+1}</td>
                                <td>{tournament.playerAmount > 45 ? "MTT" : "SNG"}</td>
                                <td><a href={`/tournament/${tournament.tournamentId}`}>{tournament.tournamentId}</a></td>
                                <td>${tournament.buyIn}</td>
                                <td>${tournament.rake}</td>
                                <td>{tournament.rebuys}</td>
                                <td>${tournament.prizePool}</td>
                                <td>{tournament.startDate}</td>
                                <td>{tournament.startTime}</td>
                                <td>{tournament.finalPosition + "/" + tournament.playerAmount}</td>
                                <td>{tournament.playerPrizeMoney}</td>
                                <td>{tournament.bounties}</td>
                                <td>
                                    <FaTrashAlt 
                                        onClick={() => onDelete(tournament.tournamentId)}
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

ResultsTable.propTypes = {
    tournaments: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    isLoading: PropTypes.bool,
    onDelete: PropTypes.func
}

export default ResultsTable