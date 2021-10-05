import React, { useState, useEffect } from "react"

const TournamentPage = () => {
    const [tournament, setTournament] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const url = "http://localhost:3001" + window.location.pathname

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (res.ok) {
                    setIsLoading(false)
                    return res.json()
                }
            })
            .then(jsonRes => {
                setTournament(jsonRes)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            {isLoading && <div>Loading data...</div>}
            {!isLoading &&
            <>
                <h2>Tournament #{tournament[0]?.tournamentId}</h2>
                <hr />
            </>
            }
        </div>
    )
}

export default TournamentPage