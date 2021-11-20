import React, { useState, useEffect } from "react"
import axios from "axios"

import EditablePanels from "./components/EditablePanels"
import PlayerPlacements from "./components/PlayerPlacements"

const heroName = "KeinKönich"

const TournamentPage = () => {
    const [tournament, setTournament] = useState([])
    const [players, setPlayers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isEditMode, setIsEditMode] = useState(false)
    const [formState, setFormState] = useState({})
    const [refetch, setRefetch] = useState(0)
    const [playerPosition, setPlayerPosition] = useState(0)
    const getUrl = "http://localhost:3001" + window.location.pathname
    const patchUrl = "http://localhost:3001" + window.location.pathname

    useEffect(() => {
        try {
             axios.get(getUrl)
                .then(res => {
                    setPlayerPosition(res.data[0][0].placements.find(element => element.playerName === heroName)?.finishPosition)
                    setTournament(res.data[0][0])
                    setFormState({
                        buyIn: res.data[0][0].buyIn,
                        rake: res.data[0][0].rake,
                        rebuys: res.data[0][0].rebuys,
                        prizePool: res.data[0][0].prizePool,
                        startDate: res.data[0][0].startDate,
                        startTime: res.data[0][0].startTime,
                        finalPosition: res.data[0][0].finalPosition,
                        playerPrizeMoney: res.data[0][0].playerPrizeMoney,
                        bounties: res.data[0][0].bounties
                    })
                    setPlayers(res.data[1])
                    setIsLoading(false)
                })
        } catch (e) {
            console.log(e)
        }
    }, [refetch, getUrl])

    const handleChange = (property, e) => {
        setFormState(oldState => ({ ...oldState, [property]: e.target.value }))

    }

    const submitChange = async () => {
        const data = {
            ...tournament,
            buyIn: parseFloat(formState.buyIn),
            rake: parseFloat(formState.rake),
            rebuys: parseFloat(formState.rebuys),
            prizePool: parseFloat(formState.prizePool),
            startDate: formState.startDate,
            startTime: formState.startTime,
            finalPosition: parseFloat(formState.finalPosition),
            playerPrizeMoney: parseFloat(formState.playerPrizeMoney),
            bounties: parseFloat(formState.bounties)
        }

        await axios.patch(patchUrl, data).then(
            alert("Successfully updated tournament #" + tournament.tournamentId),
            setIsEditMode(false),
            setRefetch(refetch + 1)
        )
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
                <h2>Tournament #{tournament?.tournamentId}</h2>
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
                { tournament?.placements.length > 0 &&
                    <h2>Final known positions of {tournament?.playerAmount} players</h2>
                }
                <div className="Player_Container">
                    <PlayerPlacements
                        heroName={heroName}
                        players={players}
                        heroPosition={playerPosition}
                        tournament={tournament}
                    />
                </div>
            </>
            }
        </div>
    )
}

export default TournamentPage
