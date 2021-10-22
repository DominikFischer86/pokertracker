import React from "react"
import PropTypes from "prop-types"

import { FaCoins } from "react-icons/fa" 
import { IoIosTrophy } from "react-icons/io"

const PlayerPlacements = (placement) => {
    const heroName = "KeinKönich"
    const { placement: { finishPosition, playerName, playerCountry, prizeMoney }} = placement

    return (
        <div className="Player_Panel" style={{ boxShadow: prizeMoney > 0 ? `0 0 ${10 / finishPosition}px rgba(50, ${255 / finishPosition}, 50)` :  "0 0 5px rgba(0,0,0,.5)"}}>
            <span className="position">
                {finishPosition == 1 && <IoIosTrophy className="cash_trophy" />}
                <span style={{background: finishPosition == 1 ? "none" : null}}>
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
                {!prizeMoney && "Busted"}
            </span>            
        </div>
    )
}

PlayerPlacements.propTypes = {
    placement: PropTypes.object.isRequired
}

export default PlayerPlacements
