import React, { useEffect, useState } from "react"
import axios from "axios"

import { createUsers } from "./helpers"

import { ImportConfirmationModal } from "../../components/Modals/ConfirmationModal"

import "./playerAnalysisPage.scss"

const PlayerAnalysisPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [players, setPlayers] = useState([])
    const [tournaments, setTournaments] = useState([])
    const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState({successMessageList: []})

    const heroName = "KeinKönich"

    const url = "http://localhost:3001" + window.location.pathname

    useEffect(async () => {
        try {
             await axios.get(url)
                .then(res => {
                    setTournaments(res.data[0])
                    setPlayers(res.data[1])
                    setIsLoading(false)
                })
        } catch (e) {
            console.log(e)
        }
    }, [])

    const createUserClick = () => {
        const allPlayers = createUsers(tournaments, heroName)
        const url = "http://localhost:3001/player-analysis"
        setPlayers(allPlayers)
        setIsLoading(true)

        let successMessageList = []
        allPlayers.splice(1,500).forEach((player,index) => {
            const newPlayer = {
                playerId: player.playerId,
                playerName: player.playerName,
                playerCountry: player.playerCountry,
                playerIsHero: player.playerIsHero,
                playerTournaments: player.playerTournaments
            }
            
            setTimeout(async () => {
                await axios.post(url, newPlayer)
                console.log(`Loading ${index+1} of ${allPlayers.length}`)
            }, 1000)
            
        })

        successMessageList.push(`Added Players: ${allPlayers.length}`)
        console.log(`Added Players: ${allPlayers.length}`)
        setModalContent({successMessageList})
        openModal()
        setIsLoading(false)
    }

    const updateUserClick = () => {
        alert("Click!")
    }

    const openModal = () => {
        setConfirmationModalIsOpen(true) 
    }

    const closeModal = () => {
        setConfirmationModalIsOpen(false)          
    }

    return (        
        <div>
            {isLoading && <div>Loading user list...</div>}
            {!isLoading &&
                <div>
                    {players.length > 0 &&
                    <ImportConfirmationModal 
                        confirmationModalIsOpen={confirmationModalIsOpen}
                        closeModal={closeModal}
                        modalContent={modalContent}
                    />
                    }                     
                    <div className="Player_analysis_title">
                        <h2>All Players</h2>
                        <button style={{display: players.length > 0 ? "none" : "block"}} onClick={createUserClick}>Create user database</button>
                        <button style={{display: players.length > 0 ? "block" : "none"}} onClick={updateUserClick}>Update user database</button>
                    </div>
                    <hr />
                    <ul style={{display: "flex", flexWrap: "wrap" }}>
                        {players.map(
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
                                #{index} {player.playerName}
                            </li>
                        )}
                    </ul>
                </div>
            }
        </div>
    )
}

export default PlayerAnalysisPage