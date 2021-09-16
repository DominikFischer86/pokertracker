import React, { useState, useEffect } from "react"
import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
  } from "@react-md/table";
  import { Button } from "react-md"

import TournamentDataService from "../services/tournamentService"

const ResultsPage = props => {
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
        find(searchPlayerAmount, "playerAmnount")
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
            <div className="row">
                <TableContainer>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>Tournament Id</TableCell>
                                <TableCell>Buy-In</TableCell>
                                <TableCell>Rake</TableCell>
                                <TableCell>Player Amount</TableCell>
                                <TableCell>Prize Pool</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tournaments.map((tournament, i) => {
                                return (
                                <TableRow key={i}>
                                    <TableCell>{tournament.tournamentId}</TableCell>
                                    <TableCell>{tournament.buyIn}</TableCell>
                                    <TableCell>{tournament.rake}</TableCell>
                                    <TableCell>{tournament.playerAmount}</TableCell>
                                    <TableCell>{tournament.prizePool}</TableCell>
                                    <TableCell>{tournament.startDate}</TableCell>
                                    <TableCell><Button theme="primary" themeType="outline">Details</Button></TableCell>
                                </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default ResultsPage