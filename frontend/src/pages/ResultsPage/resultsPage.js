import React, { useState, useEffect } from "react"
import axios from "axios"
import { Switch } from "@react-md/form"

import ResultsTable from "./components/ResultsTable"
import ResultsGraph from "./components/ResultsGraph"

const ResultsPage = () => {
    const [tournaments, setTournaments] = useState([])
    const [viewToggle, setViewToggle] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    const handleSwitch = () => {
        setViewToggle(!viewToggle)
    }

    const url = "http://localhost:3001/results/"    

    useEffect(() => {
        let isFetched = false
        fetch(url)
            .then(res => {
                if (res.ok) {
                    setIsLoading(false)
                    return res.json()
                }
            })
            .then(jsonRes => 
                { if (!isFetched) setTournaments(jsonRes)
            })
            .catch(err => console.log(err))
        
        return () => {
            isFetched = true
        }        
    }, [])

    const onDelete = id => {
        if (confirm(`Do you really want to remove tournament #${id}`)){
            axios.delete(url + id)
            console.log("Deleted tournament #" + id)
        }         
    }

    return (
        <div>
            <div className="ResultsTitleContainer">
                <h2>Tournament Results ({tournaments.length})</h2>
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
                isLoading={isLoading} 
            />
            }
        </div>
        
    )
}

export default ResultsPage