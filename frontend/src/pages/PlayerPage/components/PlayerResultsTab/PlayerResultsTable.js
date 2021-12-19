import React, { useState } from "react"
import PropTypes from "prop-types"

import { Pagination } from "../../../../hooks/Pagination"

const PlayerResultsTable = ({tournaments}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [entriesPerPage] = useState(50)

    // Get current entries
    const indexOfLastEntry = currentPage * entriesPerPage
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage
    const currentEntries = tournaments.slice(indexOfFirstEntry, indexOfLastEntry)

    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (
        <>
            <div className="PlayerResultsTable results_table">
                {currentEntries?.length < 1 && <p>No tournaments found</p>}
                <table>
                    <thead>
                        <tr>
                            <th>Typ</th>
                            <th>Tournament Id</th>
                            <th>Buy-In</th>
                            <th>Rake</th>
                            <th>Prize Pool</th>
                            <th>Start Time</th>
                            <th>Position</th>
                            <th>Cashes</th>
                        </tr>
                    </thead>
                    <tbody>                     
                        {currentEntries.map((tournament, i) => {
                            return (
                            <tr key={i} style={
                                tournament.playerPrizeMoney > 0 
                                    ? {color: "rgb(0,150,0)", fontWeight: "500"} 
                                    : null                                            
                                }>
                                <td>{tournament.playerAmount > 45 ? "MTT" : "SNG"}</td>
                                <td><a href={`/tournament/${tournament.tournamentId}`}>{tournament.tournamentId}</a></td>
                                <td>${tournament.buyIn}</td>
                                <td>${tournament.rake}</td>
                                <td>${tournament.prizePool}</td>
                                <td>{tournament.startDate} - {tournament.startTime}</td>
                                <td>{tournament.finalPosition + "/" + tournament.playerAmount}</td>
                                <td>{tournament.playerPrizeMoney}</td>             
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <Pagination 
                entriesPerPage={entriesPerPage} 
                totalEntries={tournaments.length}
                paginate={paginate}
            />
      </>
    )
}

PlayerResultsTable.propTypes = {
    tournaments: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
}

export default PlayerResultsTable