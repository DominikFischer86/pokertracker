import React from "react"
import PropTypes from "prop-types"
import { ResponsiveBar } from "@nivo/bar"

import { itmCalc } from "./helper"

const PlayerITMTab = ({filteredTournaments}) => {
    const maxPlayers = 18
    const itmDistribution = itmCalc(filteredTournaments, maxPlayers)
    const itmKeys = itmDistribution.map(prop => prop.placement)
    const sngOnly = filteredTournaments.filter(tournament => {
        return tournament.playerAmount <= maxPlayers
    })

    return (
        <div>
            <h3>ITM Distribution ({sngOnly?.length} SNG only)</h3>
            <div className="itm-Graph">
                <ResponsiveBar
                    data={itmDistribution}
                    keys={itmKeys}
                    indexBy="placement"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.5}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'category10' }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'placements',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'tournaments',
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    labelTextColor={{ from: 'color', modifiers: [ [ 'brighter', 3 ] ] }}
                    role="application"
                    ariaLabel="ITM Chart"
                    barAriaLabel={function(e){return e.id+": "+e.formattedValue+" on position: "+e.indexValue}}
                />
            </div>
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