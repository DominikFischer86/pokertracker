import React from "react"
import PropTypes from "prop-types"

const PlayerResultsTable = ({tournaments}) => {

    return (
        <div className="PlayerResultsTable results_table">
            {tournaments?.length < 1 && <p>No tournaments found</p>}
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Typ</th>
                            <th>Tournament Id</th>
                            <th>Buy-In</th>
                            <th>Rake</th>
                            <th>Prize Pool</th>
                            <th>Start Date</th>
                            <th>Start Time</th>
                            <th>Position</th>
                            <th>Cashes</th>
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
                                <td>${tournament.prizePool}</td>
                                <td>{tournament.startDate}</td>
                                <td>{tournament.startTime}</td>
                                <td>{tournament.finalPosition + "/" + tournament.playerAmount}</td>
                                <td>{tournament.playerPrizeMoney}</td>             
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
        </div>
    )
}

PlayerResultsTable.propTypes = {
    tournaments: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
}

export default PlayerResultsTable