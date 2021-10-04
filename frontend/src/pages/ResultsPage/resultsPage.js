import React, { useState, useEffect } from "react"

import ResultsTable from "./components/ResultsTable"

const ResultsPage = () => {
    const [tournaments, setTournaments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:3001/results")
            .then(res => {
                if (res.ok) {
                    setIsLoading(false)
                    return res.json()
                }
            })
            .then(jsonRes => setTournaments(jsonRes))
            .catch(err => console.log(err))
        
    }, [])

    const onDelete = id => {
        if (confirm(`Do you really want to remove tournament #${id}`)){
            console.log("Aye")
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