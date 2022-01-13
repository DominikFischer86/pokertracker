import React from "react"
import { array, func, bool } from "prop-types"

import { Button } from "@react-md/button"
import { FaChevronRight } from "react-icons/fa"

import { prettyHolecards } from "../../../helpers/prettyHolecards"

import "./styles/HandList.scss"

const HandList = ({hands, selectHand, slideNavToggle, setSlideNavToggle }) => {
  const meta = hands[0].meta
  const preflop = hands[10].preflop

  return (
    <div className="handList">
      <div className="headerNav">
        <h2>Hands</h2>
        <Button
          id="handList-button"
          buttonType="icon"
          onClick={() => setSlideNavToggle(!slideNavToggle)}
          theme="primary"
          themeType="contained"
          title="Close hand selection"
        >
          <FaChevronRight />
      </Button>
      </div>
      <hr />
      <ul>
        {meta.map((meta, index) => {
          const handId = meta.handId
          const holeCards = preflop.find(elem => elem.handId === handId).holeCards
          const cardA = holeCards.split(" ")[0]
          const cardB = holeCards.split(" ")[1]
          const prettyCardA = prettyHolecards(cardA)
          const prettyCardB = prettyHolecards(cardB)
          const matcher = /[A,K,Q,J,T]|[2-9]/g

          return (
            <li key={handId} id={handId} className="listButton" onClick={() => selectHand(handId)}>
              <p className="">#{index+1}</p>
              <p className="">{handId}</p>
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
  slideNavToggle: bool,
  setSlideNavToggle: func
}

export default HandList
