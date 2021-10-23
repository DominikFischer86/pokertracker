import React, { useEffect, useState } from "react"
import axios from "axios"

const PlayerAnalysisPage = () => {
    const [tournament, setTournament] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    console.log(tournament)

    const url = "http://localhost:3001" + window.location.pathname

    useEffect(async () => {
        try {
             await axios.get(url)
                .then(res => {      
                    setTournament(res.data[0])
                    setIsLoading(false)          
                })
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (        
        <div>
            {isLoading && <div>Loading tournaments</div>}
        </div>
    )
}

export default PlayerAnalysisPage