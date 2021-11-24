import React, { useState } from "react"
import PropTypes from "prop-types"
import { Switch } from "@react-md/form"

import { ResponsiveBar } from "@nivo/bar"
import { hourKeys, dayKeys, data } from "../graphConfig"


const PlayerPlaytimesTab = ({tournaments}) => {
    const [toggleDateResults, setToggleDateResults] = useState(false)

    return (
        <>
            <div className="PlayerPage__heading">
                <h3>{toggleDateResults ? "Played at these hours" : "Played on these days"}</h3>
                <Switch
                    id="date-switcher"
                    name="date-switcher"
                    label={!toggleDateResults ? "Show Start Times per day" : "Show Playing Times per week"}
                    onChange={() => setToggleDateResults(!toggleDateResults)}
                />
            </div>
            <div className="dayGraph">
                <ResponsiveBar
                    data={data(tournaments, toggleDateResults)}
                    keys={toggleDateResults ? hourKeys() : dayKeys}
                    indexBy="x"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'category10' }}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: toggleDateResults ? 'hour of day' : 'day of the week',
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
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    role="application"
                    ariaLabel="Time of day chart"
                    barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in day: "+e.indexValue}}
                />
            </div>
        </>
    )
}

PlayerPlaytimesTab.propTypes = {
    tournaments: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
}


export default PlayerPlaytimesTab