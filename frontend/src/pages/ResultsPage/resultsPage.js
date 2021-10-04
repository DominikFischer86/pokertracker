import React, { useState, useEffect } from "react"

const ResultsPage = () => {
    const [tournaments, setTournaments] = useState([])
    const [searchTournamentId, setSearchTournamentId] = useState("") 
    const [searchBuyIn, setSearchBuyIn] = useState("") 
    const [searchPlayerAmount, setSearchPlayerAmount] = useState("")
    const [searchStartDate, setSearchStartDate] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:3001/results")
            .then(res => {
                if (res.ok) {
                    setIsLoading(false)
                    return res.json()
                }
            })
            .then(jsonRes => setTournaments(jsonRes))
            .catch(err => console.log(err))
        
    }, [])

    const onChangeSearchPlayerAmount = e => {
        const searchPlayerAmount = e.target.value
        setSearchPlayerAmount(searchPlayerAmount)
    }
    
    const onChangeSearchTournamentId = e => {
        const searchTournamentId = e.target.value
        setSearchTournamentId(searchTournamentId)
    }

    const onChangeSearchBuyIn = e => {
        const searchBuyIn = e.target.value
        setSearchBuyIn(searchBuyIn)
    }

    const onChangeSearchStartDate = e => {
        const searchStartDate = e.target.value
        setSearchStartDate(searchStartDate)
    }

    const findByPlayerAmount = () => {
        find(searchPlayerAmount, "playerAmount")
    }

    const findByBuyIn = () => {
        find(searchBuyIn, "buyIn")
    }

    const findByTournamentId = () => {
        find(searchTournamentId, "tournamentId")
    }

    const findByStartDate = () => {
        find(searchStartDate, "startDate")
    }

    return (
        <div>
            <h2>Tournament Results</h2>
            <hr />
            <div className="row pb-1">
                <div className="col-lg-3">
                    <div className="input-group">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Search by tournament Id"
                            value={searchTournamentId}
                            onChange={onChangeSearchTournamentId}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={findByTournamentId}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="input-group">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Search by Buy-In"
                            value={searchBuyIn}
                            onChange={onChangeSearchBuyIn}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={findByBuyIn}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="input-group">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Search by player amount"
                            value={searchPlayerAmount}
                            onChange={onChangeSearchPlayerAmount}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={findByPlayerAmount}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="input-group">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Search by date"
                            value={searchStartDate}
                            onChange={onChangeSearchStartDate}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={findByStartDate}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
                <div>
                    {isLoading && <p>Loading...</p>}
                    {!isLoading &&
                        <table className="resultsTable">
                            <thead>
                                <tr>
                                    <th>Tournament Id</th>
                                    <th>Buy-In</th>
                                    <th>Rake</th>
                                    <th>Player Amount</th>
                                    <th>Prize Pool</th>
                                    <th>Start Date</th>
                                    <th>Start Time</th>
                                    <th>Final Position</th>
                                    <th>Player Prize Money</th>
                                </tr>
                            </thead>
                            <tbody>                            
                                {tournaments.map((tournament, i) => {
                                    return (
                                    <tr key={i}>
                                        <td>{tournament.tournamentId}</td>
                                        <td>${tournament.buyIn}</td>
                                        <td>${tournament.rake}</td>
                                        <td>{tournament.playerAmount}</td>
                                        <td>${tournament.prizePool}</td>
                                        <td>{tournament.startDate}</td>
                                        <td>{tournament.startTime}</td>
                                        <td>{tournament.finalPosition}</td>
                                        <td>{tournament.playerPrizeMoney}</td>                                  
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        }
                </div>
            </div>
        </div>
    )
}

export default ResultsPage