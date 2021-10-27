import React, { useEffect, useState } from "react"
import axios from "axios"

import { createUsers } from "./helpers"

import "./playerAnalysisPage.scss"

const PlayerAnalysisPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [players, setPlayers] = useState([])
    const [tournaments, setTournaments] = useState([])

    const heroName = "KeinKönich"

    const url = "http://localhost:3001" + window.location.pathname

    useEffect(async () => {
        try {
             await axios.get(url)
                .then(res => {      
                    setTournaments(res.data)
                    setIsLoading(false)
                })
        } catch (e) {
            console.log(e)
        }
    }, [])

    const createUserClick = () => {
        createUsers(tournaments, setIsLoading, setPlayers, heroName)  
    }

    const updateUserClick = () => {
        alert("Click!")
    }

    return (        
        <div>
            {isLoading && <div>Loading and creating user list...</div>}
            {!isLoading &&
                <div>
                    <div className="Player_analysis_title">
                        <h2>All Players</h2>
                        <button style={{display: players.length > 0 ? "none" : "block"}} onClick={createUserClick}>Create user database</button>
                        <button style={{display: players.length > 0 ? "block" : "none"}} onClick={updateUserClick}>Update user database</button>
                    </div>
                    <hr />
                    <ul style={{display: "flex", flexWrap: "wrap" }}>
                        {players.splice(1, 100).map(
                            (player, index) => 
                            <li 
                                style={{
                                    listStyleType:"none", 
                                    border: "1px solid #000", 
                                    margin: "5px", 
                                    padding: "10px"
                                }} 
                                key={index}
                            >
                                #{index} {Object.values(player)[0].playerName}
                            </li>
                        )}
                    </ul>
                </div>
            }
        </div>
    )
}

export default PlayerAnalysisPage