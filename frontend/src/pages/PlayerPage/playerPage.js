import React, { useState, useEffect} from "react"
import { Switch } from "@react-md/form"
import axios from "axios"
import { ResponsiveBar } from "@nivo/bar"

import { OverviewTable } from "../ResultsPage/components/ResultsGraph/OverviewTable"
import { ResponsiveLineContainer } from "../ResultsPage/components/ResultsGraph/config"
import PlayerResultsTable from "./components/PlayerResultsTable"

import { testData } from "./graphConfig"

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
    let playerSpecificTournaments = allTournaments.filter(tournament => {
        return tournament.placements?.find(placement => placement.playerName === playerName)
    })

    // Transform array for player specific information
    let estimatedTournamentResults = playerSpecificTournaments.map(tournament => {

        const player = tournament.placements.find(placement => {
             return placement.playerName === playerName
        })

        return {
            buyIn: tournament.buyIn,
            bounties: 0,
            rebuys: 0,
            heroFinalPosition: tournament.finalPosition,
            finalPosition: player.finishPosition,
            playerPrizeMoney: player.prizeMoney,
            playerAmount: tournament.playerAmount,
            prizePool: tournament.prizePool,
            rake: tournament.rake,
            startDate: tournament.startDate,
            startTime: tournament.startTime,
            timeStamp: tournament.timeStamp,
            tournamentId: tournament.tournamentId,
            _id: tournament._id
        }
    })
  
    // Create array with player final position earlier than hero final position for verified data
    let realTournamentResults = estimatedTournamentResults.filter(tournament => {
        return tournament.heroFinalPosition < tournament.finalPosition
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
                <hr />
                <div className="row mt10">
                    <div className="col-lg-6">
                        <h3>All Tournaments ({toggleResults ? estimatedTournamentResults.length : realTournamentResults.length})</h3>
                        <PlayerResultsTable 
                            tournaments={toggleResults ? estimatedTournamentResults : realTournamentResults}
                        />
                    </div>
                    <div className="col-lg-6 dayGraph">
                        <h3>Starting dates</h3>
                        <ResponsiveBar 
                            data={testData}
                            keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
                            indexBy="country"
                            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                            padding={0.3}
                            valueScale={{ type: 'linear' }}
                            indexScale={{ type: 'band', round: true }}
                            colors={{ scheme: 'nivo' }}                        
                            borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                            axisTop={null}
                            axisRight={null}
                            axisBottom={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'hour',
                                legendPosition: 'middle',
                                legendOffset: 32
                            }}
                            axisLeft={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'amount',
                                legendPosition: 'middle',
                                legendOffset: -40
                            }}
                            labelSkipWidth={12}
                            labelSkipHeight={12}
                            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}                            
                            role="application"
                            ariaLabel="Time of day chart"
                            barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
                        />
                    </div>
                </div>
                <hr />
            </>
        </div>
    )
}

export default PlayerPage