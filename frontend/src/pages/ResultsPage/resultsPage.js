import React, { useState, useEffect } from "react"
import axios from "axios"
import { Switch } from "@react-md/form"

import ResultsTable from "./components/ResultsTable"
import ResultsGraph from "./components/ResultsGraph"

const ResultsPage = () => {
    const [tournaments, setTournaments] = useState([])
    const [viewToggle, setViewToggle] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [refetch, setRefetch] = useState(0)

    const handleSwitch = () => {
        setViewToggle(!viewToggle)
    }

    const url = "http://localhost:3001/results/"    

    useEffect(async () => {
        try {
            await axios.get(url)
                .then(res => {
                    setIsLoading(false)
                    setTournaments(res.data)
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
                <Switch 
                    id="view-switcher" 
                    name="view-switcher" 
                    label={!viewToggle ? "View tables" : "View graph"}
                    onChange={handleSwitch} 
                />
            </div>
            <hr />
            {viewToggle 
            ? <ResultsTable
                tournaments={tournaments}
                isLoading={isLoading}
                onDelete={onDelete}
            />
            : <ResultsGraph 
                tournaments={tournaments}
                setTournaments={setTournaments}
                isLoading={isLoading} 
            />
            }
        </div>
        
    )
}

export default ResultsPage