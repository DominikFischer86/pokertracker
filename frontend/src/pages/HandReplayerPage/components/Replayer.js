import React, { useState, useContext } from "react"
import { object, array } from "prop-types"

import { Switch } from "@react-md/form"
import Slider from "rsuite/Slider"
import { FaStepBackward, FaStepForward } from "react-icons/fa"

import Spinner from "../../../components/Spinner/Spinner"
import { MetaContext } from "../../../index"

import Seat from "./Seat"
import Cards from "./Cards"
import { createStory, createReplayerStory } from "../helper"

import './styles/Slider.scss'
import "./styles/Replayer.scss"

const Replayer = ({tournament, activeHand}) => {
  const [toggleBlindUnits, setToggleBlindUnits] = useState(false)
  const [toggleNames, setToggleNames] = useState(false)
  const [sliderValue, setSliderValue] = useState(0)

  const maxPlayers =  tournament[0].playerAmount

  const { heroName, appName } = useContext(MetaContext)
  if (Object.keys(activeHand).length < 1) return <Spinner message="Select a hand" />
  const { smallBlind, bigBlind, level, date, time, ante } = activeHand["1_meta"]
  const playerPositions = ["2_seat_1", "3_seat_2", "4_seat_3", "5_seat_4", "6_seat_5", "7_seat_6", "8_seat_7", "9_seat_8", "10_seat_9"]
  const activePlayers = playerPositions.filter(position => activeHand[position]).length

  const initialPot = smallBlind + bigBlind + ante * activePlayers
  let pot = initialPot
  const potInBb = parseFloat(pot / bigBlind).toFixed(1)

  const story = createStory(activeHand)

  const replayerStory = createReplayerStory(activeHand, story, heroName)

  // console.log(replayerStory)

  const board = null

  const sliderMax = story.length - 1

  let flopIndex = story.indexOf(story.find(item => item["flop"]))
  if (flopIndex < 0) flopIndex = null

  let turnIndex = story.indexOf(story.find(item => item["turn"]))
  if (turnIndex < 0) turnIndex = null

  let riverIndex = story.indexOf(story.find(item => item["river"]))
  if (riverIndex < 0) riverIndex = null

  let summaryIndex = story.indexOf(story.find(item => item["summary"]))
  if (summaryIndex < 0) summaryIndex = parseFloat(sliderMax-1)

  document.querySelector(".prev")?.classList.remove("disabled")
  document.querySelector(".next")?.classList.remove("disabled")

  if (sliderValue < 0) document.querySelector(".prev").classList.add("disabled")
  if (sliderValue > sliderMax) document.querySelector(".next").classList.add("disabled")

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
              <div className="replaySlider">
                <span className="prev"><FaStepBackward onClick={() => setSliderValue(sliderValue-1)} /></span>
                <span>
                <Slider 
                  defaultValue={sliderValue}
                  value={sliderValue}
                  min={0} 
                  step={1} 
                  max={sliderMax} 
                  graduated 
                  progress
                  onChange={value => {
                    setSliderValue(value);
                  }}
                  renderMark={mark => {
                    if ([0, flopIndex, turnIndex, riverIndex, summaryIndex].includes(mark)) {
                      if (mark === 0) return <span title="Preflop">PF</span>
                      if (mark === flopIndex) return <span title="Flop">F</span>
                      if (mark === turnIndex) return <span title="Turn">T</span>
                      if (mark === riverIndex) return <span title="River">R</span>
                      if (mark === summaryIndex) return <span title="Summary">Sum</span>
                    }
                    return null;
                  }}
                />
                </span>
                <span className="next"><FaStepForward onClick={() => setSliderValue(sliderValue+1)} /></span>
              </div>              
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
                    playerHand={". ,"}
                    bet={0}
                  />
              )
            })}
            {board &&
               <p className="board">
               {board.map((card, index) => <Cards key={index} card={card} />
               )}
             </p>
            }
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
