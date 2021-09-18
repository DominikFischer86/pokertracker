import React, { useState, useEffect } from "react"
import { Button } from "react-md"
import { FontIcon } from "@react-md/icon"

import TournamentDataService from "../services/tournamentService"

const ResultsPage = () => {
    const [tournaments, setTournaments] = useState([])
    const [searchPlayerAmount, setSearchPlayerAmount] = useState("")
    const [searchPlayerName, setSearchPlayerName] = useState("") 
    const [searchPlayerCountry, setSearchPlayerCountry] = useState("") 
    const [searchStartDate, setSearchStartDate] = useState("") 

    useEffect(() => {
        retrieveTournaments()
    }, [])

    const onChangeSearchPlayerAmount = e => {
        const searchPlayerAmount = e.target.value
        setSearchPlayerAmount(searchPlayerAmount)
    }

    const onChangeSearchPlayerName = e => {
        const searchPlayerName = e.target.value
        setSearchPlayerName(searchPlayerName)
    }

    const onChangeSearchPlayerCountry = e => {
        const searchPlayerCountry = e.target.value
        setSearchPlayerCountry(searchPlayerCountry)
    }

    const onChangeSearchStartDate = e => {
        const searchStartDate = e.target.value
        setSearchStartDate(searchStartDate)
    }

    const retrieveTournaments = () => {
        TournamentDataService.getAll()
            .then(response => {
                console.log(response.data)
                setTournaments(response.data.tournaments)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const find = (query, by) => {
        TournamentDataService.find(query, by)
            .then(response => {
                console.log(response.data)
                setTournaments(response.data.tournaments)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const findByPlayerAmount = () => {
        find(searchPlayerAmount, "playerAmount")
    }

    const findByPlayerName = () => {
        find(searchPlayerName, "playerName")
    }

    const findByPlayerCountry = () => {
        find(searchPlayerCountry, "playerCountry")
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
                            placeholder="Search by player name"
                            value={searchPlayerName}
                            onChange={onChangeSearchPlayerName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={findByPlayerName}
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
                            placeholder="Search by country"
                            value={searchPlayerCountry}
                            onChange={onChangeSearchPlayerCountry}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={findByPlayerCountry}
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
                    <table className="resultsTable">
                        <thead>
                            <tr>
                                <th>Tournament Id</th>
                                <th>Buy-In</th>
                                <th>Rake</th>
                                <th>Player Amount</th>
                                <th>Prize Pool</th>
                                <th>Start Date</th>
                                <th>Finished Position</th>
                                <th>Actions</th>
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
                                    <td>{tournament.placements.length}</td>
                                    <td>
                                        <Button 
                                            theme="primary" 
                                            buttonType="icon" 
                                            aria-label="Details"
                                        >
                                            <FontIcon>launch</FontIcon>
                                        </Button>
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ResultsPage