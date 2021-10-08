import React, { useState } from "react"
import PropTypes from "prop-types"
import { ResponsiveLine } from '@nivo/line'
import { Switch } from "@react-md/form"

import { data } from "./graphConfig"

const ResultsGraph = ({tournaments, isLoading}) => {
    const [toggleRake, setToggleRake] = useState(false)
    const tournamentAmount = tournaments.length

    const tickValues = () => {               
        let myArray = []
        let factor
        if (tournamentAmount < 10000) factor = 1000;
        if (tournamentAmount < 1000) factor = 100;
        if (tournamentAmount < 500) factor = 10;
        if (tournamentAmount < 10) factor = 1;
        
        for (let i = 0; i < tournamentAmount/factor ;i++){
            myArray.push(i*factor)
        }
        return myArray.splice(1)
    }

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {!isLoading &&
            <>
                <div className="overViewTable"><OverviewTable tournaments={tournaments}/></div>
                <div className="graphWrapper">
                  <ResponsiveLine
                    data={data(tournaments, toggleRake)}
                    colors={d => d.color}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    type="linear"
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        format: "",
                        tickSize: 5,
                        tickPadding: 10,
                        tickRotation: 0,
                        tickValues: tickValues(),
                        legend: 'Tournaments Amount',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Winnings in $',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    enablePoints={false}
                    enableArea={true}
                    enableGridX={false}
                    isInteractive={true}
                    useMesh={true}          
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    />
                </div>
                <Switch 
                    id="rake-switcher" 
                    name="rake-switcher" 
                    label={!toggleRake ? "Show Rake" : "Hide Rake"}
                    onChange={() => setToggleRake(!toggleRake)} 
                />
            </>
            }        
        </div>        
    )
}

ResultsGraph.propTypes = {
    tournaments: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    isLoading: PropTypes.bool
}

const OverviewTable = ({tournaments}) => {
    const count = tournaments.length
    let buyIn
    let rake
    let winnings = 0

    Object.values(tournaments).forEach((element, index) => {
        buyIn = parseFloat(element.buyIn * (index+1) + buyIn).toFixed(2)
        rake = parseFloat(element.rake * (index+1) + rake).toFixed(2)
        winnings = parseFloat((element.playerPrizeMoney + winnings).toFixed(2))
    })

    const totalBuyIn = parseFloat(buyIn) + parseFloat(rake)
    const profit = parseFloat(winnings - totalBuyIn).toFixed(2)
    const averageProfit = parseFloat(profit / count).toFixed(2)
    const roi = parseFloat(profit / totalBuyIn * 100).toFixed(2)
    const averageStake = parseFloat(totalBuyIn/count).toFixed(2)

    return (
        <div className="resultsTable">
            <table >
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>Average profit</th>
                            <th>Average Stake</th>
                            <th>Average ROI</th>
                            <th>Total Buy-In</th>
                            <th>Total Rake</th>
                            <th>Total Profit</th>                           
                        </tr>
                    </thead>
                <tbody>
                    <tr>
                        <td>{count}</td>
                        <td>{averageProfit}$</td>
                        <td>{averageStake}$</td>
                        <td>{roi}%</td>
                        <td>{buyIn}$</td>
                        <td>{rake}$</td>
                        <td>{profit}$</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

OverviewTable.propTypes = {
    tournaments: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
}

export default ResultsGraph