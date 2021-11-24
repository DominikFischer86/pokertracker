import React from "react"
import PropTypes from "prop-types"

import { itmCalc } from "./helper"

const PlayerITMTab = ({filteredTournaments}) => {

    return (
        <div>
            <h3>ITM Distribution (SNG only)</h3>
            <p>{itmCalc(filteredTournaments)}</p>
        </div>
    )
}

PlayerITMTab.propTypes = {
    filteredTournaments: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
}

export default PlayerITMTab