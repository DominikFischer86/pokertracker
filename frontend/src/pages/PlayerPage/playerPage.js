import React, { useState, useEffect} from "react"
import { Switch } from "@react-md/form"
import axios from "axios"

import { OverviewTable } from "../ResultsPage/components/ResultsGraph/OverviewTable"
import { ResponsiveLineContainer } from "../ResultsPage/components/ResultsGraph/config"

import "./PlayerPage.scss"

const PlayerPage = () => {
    const url = "http://localhost:3001" + window.location.pathname
    useEffect(() => {
        try {
             axios.get(url)
                .then(res => {
                    setDatabase(res.data)
                })
         } catch (e) {
            console.log(e)
        }
    }, [])

    const [database, setDatabase] = useState([])
    const [toggleResults, setToggleResults] = useState(false)
    let player = database[1]?.[0]
    let allTournaments = database[0]

    if (!player || !allTournaments) return <div>Loading user...</div>

    const { playerCountry, playerName, playerIsHero, playerTournaments } = player

    // Array with all (but unverified) final positions
    let estimatedTournamentResults = allTournaments.filter(tournament => {
        return tournament.placements?.find(placement => placement.playerName === playerName)
    })

    // Create array with player final position earlier than hero final position for verified data
    let realTournamentResults = estimatedTournamentResults.filter(element => {
        let heroPosition = element.finalPosition
        let playerPosition = element.placements.find(placement => {
            return (placement.playerName === playerName && placement.finishPosition)
        })
        return heroPosition < playerPosition.finishPosition
    })

    if (playerIsHero) {
        estimatedTournamentResults = allTournaments
        realTournamentResults = allTournaments
    }
  
    // playing dates
    // playing times

    return (
        <div>
            <>
                <h2>{playerName} ({playerCountry})</h2>
                <p>(Tournaments played: {playerIsHero ? allTournaments.length : playerTournaments.length})</p>
                <hr />
                <div className="PlayerPage__heading">
                    <h3>{toggleResults ? "Estimated Results" : "Verified Results"}</h3>
                    <Switch 
                        id="results-switcher" 
                        name="results-switcher" 
                        label={!toggleResults ? "Show Estimated Results" : "Show Verified Results"}
                        onChange={() => setToggleResults(!toggleResults)} 
                    />
                </div>
                <div className="overViewTable">                    
                    <OverviewTable filteredTournaments={toggleResults ? estimatedTournamentResults : realTournamentResults}/>                    
                </div>
                <div className="graph_wrapper">
                        <ResponsiveLineContainer 
                            filteredTournaments={toggleResults ? estimatedTournamentResults : realTournamentResults} 
                            toggleRake={false}
                            toggleBounties={false}
                        />
                </div>
            </>
        </div>
    )
}

export default PlayerPage