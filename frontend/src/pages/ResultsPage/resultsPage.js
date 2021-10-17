import React, { useState, useEffect } from "react"
import axios from "axios"

import { TabsManager, Tabs, TabPanels, TabPanel } from "@react-md/tabs"

import ResultsGraph from "./components/ResultsGraph/ResultsGraph"
import ResultsFolder from "./components/ResultsFolder/ResultsFolder"

import { createFolders } from "./helpers"

const ResultsPage = () => {
    const [tournaments, setTournaments] = useState([])
    const [sortedTournaments, setSortedTournaments] = useState([])
    const [dateFormattedTournaments, setDateFormattedTournaments] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [refetch, setRefetch] = useState(0)

    const tabs = ["Folder", "Graphs"]

    const url = "http://localhost:3001/results/"    

    useEffect(async () => {
        try {
            await axios.get(url)
                .then(res => {
                    setIsLoading(false)
                    setTournaments(res.data)
                    createFolders(res.data, setSortedTournaments, setDateFormattedTournaments)
                })
        } catch (e) {
            console.log(e)
        }
    }, [refetch])

    const onDelete =  id => {
        if (confirm(`Do you really want to remove tournament #${id}`)){
            try {
                axios.delete(url + id)
                setIsLoading(false)
                console.log(`%c Deleted tournament: #${id}`, "color: red")
                setRefetch(refetch+1)
            } catch (e) {
                console.log(e)
            }            
        }         
    }

    return (
        <div>
            <div className="ResultsTitleContainer">
                <h2>Tournament Results ({tournaments?.length})</h2>
            </div>
            <hr />
            <TabsManager tabs={tabs} tabsId="tournament-results" onClick={() => alert("Tab")}>
                <Tabs />
                <hr />
                <TabPanels>
                    <TabPanel>
                        <ResultsFolder 
                            sortedTournaments={sortedTournaments}
                            dateFormattedTournaments={dateFormattedTournaments}
                            isLoading={isLoading}
                            onDelete={onDelete}
                        />
                    </TabPanel>
                    <TabPanel>
                        <ResultsGraph 
                            tournaments={tournaments}
                            isLoading={isLoading} 
                        />
                    </TabPanel>
                </TabPanels>
            </TabsManager>
        </div>        
    )
}

export default ResultsPage