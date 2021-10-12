import React, { useState } from "react"
import PropTypes from "prop-types"
import { Switch } from "@react-md/form"

import { OverviewTable } from "./OverviewTable"
import { BuyInSlider } from "./filters/BuyInSlider"
import { EntrantsSlider } from "./filters/EntrantsSlider"
import { ResponsiveLineContainer } from "./config"
import { DateRangePicker } from "./filters/DateRangePicker"

import "./styles.scss"

const ResultsGraph = ({tournaments, isLoading}) => {
    const [toggleRake, setToggleRake] = useState(false)
    const [toggleFilter, setToggleFilter] = useState(false)
    const [filteredTournaments, setFilteredTournaments] = useState(tournaments)
    const [activeFilters, setActiveFilters] = useState([])

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
            case "entrants-slider":
                filterResult = filteredTournaments.filter(element => {
                    return element.playerAmount >= values[0] && element.playerAmount <= values[1]
                })      
                if (filterResult.length < 1) return alert("No tournaments left. Use less restrictive filters.")
                hasSameElements = activeFilters.some(element => element === type)
                if (hasSameElements) return
                activeFilters.push(type)
                setActiveFilters(activeFilters)
                break
            case "date_range_picker":
                filterResult = filteredTournaments.filter(element => {
                    return element.timeStamp >= values[0] && element.timeStamp <= values[1]
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
    return (
        <div className="pb-4">
            {isLoading && <p>Loading...</p>}
            {!isLoading &&
            <>
                <div className="overViewTable">
                    <OverviewTable filteredTournaments={filteredTournaments}/>
                </div>
                <div className="graphWrapper">
                   <ResponsiveLineContainer 
                        filteredTournaments={filteredTournaments} 
                        toggleRake={toggleRake}
                        tournamentAmount={tournamentAmount}
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
                    <div className="row">
                        <div className="col-lg-10">                             
                            <BuyInSlider width={600} activeFilters={activeFilters} onBuyInSliderSubmit={filterTournaments} />
                            <hr />
                            <EntrantsSlider width={600} activeFilters={activeFilters} onEntrantsSliderSubmit={filterTournaments} />
                            <hr />
                            <DateRangePicker activeFilters={activeFilters} onDateRangePickerSubmit={filterTournaments}/>
                        </div>
                        <div className="col-lg-2 reset_button_container">
                            <span>
                                <button className="reset_button" onClick={() => filterTournaments([[], "reset"])}>
                                    Remove Filter
                                </button>
                            </span>
                        </div>
                    </div>
                </div>                       
            </>//Filter: playerAmount (range), date range
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

export default ResultsGraph