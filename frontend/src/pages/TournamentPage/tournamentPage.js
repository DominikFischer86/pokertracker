import React, { useState, useEffect } from "react"
import axios from "axios"

import EditablePanels from "./components/EditablePanels"
import PlayerPlacements from "./components/PlayerPlacements"
// import PlayerPlacements from "./components/PlayerPlacements"

const TournamentPage = () => {
    const [tournament, setTournament] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isEditMode, setIsEditMode] = useState(false)
    const [formState, setFormState] = useState({})
    const url = "http://localhost:3001" + window.location.pathname
    
    useEffect( async () => {
        try {
             await axios.get(url)
                .then(res => {      
                    console.log(res)              
                    setTournament(res.data)
                    setFormState({
                        buyIn: res.data[0].buyIn,
                        rake: res.data[0].rake,
                        rebuys: res.data[0].rebuys,
                        prizePool: res.data[0].prizePool,
                        startDate: res.data[0].startDate,
                        startTime: res.data[0].startTime,
                        finalPosition: res.data[0].finalPosition,
                        playerPrizeMoney: res.data[0].playerPrizeMoney,
                        bounties: res.data[0].bounties
                    })         
                    setIsLoading(false)          
                })
        } catch (e) {
            console.log(e)
        }
    }, [])

    const handleChange = (property, e) => {
        setFormState(oldState => ({ ...oldState, [property]: e.target.value }))
        
    }

    const submitChange = () => {
        setIsEditMode(false)
    }

    const props = {
        isEditMode: isEditMode,
        setIsEditMode: setIsEditMode,
        handleChange: handleChange,
        formState: formState,
        submitChange: submitChange,
        tournament: tournament
    }

    if (!tournament) return

    return (
        <div>
            {isLoading && <div>Loading data...</div>}
            {!isLoading && tournament &&
            <>
                <h2>Tournament #{tournament[0]?.tournamentId}</h2>
                <hr />
                <div className="Panel">
                    <EditablePanels
                        property="buyIn"
                        {...props}
                    />
                    <EditablePanels 
                        property="rake"
                        {...props}
                    />
                    <EditablePanels 
                        isEditable
                        property="rebuys"
                        {...props}
                    />
                    <EditablePanels 
                        property="prizePool"
                        {...props}
                    />
                    <EditablePanels                         
                        property="startDate"
                        {...props}
                    />
                    <EditablePanels                         
                        property="startTime"
                        {...props}
                    />
                    <EditablePanels 
                        property="finalPosition"
                        {...props}
                    />
                    <EditablePanels
                        property="playerPrizeMoney"
                        {...props}
                    />
                    <EditablePanels 
                        isEditable
                        property="bounties"
                        {...props}
                    />
                </div>
                <hr />
                { tournament[0]?.placements.length > 0 &&
                    <h2>Finish Position of {tournament[0]?.playerAmount} players</h2>
                }                
                <div className="Player_Container">
                    {Object.keys(tournament[0]?.placements).map((key,index) => <PlayerPlacements key={index} placement={tournament[0].placements[key]} />)} 
                </div>
            </>
            }
        </div>
    )
}

export default TournamentPage