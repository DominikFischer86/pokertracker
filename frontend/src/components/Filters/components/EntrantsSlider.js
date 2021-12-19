import React, { useState } from "react"
import PropTypes from "prop-types"

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { entrantsScaleValues, entrantsMarks } from "./filterConfig"


export const EntrantsSlider = ({width, onEntrantsSliderSubmit, activeFilters}) => {
    const [entrantsValue, setEntrantsValue] = useState([15, 25])
    const handleEntrantsChange = (event, newValue) => setEntrantsValue(newValue)
    const valueText = () => `${entrantsScaleValues(entrantsValue)[0]} - ${entrantsScaleValues(entrantsValue)[1]}`

    return (
        <div className="slider_box">
            <p>Entrants</p>
            <Box sx={{ width: !width ? 300 : width }}>
                <Slider
                    value={entrantsValue}
                    min={0}
                    max={55}
                    step={5}
                    marks={entrantsMarks}
                    scale={entrantsScaleValues}
                    onChange={handleEntrantsChange}
                    aria-labelledby="non-linear-slider"
                    valueLabelDisplay="auto"
                    getAriaLabel={() => 'Entrants range'}
                    valueLabelFormat={valueText}
                />
            </Box>
            <button 
                style={
                    activeFilters.includes("entrants-slider") 
                    ? { backgroundColor: "lime" } 
                    : null
                } 
                onClick={() => onEntrantsSliderSubmit(
                    [entrantsScaleValues(entrantsValue), "entrants-slider"]
                )}>
                    Filter Entrants
            </button>
        </div>
    )
}

EntrantsSlider.propTypes = {
    onEntrantsSliderSubmit: PropTypes.func,
    activeFilters: PropTypes.array,
    width: PropTypes.number
}