import React, { useState } from "react"
import PropTypes from "prop-types"

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { buyInScaleValues, buyInMarks } from "./filterConfig"


export const BuyInSlider = ({width, onBuyInSliderSubmit, activeFilters}) => {
    const [buyInValue, setBuyInValue] = useState([0, 5])
    const handleBuyInChange = (event, newValue) => setBuyInValue(newValue)
    const valueText = () => `$${buyInScaleValues(buyInValue)[0]} - $${buyInScaleValues(buyInValue)[1]}`

    return (
        <div className="slider_box">
            <p>Buy-In</p>
            <Box sx={{ width: !width ? 300 : width }}>
                <Slider
                    value={buyInValue}
                    min={0}
                    max={40}
                    step={1}
                    marks={buyInMarks}
                    scale={buyInScaleValues}
                    onChange={handleBuyInChange}
                    aria-labelledby="non-linear-slider"
                    valueLabelDisplay="auto"
                    getAriaLabel={() => 'BuyIn range'}
                    valueLabelFormat={valueText}
                />
            </Box>
            <button 
                style={
                    activeFilters.includes("buy-in-slider") 
                    ? { backgroundColor: "lime" } 
                    : null
                    }
                    onClick={() => onBuyInSliderSubmit(
                        [buyInScaleValues(buyInValue), "buy-in-slider"]
                    )}>
                        Filter Buy-Ins
            </button>
        </div>
    )
}

BuyInSlider.propTypes = {
    onBuyInSliderSubmit: PropTypes.func,
    activeFilters: PropTypes.array,
    width: PropTypes.number
}