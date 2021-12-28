import React, { useState, useEffect } from "react"
import axios from "axios"

import Spinner from "../../components/Spinner/Spinner"

import "./HandReplayer.scss"

const HandReplayerPage = () => {
  const [tournament, setTournament] = useState({})
  const [hands, setHands] = useState([])

  const tournamentId =  window.location.pathname.split("/")[2]
  const getHandsOfTournamentUrl = "http://localhost:3001/hand-histories-for-tournament/" + tournamentId

  useEffect(() => {
    try {
      axios.get(getHandsOfTournamentUrl)
        .then(res => console.log(res))
    } catch (e) {
      console.log(e)
    }
  }, [getHandsOfTournamentUrl])

  return (
    <div>
      <h1>Hand Replayer (Tournament: #{tournamentId})</h1>
      <hr />
    </div>
  )
}

export default HandReplayerPage
