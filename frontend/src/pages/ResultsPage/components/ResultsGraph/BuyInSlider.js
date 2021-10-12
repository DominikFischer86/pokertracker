import React, { useState } from "react"
import PropTypes from "prop-types"

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { scaleValues } from "./helpers"
import { buyInMarks } from "./config"


export const BuyInSlider = ({onBuyInSliderSubmit, activeFilters}) => {
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