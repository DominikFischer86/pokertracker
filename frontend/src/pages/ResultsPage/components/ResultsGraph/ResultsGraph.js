import React, { useState } from "react"
import { object, array, oneOfType, bool } from "prop-types"
import { Switch } from "@react-md/form"

import { OverviewTable } from "./OverviewTable"
import { ResponsiveLineContainer } from "./config"
import { Filters } from "../../../../components/Filters/Filters"

import Spinner from "../../../../components/Spinner/Spinner"

import "./styles.scss"

const ResultsGraph = ({tournaments, rakebackData, isLoading}) => {
    const [toggleRakeback, setToggleRakeback] = useState(false)
    const [toggleBounties, setToggleBounties] = useState(false)
    const [toggleFilter, setToggleFilter] = useState(false)
    const [filteredTournaments, setFilteredTournaments] = useState(tournaments)
  
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
                        toggleBounties={toggleBounties}
                        toggleRakeback={toggleRakeback}
                    />
                </div>
                <div className="switch_list">
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
                   <Filters 
                    allTournaments={tournaments} 
                    filteredTournaments={filteredTournaments} 
                    setFilteredTournaments={setFilteredTournaments} />
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