import React, { useState, useContext } from "react"
import { object, array } from "prop-types"

import { Switch } from "@react-md/form"

import Spinner from "../../../components/Spinner/Spinner"
import { MetaContext } from "../../../index"

import Seat from "./Seat"

import "./styles/Replayer.scss"

const Replayer = ({tournament, activeHand}) => {
  const [toggleBlindUnits, setToggleBlindUnits] = useState(false)
  const [toggleNames, setToggleNames] = useState(false)

  const maxPlayers =  tournament[0].playerAmount

  const { heroName, appName } = useContext(MetaContext)
  if (Object.keys(activeHand).length < 1) return <Spinner message="Select a hand" />
  const { smallBlind, bigBlind, level, date, time, ante } = activeHand["1_meta"]
  const playerPositions = ["2_seat_1", "3_seat_2", "4_seat_3", "5_seat_4", "6_seat_5", "7_seat_6", "8_seat_7", "9_seat_8", "10_seat_9"]
  const activePlayers = playerPositions.filter(position => activeHand[position]).length

  const initialPot = smallBlind + bigBlind + ante * activePlayers
  let pot = initialPot
  const potInBb = parseFloat(pot / bigBlind).toFixed(1)

  return (
    <div className="replayer">
      <div className="titleWrapper">
        <h2>Replayer</h2>
        <Switch 
            id="name-switcher" 
            name="name-switcher" 
            label={!toggleNames ? "Hide names": "Show names"}
            onChange={() => setToggleNames(!toggleNames)} 
        />
        <Switch 
            id="blind-switcher" 
            name="blind-switcher" 
            label={!toggleBlindUnits ? "Chips Units" : "Blind Units"}
            onChange={() => setToggleBlindUnits(!toggleBlindUnits)} 
        />
      </div>     
      <hr />
      <div className="canvas">
        <div className="metaBar">
              {ante > 0 && <p>Level: {level} - Blinds: {smallBlind}/{bigBlind} - Ante: {ante}</p>}
              {ante === 0 && <p>Level: {level} - Blinds: {smallBlind}/{bigBlind}</p>}
              <p>Time: {date} - {time}</p>
        </div>
        <div className="table">
          <p className="pot">Pot: {toggleBlindUnits ? potInBb : pot}</p>
          {ante > 0 && <p className="ante">Ante: {ante * activePlayers}</p>}          
          <p className="appTitle">{appName}</p>
            {playerPositions.map(position => {
              const seat = "seat_" + position.split("seat_")[1]

              return (
                <Seat 
                  key={position} 
                  seat={seat} 
                  seatedPlayer={activeHand[position]}
                  toggleBlindUnits={toggleBlindUnits}
                  toggleNames={toggleNames}
                  heroName={heroName}
                  bigBlind={bigBlind}
                  initialPot={initialPot}
                  activePlayers={activePlayers}
                  maxPlayers={maxPlayers}
                  playerAction={""}
                  bet={0}
                />
              )
            })}          
        </div>
      </div>
    </div>
  )
}

Replayer.propTypes = {
  tournament: array,
  activeHand: object
}

export default Replayer
