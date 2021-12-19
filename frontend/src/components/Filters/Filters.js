import React, { useState } from "react"
import { object, array, oneOfType, func } from "prop-types"

import { BuyInSlider } from "./components/BuyInSlider"
import { EntrantsSlider } from "./components/EntrantsSlider"
import { DateRangePicker } from "./components/DateRangePicker"

export const Filters = ({allTournaments, filteredTournaments, setFilteredTournaments}) => {
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
                filterResult = allTournaments
                setActiveFilters([])
                break
            default:
                filterResult = allTournaments
        }
        
        setFilteredTournaments(filterResult)
    }


    return (
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
    )
}

Filters.propTypes = {
    allTournaments: oneOfType([object,array]),
    filteredTournaments: oneOfType([object,array]),
    setFilteredTournaments: func
}