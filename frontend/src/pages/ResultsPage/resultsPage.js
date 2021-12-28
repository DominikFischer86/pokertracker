import React, { useState, useEffect } from "react"
import axios from "axios"

import { TabsManager, Tabs, TabPanels, TabPanel } from "@react-md/tabs"

import ResultsGraph from "./components/ResultsGraph/ResultsGraph"
import ResultsFolder from "./components/ResultsFolder/ResultsFolder"

import { createFolders } from "./helpers"

const ResultsPage = () => {
    const [tournaments, setTournaments] = useState([])
    const [hands, setHands] = useState([])
    const [rakebackData, setRakebackData] = useState([])
    const [sortedTournaments, setSortedTournaments] = useState([])
    const [dateFormattedTournaments, setDateFormattedTournaments] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [refetch, setRefetch] = useState(0)

    const tabs = ["Folder", "Graphs"]

    const getUrl = "http://localhost:3001/tournaments/dateSorted"
    const delUrl = "http://localhost:3001/tournament/"

    useEffect(() => {
        try {
            axios.get(getUrl)
                .then(res => {
                    setIsLoading(false)
                    setTournaments(res.data[0])
                    setRakebackData(res.data[1])
                    setHands(res.data[2])
                    createFolders(res.data[0], setSortedTournaments, setDateFormattedTournaments)
                })
        } catch (e) {
            console.log(e)
        }
    }, [refetch])

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

    if (tournaments?.length == 0) return <div>No tournaments in database</div>

    return (
        <div>
            <div className="ResultsTitleContainer">
                <h2>Tournament Results ({tournaments?.length})</h2>
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
                            tournaments={tournaments}
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
