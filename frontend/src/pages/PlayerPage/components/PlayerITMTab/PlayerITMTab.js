import React from "react"
import PropTypes from "prop-types"
import { ResponsiveBar } from "@nivo/bar"

import { sngBubbleCalc } from "../../../../helpers/sngBubbleCalc"
import { translateDays } from "../../../../helpers/monthCalc"
import { itmCalc } from "./helper"

import "../../PlayerPage.scss"

const PlayerITMTab = ({filteredTournaments}) => {
    const maxPlayers = 18
    const bubble = sngBubbleCalc(maxPlayers)
    const sngOnly = filteredTournaments.filter(tournament => {
        return tournament.playerAmount <= maxPlayers
    })
    const itmDistribution = itmCalc(sngOnly, maxPlayers, bubble)
    const itmKeys = itmDistribution.map(prop => prop.placement)
    
    const itmList = itmDistribution.slice(0, (bubble - 1))
    const finalTableList = itmDistribution.slice(bubble, 9)
    const totalItm = itmList.reduce((acc, currVal) => acc + currVal.finishedTotal, 0)
    const totalItmPercent = parseFloat((totalItm / sngOnly.length * 100).toFixed(2))
    const totalFinalTable = itmDistribution.slice(0, 8).reduce((acc, currVal) => acc + currVal.finishedTotal, 0)
    const totalFinalTablePercent = parseFloat((totalFinalTable / sngOnly.length * 100).toFixed(2))
    const totalEarlyFinish = itmDistribution.slice(8, maxPlayers).reduce((acc, currVal) => acc + currVal.finishedTotal, 0)
    const totalEarlyFinishPercent = parseFloat((totalEarlyFinish / sngOnly.length * 100).toFixed(2))

    return (
        <div className="row">
            <div className="col-lg-8">
                <h3>ITM Distribution ({sngOnly?.length}, SNG only)</h3>
                <div className="itm-Graph">
                    <ResponsiveBar
                        data={itmDistribution}
                        keys={itmKeys}
                        indexBy="placement"
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        padding={0.2}
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
            <div className="col-lg-4">
                <h3>Stats ({sngOnly?.length})</h3>
                <ul className="itmStats">
                    <li className="title">ITM Placements</li>
                    {itmList.map((item, index) => {
                        return (
                            <li key={index}>
                                <span className="position">Finished {translateDays(item.placement)}:</span> 
                                <span className="total">{item.finishedTotal || 0}x</span>
                                <span className="percent">({item.finishedPercent}%)</span>
                            </li>)
                    })}   
                    <li className="title">OOM Placements</li>                 
                    <li>
                        <span className="position">Bubbled {translateDays(itmDistribution[bubble-1].placement)}:</span> 
                        <span className="total">{itmDistribution[bubble-1].finishedTotal || 0}x</span>
                        <span className="percent">({itmDistribution[bubble-1].finishedPercent}%)</span>
                    </li>
                    {finalTableList.map((item, index) => {
                        return (
                            <li key={index}>
                                <span className="position">Finished {translateDays(item.placement)}:</span> 
                                <span className="total">{item.finishedTotal || 0}x</span>
                                <span className="percent">({item.finishedPercent}%)</span>
                            </li>)
                    })}  
                    <li className="title">Totals</li>
                    <li>
                        <span className="position">Total ITM:</span> 
                        <span className="total">{totalItm}x</span>
                        <span className="percent">({totalItmPercent}%)</span>
                    </li>
                    <li>
                        <span className="position">Total Final Table:</span> 
                        <span className="total">{totalFinalTable}x</span>
                        <span className="percent">({totalFinalTablePercent}%)</span>
                    </li>
                    <li>
                        <span className="position">Finished early:</span> 
                        <span className="total">{totalEarlyFinish}x</span>
                        <span className="percent">({totalEarlyFinishPercent}%)</span>
                    </li>
                </ul>
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