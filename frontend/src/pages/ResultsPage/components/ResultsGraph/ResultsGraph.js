import React, { useState } from "react"
import { object, array, oneOfType, bool } from "prop-types"
import { Switch } from "@react-md/form"

import { OverviewTable } from "./OverviewTable"
import { BuyInSlider } from "./filters/BuyInSlider"
import { EntrantsSlider } from "./filters/EntrantsSlider"
import { ResponsiveLineContainer } from "./config"
import { DateRangePicker } from "./filters/DateRangePicker"

import Spinner from "../../../../components/Spinner/Spinner"

import "./styles.scss"

const ResultsGraph = ({tournaments, rakebackData, isLoading}) => {
    const [toggleRake, setToggleRake] = useState(false)
    const [toggleRakeback, setToggleRakeback] = useState(false)
    const [toggleBounties, setToggleBounties] = useState(false)
    const [toggleFilter, setToggleFilter] = useState(false)
    const [filteredTournaments, setFilteredTournaments] = useState(tournaments)
    const [activeFilters, setActiveFilters] = useState([])

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
            {isLoading && <Spinner />}
            {!isLoading &&
            <>
                <div className="overViewTable">
                    <OverviewTable 
                        filteredTournaments={filteredTournaments} 
                        rakebackData={rakebackData} 
                    />
                </div>
                <div className="graph_wrapper">
                    <ResponsiveLineContainer 
                        filteredTournaments={filteredTournaments}
                        rakebackData={rakebackData} 
                        toggleRake={toggleRake}
                        toggleBounties={toggleBounties}
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
                        id="rakeback-switcher" 
                        name="rakeback-switcher" 
                        label={!toggleRakeback ? "Show Rakeback" : "Hide Rakeback"}
                        onChange={() => setToggleRakeback(!toggleRakeback)} 
                    />
                    <Switch 
                        id="bounty-switcher" 
                        name="bounty-switcher" 
                        label={!toggleBounties ? "Show Bounties" : "Hide Bounties"}
                        onChange={() => setToggleBounties(!toggleBounties)} 
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
            </>   
            }    
        </div>
    )
}

ResultsGraph.propTypes = {
    rakebackData: array,
    tournaments: oneOfType([object,array]),
    isLoading: bool
}

export default ResultsGraph