import React, { useState, useEffect} from "react"
import axios from "axios"


const PlayerPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [player, setPlayer] = useState([])
    const url = "http://localhost:3001" + window.location.pathname

    useEffect(async () => {
        try {
             await axios.get(url)
                .then(res => {
                    console.log(res)
                    setIsLoading(true)
                    setPlayer(res.data[0])
                    setIsLoading(false)
                })
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <div>
        {isLoading && <div>Loading user...</div>}
            {!isLoading && 
            <>
                <h2>{player?.playerName}</h2>
                <hr />
            </>
            }
        </div>
    )
}

export default PlayerPage