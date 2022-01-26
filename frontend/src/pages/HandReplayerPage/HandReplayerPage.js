import React, { useState, useEffect, useContext } from "react"
import axios from "axios"

import { Button } from "@react-md/button"
import { FaList } from "react-icons/fa"

import { MetaContext } from "../../index"
import Spinner from "../../components/Spinner/Spinner"

import HandList from "./components/HandList"
import Replayer from "./components/Replayer"

import "./HandReplayer.scss"

const HandReplayerPage = () => {
  const [tournament, setTournament] = useState({})
  const [hands, setHands] = useState([])
  const [activeHand, setActiveHand] = useState({})
  const [slideNavToggle, setSlideNavToggle] = useState(true)

  const tournamentId =  window.location.pathname.split("/")[2]
  const { appName } = useContext(MetaContext)
  const getHandsOfTournamentUrl = "http://localhost:3001/hand-histories-for-tournament/" + tournamentId

  useEffect(() => {
    try {
      axios.get(getHandsOfTournamentUrl)
        .then(res => {
          setTournament(res.data[0])
          const handResults = [
            {meta: res.data[1][0]?.meta},
            {seat_1: res.data[2][0]?.["seat_1"]},
            {seat_2: res.data[3][0]?.["seat_2"]},
            {seat_3: res.data[4][0]?.["seat_3"]},
            {seat_4: res.data[5][0]?.["seat_4"]},
            {seat_5: res.data[6][0]?.["seat_5"]},
            {seat_6: res.data[7][0]?.["seat_6"]},
            {seat_7: res.data[8][0]?.["seat_7"]},
            {seat_8: res.data[9][0]?.["seat_8"]},
            {seat_9: res.data[10][0]?.["seat_9"]},
            {preflop: res.data[11][0]?.["preflop"]},
            {flop: res.data[12][0]?.["flop"]},
            {turn: res.data[13][0]?.["turn"]},
            {river: res.data[14][0]?.["river"]},
            {summary: res.data[15][0]?.["summary"]},
          ]
          setHands(handResults)
        })
    } catch (e) {
      console.log(e)
    }
    document.title = `${appName} - Hand Replayer`
  }, [appName, getHandsOfTournamentUrl])

  const meta = hands[0]?.meta
  const seat_1 = hands[1]?.["seat_1"]
  const seat_2 = hands[2]?.["seat_2"]
  const seat_3 = hands[3]?.["seat_3"]
  const seat_4 = hands[4]?.["seat_4"]
  const seat_5 = hands[5]?.["seat_5"]
  const seat_6 = hands[6]?.["seat_6"]
  const seat_7 = hands[7]?.["seat_7"]
  const seat_8 = hands[8]?.["seat_8"]
  const seat_9 = hands[9]?.["seat_9"]
  const preflop = hands[10]?.preflop
  const flop = hands[11]?.flop
  const turn = hands[12]?.turn
  const river = hands[13]?.river
  const summary = hands[14]?.summary

  const selectHand = id => {
    const listElement = document.getElementById(id)
    const allListElements = document.querySelectorAll(".listButton")
    allListElements.forEach(element => element.classList.remove("active"))
    const classList = listElement.classList
    classList.add("active")

    const handMeta = meta.find(elem => elem.handId === id)
    const handSeat_1 = seat_1?.find(elem => elem.handId === id)
    const handSeat_2 = seat_2?.find(elem => elem.handId === id)
    const handSeat_3 = seat_3?.find(elem => elem.handId === id)
    const handSeat_4 = seat_4?.find(elem => elem.handId === id)
    const handSeat_5 = seat_5?.find(elem => elem.handId === id)
    const handSeat_6 = seat_6?.find(elem => elem.handId === id)
    const handSeat_7 = seat_7?.find(elem => elem.handId === id)
    const handSeat_8 = seat_8?.find(elem => elem.handId === id)
    const handSeat_9 = seat_9?.find(elem => elem.handId === id)
    const handPreflop = preflop.find(elem => elem.handId === id)
    const handFlop = flop.find(elem => elem.handId === id)
    const handTurn = turn.find(elem => elem.handId === id)
    const handRiver = river.find(elem => elem.handId === id) || null
    const handSummary = summary.find(elem => elem.handId === id)
    const selectedHand = {
      "1_meta": handMeta,
      "2_seat_1": handSeat_1,
      "3_seat_2": handSeat_2,
      "4_seat_3": handSeat_3,
      "5_seat_4": handSeat_4,
      "6_seat_5": handSeat_5,
      "7_seat_6": handSeat_6,
      "8_seat_7": handSeat_7,
      "9_seat_8": handSeat_8,
      "10_seat_9": handSeat_9,
      "11_preflop": handPreflop,
      "12_flop": handFlop,
      "13_turn": handTurn,
      "14_river": handRiver,
      "15_summary": handSummary
    }
    setActiveHand(selectedHand)
  }

  return (
    <div>
      <div className="headerNav">
      <h1>{`Hand Replayer (Tournament: #${tournamentId})`}</h1>
      <Button
          id="handList-button"
          buttonType="icon"
          onClick={() => setSlideNavToggle(!slideNavToggle)}
          theme="primary"
          themeType="contained"
          title="Open hand selection"
        >
          <FaList />
      </Button>
      </div>
      <hr />
      {!hands[0]?.meta &&
        <Spinner message="No data found" />
      }
      {hands[0]?.meta &&
      <div className="row">
          <div id="nav-column" className={slideNavToggle ? "" : "toggled"}>
              <HandList hands={hands} selectHand={selectHand} setSlideNavToggle={setSlideNavToggle} slideNavToggle={slideNavToggle} onClick={() => setSlideNavToggle(!slideNavToggle)} />
          </div>
          <div id="player-column">
            <Replayer tournament={tournament} activeHand={activeHand} />
          </div>
      </div>
      }
    </div>
  )
}

export default HandReplayerPage
