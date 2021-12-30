import React, { useContext } from "react"
import { object, array } from "prop-types"

import { FaCoins } from "react-icons/fa"

import Spinner from "../../../components/Spinner/Spinner"
import { MetaContext } from "../../../index"

import Seat from "./Seat"

const Replayer = ({tournament, activeHand}) => {
  const { appName } = useContext(MetaContext)
  if (Object.keys(activeHand).length < 1) return <Spinner message="Select a hand" />
  const { smallBlind, bigBlind, level, date, time } = activeHand["1_meta"]
  const playerPositions = ["2_seat_1", "3_seat_2", "4_seat_3", "5_seat_4", "6_seat_5", "7_seat_6", "8_seat_7", "9_seat_8", "10_seat_9"]

  // console.log(tournament)
  console.log(activeHand)

  return (
    <div className="replayer">
      <h2>Replayer</h2>
      <hr />
      <div className="canvas">
        <div className="metaBar">
              <p>Level: {level} - {smallBlind}/{bigBlind}</p>
              <p>Time: {date} - {time}</p>
        </div>
        <div className="table">
          <p className="appTitle">{appName}</p>
            {playerPositions.map(position => {
              const seat = "seat_" + position.split("seat_")[1]

              return (
                <Seat key={position} seat={seat} seatedPlayer={activeHand[position]} />
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
