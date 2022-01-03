import React from "react"
import { object, string, bool, number } from "prop-types"

import Stack from "./Stack"

import "./styles/Seat.scss"

const Seat = ({seat, seatedPlayer, toggleBlindUnits, toggleNames, heroName, bigBlind, initialPot, activePlayers, maxPlayers, bet, playerAction}) => {
    if (!seatedPlayer) {
        return (
            <div className={`seat seat_empty ${seat}`}>
                <p className="playerPosition"></p>       
                <p className="playerName">{seat.replace("_", " ").toUpperCase()}</p>
                <p className="playerStack">-</p>
            </div>
        )
    }
    const { playerOutOfHand, playerSitOut, playerPosition, playerSeat, playerName, playerStack } = seatedPlayer
    const smallBlind = bigBlind / 2
    const playerSmallBlind = seatedPlayer?.playerSmallBlind
    const playerBigBlind = seatedPlayer?.playerBigBlind
    const positionClass = (playerPosition.replace("+", "")).toLowerCase()
    const stackInBB = parseFloat(playerStack / bigBlind).toFixed(0)
    const newName = playerName === heroName ? "Hero" : "Villain " + seat.split("_")[1]
    const Mfactor = parseFloat(playerStack / initialPot).toFixed(2)
    const effectiveM = (Mfactor * (activePlayers / maxPlayers)).toFixed(2)
    
    if (playerSmallBlind > 0) bet = playerSmallBlind
    if (playerBigBlind > 0) bet = playerBigBlind

    // Use smallblind here to have 1 chip be worth a half bb for stack builds
    let betInBb = parseFloat(bet / smallBlind).toFixed(1)

    const buildStackArray = betAmountInBB => {       
        const roundedBetAmountInBB = Math.floor(betAmountInBB) 
        let outerArray = []
        const betAmountInBBArray = roundedBetAmountInBB.toString().replace(/0/g, "1").split("").reverse()
        betAmountInBBArray.forEach(item => item.replace("0", "1"))
        betAmountInBBArray.forEach(item => {
            let innerArray = []
            for (let i = 1; i <= parseFloat(item); i++){
                innerArray.push(i)
            }
            outerArray.push(innerArray)
        })
        return outerArray
    }

    return (
        <div className={`seat ${playerSeat} ${positionClass}`}>
            <p className="playerPosition">{playerPosition}</p>       
            <p className="playerName">{toggleNames ? newName : playerName}</p>
            {playerOutOfHand && 
                <p className="playerStack">Out of hand</p>
            }
            {playerSitOut && 
                <p className="playerStack">Sitting out</p>
            }
            {playerAction &&
                <p className="playerStack">{playerAction}</p>
            }
            {!playerOutOfHand && !playerSitOut && !playerAction && 
                <p title={`M = ${Mfactor} | effM = ${effectiveM}`} className="playerStack">{toggleBlindUnits ? `${stackInBB} BB` : playerStack}</p>
            }
            {bet > 0 &&
                <div className={`bet stacks-${Math.floor(betInBb).toString().length}`}>
                    {buildStackArray(betInBb).map((item, index) => 
                        <div className="stackWrapper" key={index}  style={{ left: index * -28 + "px" }} >
                            <Stack                                 
                                chips={item}
                                stackAmount={index+1}
                            />
                        </div>)
                    }
                    <p>{
                        // double halfed betInBb (which is in SB now) to have correct number values again 
                        !toggleBlindUnits ? bet: (betInBb / 2).toFixed(1)}
                    </p>
                </div>
            }
        </div>
    )
}

Seat.propTypes = {
    seat: string,
    seatedPlayer: object,
    toggleBlindUnits: bool,
    toggleNames: bool,
    heroName: string,
    bigBlind: number,
    initialPot: number,
    activePlayers: number,
    maxPlayers: number,
    bet: number,
    playerAction: string
}

export default Seat
