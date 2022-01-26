import React, { useState, useEffect, useContext } from "react"
import axios from "axios"

import { Switch } from "@react-md/form"
import { TabsManager, Tabs, TabPanels, TabPanel } from "@react-md/tabs"

import { MetaContext } from "../../index"
import ResultsGraph from "./components/ResultsGraph/ResultsGraph"
import ResultsFolder from "./components/ResultsFolder/ResultsFolder"
import { Filters } from "../../components/Filters/Filters"

import { createFolders } from "./helpers"

import "./ResultsPage.scss"

const ResultsPage = () => {
    const [tournaments, setTournaments] = useState([])
    const [hands, setHands] = useState([])
    const [rakebackData, setRakebackData] = useState([])
    const [sortedTournaments, setSortedTournaments] = useState([])
    const [dateFormattedTournaments, setDateFormattedTournaments] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [refetch, setRefetch] = useState(0)
    const [toggleFilter, setToggleFilter] = useState(false)
    const [toggleHandFilter, setToggleHandFilter] = useState(false)
    const [filteredTournaments, setFilteredTournaments] = useState(tournaments)
    const { appName } = useContext(MetaContext)
    
    const tabs = ["Folder", "Graphs"]

    const getUrl = "http://localhost:3001/tournaments/dateSorted"
    const delUrl = "http://localhost:3001/tournament/"

    useEffect(() => {
        try {
            axios.get(getUrl)
                .then(res => {
                    setIsLoading(false)
                    setTournaments(res.data[0])
                    setFilteredTournaments(res.data[0])
                    setRakebackData(res.data[1])
                    setHands(res.data[2])
                    createFolders(res.data[0], setSortedTournaments, setDateFormattedTournaments)
                })
        } catch (e) {
            console.log(e)
        }
        document.title = `${appName} - Tournament Results`
    }, [refetch, appName])

    const onDelete =  id => {
        if (confirm(`Do you really want to remove tournament #${id}`)){
            try {
                axios.delete(delUrl + id)
                setIsLoading(false)
                console.log(`%c Deleted tournament: #${id}`, "color: red")
            } catch (e) {
                console.log(e)
            }
        }
        setRefetch(refetch+1)
    }

    const filterHands = () => {
        if (!toggleHandFilter) {
            setToggleHandFilter(!toggleHandFilter)
            return createFolders(filteredTournaments, setSortedTournaments, setDateFormattedTournaments)           
        }

        const trackedHands = []
        hands.forEach(hand => hand.meta.find(item => trackedHands.push(item.tournamentId)))
        const tournamentsWithTrackedHands = filteredTournaments.filter(tournament => trackedHands.find(id => tournament.tournamentId === id))
        createFolders(tournamentsWithTrackedHands, setSortedTournaments, setDateFormattedTournaments)
        setToggleHandFilter(!toggleHandFilter)
    }

    if (tournaments?.length == 0) return <div>No tournaments in database</div>

    return (
        <div>
            <div className="ResultsTitleContainer subheader">
                <h2>Tournament Results ({tournaments?.length})</h2>
                <div>
                    <Switch 
                        id="hands-switcher" 
                        name="hands-switcher" 
                        label={toggleHandFilter ? "All tournaments" : "Tournaments with hands"}
                        onChange={filterHands} 
                    />
                    <Switch 
                        id="filter-switcher" 
                        name="filter-switcher" 
                        label={!toggleFilter ? "Show Filter" : "Hide Filter"}
                        onChange={() => setToggleFilter(!toggleFilter)} 
                    />
                </div>
            </div>
            <div className={`filter_list ${toggleFilter ? "active" : ""}`}>
                   <Filters 
                    allTournaments={tournaments} 
                    filteredTournaments={filteredTournaments} 
                    setFilteredTournaments={setFilteredTournaments}
                    setSortedTournaments={setSortedTournaments}
                    setDateFormattedTournaments={setDateFormattedTournaments}
                    hasBuyInSlider
                    hasEntrantsSlider
                    />
                </div>  
            <hr />
            <TabsManager tabs={tabs} tabsId="tournament-results">
                <Tabs />
                <hr />
                <TabPanels>
                    <TabPanel>
                        <ResultsFolder
                            sortedTournaments={sortedTournaments}
                            dateFormattedTournaments={dateFormattedTournaments}
                            hands={hands}
                            isLoading={isLoading}
                            onDelete={onDelete}
                        />
                    </TabPanel>
                    <TabPanel>
                        <ResultsGraph
                            tournaments={filteredTournaments}
                            isLoading={isLoading}
                            rakebackData={rakebackData}
                        />
                    </TabPanel>
                </TabPanels>
            </TabsManager>
        </div>
    )
}

export default ResultsPage
