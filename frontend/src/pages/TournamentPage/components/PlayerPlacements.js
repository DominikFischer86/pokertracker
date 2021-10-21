import React from "react"
import PropTypes from "prop-types"

const PlayerPlacements = (placement) => {
    const { placement: { finishPosition, playerName, playerCountry, prizeMoney }} = placement

    return (
        <div className="Player_Panel" style={{ boxShadow: prizeMoney > 0 ? `0 0 5px rgba(50, ${255 / finishPosition}, 50)` :  "0 0 5px rgba(0,0,0,.5)"}}>
            <span className="position">{finishPosition}</span>
            <span className="name">{playerName}</span>
            <span className="country">{playerCountry}</span>
            <span className="prizeMoney">{prizeMoney}</span>            
        </div>
    )
}

PlayerPlacements.propTypes = {
    placement: PropTypes.object.isRequired
}

export default PlayerPlacements
