import React, { useState, useEffect } from "react"
import axios from "axios"

const TournamentPage = () => {
    const [tournament, setTournament] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const url = "http://localhost:3001" + window.location.pathname

    // console.log(tournament)

    useEffect(async () => {
        try {
            await axios.get(url)
                .then(res => {
                    console.log(res)
                    setIsLoading(false)
                    setTournament(res.data)
                })
        } catch (e) {
            console.log(e)
        }
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