import React, { useState, useContext, useEffect } from "react"
import { object, array, number } from "prop-types"

import { Switch } from "@react-md/form"
import Slider from "rsuite/Slider"
import { FaStepBackward, FaStepForward } from "react-icons/fa"

import Spinner from "../../../components/Spinner/Spinner"
import { MetaContext } from "../../../index"

import Seat from "./Seat"
import Cards from "./Cards"
import { createStory, createReplayerStory, createInitialReplayerStoryState } from "../helper"
import Logo from "../../../images/logos/StarsTracker-logo-light-wide.svg"

import './styles/Slider.scss'
import "./styles/Replayer.scss"

const Replayer = ({tournament, activeHand, resetNavSlider}) => {
  const [toggleBlindUnits, setToggleBlindUnits] = useState(false)
  const [toggleNames, setToggleNames] = useState(false)
  const [sliderValue, setSliderValue] = useState(0)

  useEffect(() => {
    setSliderValue(0)
  }, [resetNavSlider])

  const maxPlayers =  tournament[0].playerAmount

  const { heroName } = useContext(MetaContext)
  if (Object.keys(activeHand).length < 1) return <Spinner message="Select a hand" />
  const { smallBlind, bigBlind, level, date, time, ante } = activeHand["1_meta"]
  const playerPositions = ["2_seat_1", "3_seat_2", "4_seat_3", "5_seat_4", "6_seat_5", "7_seat_6", "8_seat_7", "9_seat_8", "10_seat_9"]
  const activePlayers = playerPositions.filter(position => activeHand[position]).length

  const initialPot = smallBlind + bigBlind + ante * activePlayers
  let pot = initialPot
  const potInBb = parseFloat(pot / bigBlind).toFixed(1)

  const story = createStory(activeHand)

  const replayerStory = createReplayerStory(activeHand, story, heroName)
  const initialStoryState = createInitialReplayerStoryState(activeHand)

  const holeCards = replayerStory.find(chapter => chapter).holeCards
  const board = replayerStory.filter(chapter => chapter.board)

  const sliderMax = story.length - 1

  let flopIndex = story.indexOf(story.find(item => item["flop"]))
  if (flopIndex < 0) flopIndex = null

  let turnIndex = story.indexOf(story.find(item => item["turn"]))
  if (turnIndex < 0) turnIndex = null

  let riverIndex = story.indexOf(story.find(item => item["river"]))
  if (riverIndex < 0) riverIndex = null

  let summaryIndex = story.indexOf(story.find(item => item["summary"]))
  if (summaryIndex < 0) summaryIndex = parseFloat(sliderMax-1)

  let boardCards = ""
  if (sliderValue < flopIndex) boardCards = ""
  if (sliderValue >= parseFloat(flopIndex) && board.length > 1) boardCards = board[0].board.split(" ")
  if (sliderValue >= parseFloat(turnIndex) && board.length > 1) boardCards = board[1].board.split(" ")
  if (sliderValue >= parseFloat(riverIndex) && board.length > 2) boardCards = board[2].board.split(" ")
  if (sliderValue >= parseFloat(summaryIndex) && board.length > 3) boardCards = board[3].board.split(" ")

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
          <p className="appTitle"><img src={Logo} width="200px" /></p>
            {initialStoryState.map(state => {
              const stateObject = Object.values(state)[0]
              const seat = Object.keys(state).toString()
              let playerAction = stateObject.playerAction
              let playerBet = stateObject.playerBet
              let playerHand = ", ."
              let playerSmallBlind = stateObject.playerSmallBlind
              let playerBigBlind = stateObject.playerBigBlind

              if (replayerStory[sliderValue]?.playerSeat === seat){
                playerBet = replayerStory[sliderValue].playerBet
                playerAction = replayerStory[sliderValue].playerAction
                playerSmallBlind = replayerStory[sliderValue].playerSmallBlind
                playerBigBlind = replayerStory[sliderValue].playerBigBlind
                playerHand = replayerStory[sliderValue].playerHand
              }

              const seatedPlayer = {
                playerOutOfHand: stateObject.playerOutOfHand, 
                playerSitOut: stateObject.playerSitOut,
                playerPosition: stateObject.playerPosition, 
                playerSeat: seat, 
                playerName: stateObject.playerName, 
                playerStack: stateObject.playerStack,
                playerState: stateObject.playerState,
                playerSmallBlind,
                playerBigBlind
              }

              return (
                  <Seat 
                    key={seat} 
                    seat={seat}
                    seatedPlayer={seatedPlayer}
                    toggleBlindUnits={toggleBlindUnits}
                    toggleNames={toggleNames}
                    heroName={heroName}
                    bigBlind={bigBlind}
                    initialPot={initialPot}
                    activePlayers={activePlayers}
                    maxPlayers={maxPlayers}
                    playerAction={playerAction}
                    playerHand={seatedPlayer.playerName === heroName ? holeCards : ", ."}
                    bet={playerBet}
                  />
              )
            })}
            {boardCards.length > 0 &&
               <p className="board">
               {boardCards.map((card, index) => <Cards key={index} card={card} />
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
  activeHand: object,
  resetNavSlider: number
}

export default Replayer
