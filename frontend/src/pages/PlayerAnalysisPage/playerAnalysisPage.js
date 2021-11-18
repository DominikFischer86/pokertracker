import React, { useEffect, useState } from "react"
import axios from "axios"

import { createUsers } from "./helpers"

import { ImportConfirmationModal } from "../../components/Modals/ConfirmationModal"
import Spinner from "../../components/Spinner/Spinner"
import PlayerTable from "./components/PlayerTable"

import "./playerAnalysisPage.scss"

const PlayerAnalysisPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [players, setPlayers] = useState([])
    const [tournaments, setTournaments] = useState([])
    const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState({successMessageList: []})
    const [refetch, setRefetch] = useState(0)

    const heroName = "KeinKönich"

    const url = "http://localhost:3001/player-analysis/"

    useEffect(() => {
        try {
             axios.get(url)
                .then(res => {
                    setTournaments(res.data[0])
                    setPlayers(res.data[1])
                    setIsLoading(false)
                })
        } catch (e) {
            console.log(e)
        }
    }, [refetch])

    const createUserClick = () => {
        const allPlayers = createUsers(tournaments, heroName)
        setPlayers(allPlayers)
        setIsLoading(true)

        let successMessageList = []

        axios.post(url, allPlayers)

        successMessageList.push(`Added Players: ${allPlayers.length}`)
        setModalContent({successMessageList})
        openModal()
        setIsLoading(false)
    }

    const updateUserClick = () => {
        let oldPlayerList = []
        let newPlayerList = []
        let playerDifferenceList = []
        const newPlayers = createUsers(tournaments, heroName)
        players.filter(oldPlayer => {
            oldPlayerList.push(oldPlayer.playerName)
        })
        newPlayers.filter(newPlayer => {
            newPlayerList.push(newPlayer.playerName)
        })
        const difference = newPlayerList.filter(newPlayer => !oldPlayerList.includes(newPlayer))

        difference.forEach(differentPlayer => {
            playerDifferenceList.push(newPlayers.filter(newPlayer => newPlayer.playerName === differentPlayer)[0])
        })

        if(playerDifferenceList.length > 0) {
            setIsLoading(true)
            let successMessageList = []
            console.log(playerDifferenceList)
            axios.post(url, playerDifferenceList)
            successMessageList.push(`Added Players: ${playerDifferenceList.length}`)
            setModalContent({successMessageList})
            openModal()
            setRefetch(refetch+1)
            setIsLoading(false)
        } else {
            alert("Patch stuff")
        }
    }

    const openModal = () => {
        setConfirmationModalIsOpen(true)
    }

    const closeModal = () => {
        setConfirmationModalIsOpen(false)
    }

    const deletePlayer = id => {
       if (confirm(`Do you really want to remove player #${id}`)){
            try {
                axios.delete(url + id)
                setIsLoading(false)
                console.log(`%c Deleted player: #${id}`, "color: red")
                setRefetch(refetch+1)
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <div>
            {isLoading && <Spinner />}
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
                        <h2>All Players {players.length > 0 ? `(${players.length})` : null}</h2>
                        <button style={{display: players.length > 0 ? "none" : "block"}} onClick={createUserClick}>Create user database</button>
                        <button style={{display: players.length > 0 ? "block" : "none"}} onClick={updateUserClick}>Update user database</button>
                    </div>
                    <hr />
                    <PlayerTable
                        players={players}
                        isLoading={isLoading}
                        onDelete={deletePlayer}
                    />
                </div>
            }
        </div>
    )
}

export default PlayerAnalysisPage
