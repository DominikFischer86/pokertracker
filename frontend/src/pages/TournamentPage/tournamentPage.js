import React, { useState, useEffect } from "react"
import axios from "axios"

import EditablePanels from "./components/EditablePanels"

const TournamentPage = () => {
    const [tournament, setTournament] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isEditMode, setIsEditMode] = useState(false)
    const [formState, setFormState] = useState({})
    const url = "http://localhost:3001" + window.location.pathname

    console.log(formState)

    useEffect( () => {
        try {
             axios.get(url)
                .then(res => {
                    setIsLoading(false)
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

    return (
        <div>
            {isLoading && <div>Loading data...</div>}
            {!isLoading &&
            <>
                <h2>Tournament #{tournament[0]?.tournamentId}</h2>
                <hr />
                <div className="Panel">
                    <EditablePanels 
                        isEditable
                        property="buyIn"
                        {...props}
                    />
                    <EditablePanels 
                        isEditable
                        property="rake"
                        {...props}
                    />
                    <EditablePanels 
                        isEditable
                        property="rebuys"
                        {...props}
                    />
                    <EditablePanels 
                        isEditable
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
                        isEditable
                        property="finalPosition"
                        {...props}
                    />
                    <EditablePanels
                        isEditable
                        property="playerPrizeMoney"
                        {...props}
                    />
                    <EditablePanels 
                        isEditable
                        property="bounties"
                        {...props}
                    />
                </div>
            </>
            }
        </div>
    )
}

export default TournamentPage