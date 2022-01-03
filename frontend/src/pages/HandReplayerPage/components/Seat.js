import React from "react"
import { object, string, bool, number } from "prop-types"

import Stack from "./Stack"

import "./styles/Seat.scss"

const Seat = ({seat, seatedPlayer, toggleBlindUnits, toggleNames, heroName, bigBlind, initialPot, activePlayers}) => {
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
    const playerSmallBlind = seatedPlayer?.playerSmallBlind
    const playerBigBlind = seatedPlayer?.playerBigBlind
    const playerAnte = seatedPlayer?.playerAnte
    const positionClass = (playerPosition.replace("+", "")).toLowerCase()
    const stackInBB = parseFloat(playerStack / bigBlind).toFixed(0)
    const newName = playerName === heroName ? "Hero" : "Villain " + seat.split("_")[1]
    const Mfactor = parseFloat(playerStack / initialPot).toFixed(2)
    const effectiveM = (Mfactor * (activePlayers / 8)).toFixed(2)

    let bet = 50000
    
    if (playerSmallBlind > 0) bet = playerSmallBlind
    if (playerBigBlind > 0) bet = playerBigBlind

    let betInBb = parseFloat(bet / bigBlind).toFixed(0)

    const buildStackArray = betAmountInBB => {        
        let outerArray = []
        const betAmountInBBArray = betAmountInBB.toString().replace(/0/g, "1").split("").reverse()
        betAmountInBBArray.forEach(item => item.replace("0", "1"))
        console.log(betAmountInBBArray)
        betAmountInBBArray.forEach(item => {
            let innerArray = []
            for (let i = 1; i <= parseFloat(item); i++){
                innerArray.push(i)
            }
            outerArray.push(innerArray)
        })
        return outerArray
    }

    // console.log(buildStackArray(betInBb))
    const playerAction = null

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
                <p className="playerStack">{toggleBlindUnits ? `${stackInBB} | M: ${Mfactor}` : playerStack}</p>
            }
            {bet > 0 &&
                <div className="bet">
                    {buildStackArray(betInBb).map((item, index) => 
                        <div className="stackWrapper" key={index}  style={{ left: index * -28 + "px" }} >
                            <Stack                                 
                                chips={item}
                                stackAmount={index+1}
                            />
                        </div>)
                    }            
                    <p>{!toggleBlindUnits ? bet: betInBb}</p>
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
    activePlayers: number
}

export default Seat
