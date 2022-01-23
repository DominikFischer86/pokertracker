import React, { useState, useEffect, useContext } from "react"
import axios from "axios"

import { Switch } from "@react-md/form"
import { TabsManager, Tabs, TabPanels, TabPanel } from "@react-md/tabs"

import { MetaContext } from "../../index"
import Spinner from "../../components/Spinner/Spinner"
import { Filters } from "../../components/Filters/Filters"
import { OverviewTable } from "../ResultsPage/components/ResultsGraph/OverviewTable"
import { ResponsiveLineContainer } from "../ResultsPage/components/ResultsGraph/config"
import PlayerResultsTable from "./components/PlayerResultsTab/PlayerResultsTable"
import PlayerITMTab from "./components/PlayerITMTab/PlayerITMTab"

import "./PlayerPage.scss"
import PlayerPlaytimesTab from "./components/PlayerPlaytimesTab/PlayerPlaytimesTab"

const PlayerPage = () => {
    const tabs = ["Overview", "Tournaments", "Playing Times", "ITM"]
    const getUrl = "http://localhost:3001" + window.location.pathname
    const sngFilter = 18
    const { appName } = useContext(MetaContext)

    useEffect(() => {
        try {
             axios.get(getUrl)
                .then(res => {
                    document.title = `${appName} - Player ${res.data[1]?.[0].playerName}`
                    setDatabase(res.data)
                    setFilteredTournaments(res.data[0])
                })
         } catch (e) {
            console.log(e)
        }
    }, [getUrl])

    const [database, setDatabase] = useState([])
    const [toggleResults, setToggleResults] = useState(false)
    const [toggleFilter, setToggleFilter] = useState(false)    

    const player = database[1]?.[0]
    const allTournaments = database[0]
    let sngTournaments = []

    const [filteredTournaments, setFilteredTournaments] = useState(database[0])

    if (filteredTournaments) sngTournaments = filteredTournaments.filter(tournament => {
        return tournament.playerAmount === sngFilter
    })

    if (!player || !sngTournaments) return <div><Spinner /></div>

    const { playerCountry, playerName, playerIsHero, playerTournaments } = player

    // Array with all (but unverified) final positions
    let playerSpecificTournaments = sngTournaments.filter(tournament => {
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
        estimatedTournamentResults = sngTournaments
        realTournamentResults = sngTournaments
    }

    return (
        <div>
            <h2>{playerName} ({playerCountry})</h2>
            <div className="subheader">
                <p>(Tournaments played: {playerIsHero ? sngTournaments.length : playerTournaments.length})</p>
                <Switch 
                    id="filter-switcher" 
                    name="filter-switcher" 
                    label={!toggleFilter ? "Show Filter" : "Hide Filter"}
                    onChange={() => setToggleFilter(!toggleFilter)} 
                />
            </div>
            <div className={`filter_list ${toggleFilter ? "active" : ""}`}>
                   <Filters 
                    allTournaments={allTournaments} 
                    filteredTournaments={filteredTournaments} 
                    setFilteredTournaments={setFilteredTournaments}
                    hasBuyInSlider
                    />
                </div>   
            <hr />
            <TabsManager tabs={tabs} tabsId="player-results">
                <Tabs />
                <hr />
                <TabPanels>
                    <TabPanel>
                        <div className="PlayerPage__heading">
                            <h3>{toggleResults ? "Estimated Results" : "Verified Results"}</h3>
                            {!playerIsHero &&
                                <Switch
                                    id="results-switcher"
                                    name="results-switcher"
                                    label={!toggleResults ? "Show Estimated Results" : "Show Verified Results"}
                                    onChange={() => setToggleResults(!toggleResults)}
                                />
                            }
                        </div>
                        <div className="overViewTable">
                            <OverviewTable
                                allTournamentsAmount={allTournaments.length}
                                filteredTournaments={
                                    toggleResults
                                    ? estimatedTournamentResults
                                    : realTournamentResults
                                }
                                rakebackData={[]}
                            />
                        </div>
                        <div className="graph_wrapper">
                            <ResponsiveLineContainer
                                allTournamentsAmount={allTournaments.length}
                                filteredTournaments={toggleResults ? estimatedTournamentResults : realTournamentResults}
                                toggleRake={false}
                                toggleBounties={false}
                            />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="PlayerPage__heading">
                            <h3>All Tournaments ({toggleResults ? estimatedTournamentResults.length : realTournamentResults.length})</h3>
                            {!playerIsHero &&
                                <Switch
                                  id="results-switcher"
                                  name="results-switcher"
                                  label={!toggleResults ? "Show Estimated Results" : "Show Verified Results"}
                                  onChange={() => setToggleResults(!toggleResults)}
                              />
                            }                          
                        </div>
                        <PlayerResultsTable tournaments={toggleResults ? estimatedTournamentResults : realTournamentResults} />
                    </TabPanel>
                    <TabPanel>
                        <PlayerPlaytimesTab tournaments={estimatedTournamentResults}/>
                    </TabPanel>
                    <TabPanel>
                        <PlayerITMTab
                            filteredTournaments={
                                toggleResults
                                ? estimatedTournamentResults
                                : realTournamentResults
                            }
                            sngFilter={sngFilter}
                        />
                    </TabPanel>
                </TabPanels>
            </TabsManager>
        </div>
    )
}

export default PlayerPage
