import React from "react"
import PropTypes from "prop-types"

import { FaCoins } from "react-icons/fa" 
import { IoIosTrophy } from "react-icons/io"

const PlayerPlacements = ({placement, heroPosition, heroName}) => {
    const { finishPosition, playerName, playerCountry, prizeMoney } = placement

    return (
        <div className="Player_Panel" style={{ boxShadow: prizeMoney > 0 ? `0 0 ${10 / finishPosition}px rgba(255, 200, 0, ${1 / finishPosition*5})` :  "0 0 5px rgba(0,0,0,.5)"}}>
            <span className="position">
                {finishPosition == 1 && prizeMoney > 0 && <IoIosTrophy color="orange" className="cash_trophy" />}
                {finishPosition == 2 && prizeMoney > 0 && <IoIosTrophy color="silver" className="cash_trophy" />}
                {finishPosition == 3 && prizeMoney > 0 && <IoIosTrophy color="brown" className="cash_trophy" />}
                <span style={{background: finishPosition < 4 && prizeMoney > 0 ? "none" : null}}>
                    {finishPosition}
                </span>
            </span>
            <span className="name" style={{ color: playerName == heroName ? "royalblue" : "#000"}}>{playerName}</span>
            <span className="country">{playerCountry}</span>
            <span className="prize_money">
                {prizeMoney > 0 && 
                <>
                    <FaCoins className="cash_icon" color="orange" /> 
                    {prizeMoney} USD
                </>
                }
                {!prizeMoney && heroPosition > finishPosition && "Not finished"}
                {!prizeMoney && heroPosition <= finishPosition && "Busted"}            
            </span>            
        </div>
    )
}

PlayerPlacements.propTypes = {
    placement: PropTypes.object.isRequired,
    heroPosition: PropTypes.number.isRequired,
    heroName: PropTypes.string.isRequired
}

export default PlayerPlacements
