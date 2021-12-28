import React, { useContext } from "react"
import { object, array } from "prop-types"

import { FaCoins } from "react-icons/fa"

import Spinner from "../../../components/Spinner/Spinner"
import { MetaContext } from "../../../index"
import { formatPosition } from "../helper"

const Replayer = ({tournament, activeHand}) => {
  const { appName } = useContext(MetaContext)
  if (Object.keys(activeHand).length < 1) return <Spinner message="Select a hand" />
  const { smallBlind, bigBlind, level, date, time } = activeHand["1_meta"]
  const { playerOutOfHand, playerSitOut, playerSeat, playerName, playerStack, playerBigBlind } = activeHand["2_seat_1"]
  const position = formatPosition(!playerOutOfHand, playerSeat, playerBigBlind > 0)
  console.log(tournament)
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
          <div className="seat">
            <p>{playerSeat}</p>
            <p>{playerName}</p>
            <p>{playerStack}</p>
          </div>
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
