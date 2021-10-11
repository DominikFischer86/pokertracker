import React, { useState } from "react"
import PropTypes from "prop-types"
import { ResponsiveLine } from '@nivo/line'
import { Switch } from "@react-md/form"
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { data } from "./graphConfig"
import {buyInMarks, scaleValues } from "./helpers"

const ResultsGraph = ({tournaments, isLoading}) => {
    const [toggleRake, setToggleRake] = useState(false)
    const [toggleFilter, setToggleFilter] = useState(false)
    const [filteredTournaments, setFilteredTournaments] = useState(tournaments)
    const [activeFilters, setActiveFilters] = useState([])
    // const [formInput, setFormInput] = useState([])
    const tournamentAmount = tournaments?.length

    const filterTournaments = filterType => {
        let filterResult
        let hasSameElements
        const values = filterType[0]
        const type = filterType[1]
        
        switch(type){
            case "buy-in-slider":
                filterResult = filteredTournaments.filter(element => {
                    return element.buyIn >= values[0] && element.buyIn <= values[1]
                })
      
                if (filterResult.length < 1) return alert("No tournaments left. Use less restrictive filters.")
                hasSameElements = activeFilters.some(element => element === type)
                if (hasSameElements) return
                activeFilters.push(type)
                setActiveFilters(activeFilters)
                break
            case "reset":
                filterResult = tournaments
                setActiveFilters([])
                break
            default:
                filterResult = tournaments
        }
        
        setFilteredTournaments(filterResult)
    }

    if (!tournaments) isLoading = true

    const tickValues = () => {               
        let myArray = []
        let factor
        if (tournamentAmount < 10000) factor = 1000;
        if (tournamentAmount < 1000) factor = 100;
        if (tournamentAmount < 500) factor = 20;
        if (tournamentAmount < 250) factor = 5;
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
                <div className="overViewTable"><OverviewTable filteredTournaments={filteredTournaments}/></div>
                <div className="graphWrapper">
                  <ResponsiveLine
                    data={data(filteredTournaments, toggleRake)}
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
                        legendOffset: 40,
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
                <div className="switch_list">
                    <Switch 
                        id="rake-switcher" 
                        name="rake-switcher" 
                        label={!toggleRake ? "Show Rake" : "Hide Rake"}
                        onChange={() => setToggleRake(!toggleRake)} 
                    />
                    <Switch 
                        id="filter-switcher" 
                        name="filter-switcher" 
                        label={!toggleFilter ? "Show Filter" : "Hide Filter"}
                        onChange={() => setToggleFilter(!toggleFilter)} 
                    />
                </div>
                <hr />
                <div style={toggleFilter ? {opacity: "100"}: {opacity: "0", pointerEvents: "none"}} className="filter_list">
                    <span>
                        <p>Filter: </p>
                        <BuyInSlider activeFilters={activeFilters} onBuyInSliderSubmit={filterTournaments} />
                    </span>
                    <button className="reset_button" onClick={() => filterTournaments([[], "reset"])}>Remove Filter</button>
                </div>                       
            </>//Filter: playerAmount (range), date range, buyIn (range), reset
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

const OverviewTable = ({filteredTournaments}) => {
    const count = filteredTournaments.length
    let buyIn = 0
    let rake = 0
    let winnings = 0
    let bounties = 0

    Object.values(filteredTournaments).forEach((element) => {
        buyIn = parseFloat((element.buyIn + buyIn).toFixed(2))
        rake = parseFloat((element.rake + rake).toFixed(2))
        winnings = parseFloat((element.playerPrizeMoney + winnings).toFixed(2))
        bounties = parseFloat((element.bounties + bounties).toFixed(2))
    })

    const totalBuyIn = (parseFloat(buyIn) + parseFloat(rake)).toFixed(2)
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
                        <th>Average Stake (+Rake)</th>
                        <th>Average ROI</th>
                        <th>Total Buy-In</th>
                        <th>Total Rake</th>
                        <th>Total Profit</th>
                        <th>Total Bounties</th>                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{count}</td>
                        <td>{averageProfit}$</td>
                        <td>{averageStake}$</td>
                        <td>{roi}%</td>
                        <td>{totalBuyIn}$</td>
                        <td>{rake}$</td>
                        <td>{profit}$</td>
                        <td>{bounties}$</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

OverviewTable.propTypes = {
    filteredTournaments: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
}

const BuyInSlider = ({onBuyInSliderSubmit, activeFilters}) => {
    const [buyInValue, setBuyInValue] = useState([0, 5])
    const handleBuyInChange = (event, newValue) => setBuyInValue(newValue)
    const valueText = () => `$${scaleValues(buyInValue)[0]} - $${scaleValues(buyInValue)[1]}`

    return (
        <div className="slider_box">
            <Box sx={{ width: 400 }}>
                <Slider
                    value={buyInValue}
                    min={0}
                    max={40}
                    step={1}
                    marks={buyInMarks}
                    scale={scaleValues}
                    onChange={handleBuyInChange}
                    aria-labelledby="non-linear-slider"
                    valueLabelDisplay="auto"
                    getAriaLabel={() => 'BuyIn range'}
                    valueLabelFormat={valueText}
                />
            </Box>
            <button style={activeFilters.includes("buy-in-slider") ? { backgroundColor: "lime" } : null} onClick={() => onBuyInSliderSubmit([scaleValues(buyInValue), "buy-in-slider"])}>Filter Buy-Ins</button>
        </div>
    )
}

BuyInSlider.propTypes = {
    onBuyInSliderSubmit: PropTypes.func,
    activeFilters: PropTypes.array
}

export default ResultsGraph