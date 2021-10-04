import React, { useState, useEffect } from "react"
import axios from "axios"
import ResultsTable from "./components/ResultsTable"

const ResultsPage = () => {
    const [tournaments, setTournaments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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
        
    }, [tournaments])

    const onDelete = id => {
        if (confirm(`Do you really want to remove tournament #${id}`)){
            axios.delete(url + id)
            console.log("Deleted tournament #" + id)
        }         
    }

    return (
        <ResultsTable
            tournaments={tournaments}
            isLoading={isLoading}
            onDelete={onDelete}
        />
    )
}

export default ResultsPage