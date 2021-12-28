import React from "react"
import { array, func, bool } from "prop-types"

import { prettyHolecards } from "../../../helpers/prettyHolecards"
import { FaSortDown } from "react-icons/fa"

import "../HandReplayer.scss"

const HandList = ({hands, selectHand, slideNav, slideNavToggle}) => {
  const meta = hands[0].meta
  const preflop = hands[10].preflop

  return (
    <div className="handList">
      <div className="headerNav">
        <h2>Hands</h2>
        <button onClick={slideNav} className={slideNavToggle ? "" : "toggled"}><FaSortDown /></button>
      </div>
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
            <li key={handId} id={handId} className={slideNavToggle ? "listButton" : "listButton toggled"} onClick={() => selectHand(handId)}>
              <p className={slideNavToggle ? "" : "toggled"}>{handId}</p>
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
  selectHand: func,
  slideNav: func,
  slideNavToggle: bool
}

export default HandList
