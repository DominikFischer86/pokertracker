import React from "react"
import { array, func } from "prop-types"

import { prettyHolecards } from "../../../helpers/prettyHolecards"

import "../HandReplayer.scss"

const HandList = ({hands, selectHand}) => {
  const meta = hands[0].meta
  const preflop = hands[10].preflop

  return (
    <div className="handList">
      <h2>Hands</h2>
      <hr />
      <ul>
        {meta.map(meta => {
          const handId = meta.handId
          const holeCards = preflop.find(elem => elem.handId === handId).holeCards
          const cardA = holeCards.split(" ")[0]
          const cardB = holeCards.split(" ")[1]
          const prettyCardA = prettyHolecards(cardA)
          const prettyCardB = prettyHolecards(cardB)
          const matcher = /[A,K,Q,J,T]|[2-9]/g

          return (
            <li key={handId} id={handId} className="listButton" onClick={() => selectHand(handId)}>
              <p>{handId}</p>
              <p><span className={cardA.split(matcher)[1]}>{prettyCardA}</span><span className={cardB.split(matcher)[1]}>{prettyCardB}</span></p>
            </li>
          )

        })}
      </ul>
    </div>
  )
}

HandList.propTypes = {
  hands: array,
  selectHand: func
}

export default HandList
