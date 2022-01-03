import React, { useEffect, useState, useContext } from "react"
import axios from "axios"
import { ResponsivePie } from '@nivo/pie'

import { FaTrashAlt, FaDatabase, FaSyncAlt } from "react-icons/fa"

import { createUsers } from "./helpers"
import { MetaContext } from "../../index"

import { ImportConfirmationModal } from "../../components/Modals/ImportConfirmationModal"
import Spinner from "../../components/Spinner/Spinner"
import PlayerTable from "./components/PlayerTable"

import "./playerAnalysisPage.scss"

const PlayerAnalysisPage = () => {
    const { heroName } = useContext(MetaContext)

    const [isLoading, setIsLoading] = useState(true)
    const [players, setPlayers] = useState([])
    const [tournaments, setTournaments] = useState([])
    const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState({successMessageList: []})
    const [refetch, setRefetch] = useState(0)

    const getUrl = "http://localhost:3001/players/"
    const postUrl = "http://localhost:3001/players/"
    const delUrl = "http://localhost:3001/player/"
    const killUrl = "http://localhost:3001/killall/"

    useEffect(() => {
        try {
             axios.get(getUrl)
                .then(res => {
                    setPlayers(res.data[1])
                    setTournaments(res.data[0])
                    setIsLoading(false)
                })
        } catch (e) {
            console.log(e)
        }
    }, [refetch])

    const countPlayerCountries = players.reduce((allPlayers, country) => {
        const { playerCountry } = country
        if (playerCountry in allPlayers) {
            allPlayers[playerCountry]++
        } else {
            allPlayers[playerCountry] = 1
        } return allPlayers
    }, {})

    const countries = Object.keys(countPlayerCountries)
    const countryChartData = []
    countries.map(country => {
        const countryObject = {
            "id": country,
            "label": country,
            "value": countPlayerCountries[country]
        }
        if (countPlayerCountries[country] > 150) countryChartData.push(countryObject)
    })

    const createUserClick = () => {
        const allPlayers = createUsers(tournaments, heroName)
        setPlayers(allPlayers)
        setIsLoading(true)

        let successMessageList = []

        axios.post(postUrl, allPlayers)

        successMessageList.push(`Added Players: ${allPlayers.length}`)
        setModalContent({successMessageList})
        openModal()
        setIsLoading(false)
    }

    const removeUsersClick = async () => {
        await axios.delete(killUrl)
        .then(console.log("All Players removed"))
        .then(setRefetch(refetch+1))
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
            axios.post(postUrl, playerDifferenceList)
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
                axios.delete(delUrl + id)
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
                <>
                    <div>
                        {players.length > 0 &&
                        <ImportConfirmationModal
                            confirmationModalIsOpen={confirmationModalIsOpen}
                            closeModal={closeModal}
                            modalContent={modalContent}
                        />
                        }
                        <div className="Player_analysis_title">
                            <h2>All Players {players.length > 0 ? `(${players.length})` : null}*</h2>
                            <div>
                                <FaTrashAlt 
                                    onClick={removeUsersClick}
                                    title="Remove all users"
                                    className="trash-icon"
                                    style={{color: "red", display: players.length > 0 ? "block" : "none"}}
                                />
                                <FaDatabase 
                                    onClick={createUserClick}
                                    title="Create user database"
                                    className="trash-icon"
                                    style={{color: "green", display: players.length > 0 ? "none" : "block"}}
                                />
                                <FaSyncAlt 
                                    onClick={updateUserClick}
                                    title="Update user database"
                                    className="trash-icon"
                                    style={{color:"green", display: players.length > 0 ? "block" : "none"}}
                                />
                            </div>
                        </div>
                        <hr />
                        <p>* only show players with 10 or more tournaments</p>
                        <PlayerTable
                            players={players}
                            isLoading={isLoading}
                            onDelete={deletePlayer}
                        />
                    </div>
                    <hr />
                    <h2>Country stats</h2>
                    {!players.length && <p>No player based countries detected</p>}
                    {players.length > 0 &&
                    <>
                        <p>Show top {countryChartData.length} countries from {countries.length} countries total</p>
                        <div className="countryChart">
                            <ResponsivePie 
                                data={countryChartData}
                                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                                padAngle={0.5}
                                sortByValue
                                activeOuterRadiusOffset={20}
                                arcLabelsRadiusOffset={0.8}
                                innerRadius={0.5}
                                borderWidth={1}
                                colors={{ scheme: 'category10' }}
                                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                                legends={[
                                    {
                                        anchor: 'left',
                                        direction: 'column',
                                        justify: false,
                                        translateX: 0,
                                        translateY: 56,
                                        itemsSpacing: 0,
                                        itemWidth: 100,
                                        itemHeight: 18,
                                        itemTextColor: '#999',
                                        itemDirection: 'left-to-right',
                                        itemOpacity: 1,
                                        symbolSize: 18,
                                        symbolShape: 'circle',
                                        effects: [
                                            {
                                                on: 'hover',
                                                style: {
                                                    itemTextColor: '#000'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }        
                            />
                        </div>
                    </>
                    }
                </>
            }
        </div>
    )
}

export default PlayerAnalysisPage
