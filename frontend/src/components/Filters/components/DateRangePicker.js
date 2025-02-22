import React, { useState } from "react"
import PropTypes from "prop-types"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

export const DateRangePicker = ({ onDateRangePickerSubmit, activeFilters }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div className="slider_box">
            <div className="date_picker_wrapper">
                <p>Start Date: </p>
                <DatePicker 
                    selectsStart 
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)}
                    startDate={startDate}
                    endDate={endDate}
                />
                <p>End Date: </p>
                <DatePicker 
                    selectsEnd 
                    selected={endDate} 
                    onChange={(date) => setEndDate(date)}
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                />
                </div>
             <button 
                style={
                    activeFilters.includes("date_range_picker") 
                    ? { backgroundColor: "lime" } 
                    : null
                } 
                onClick={() => onDateRangePickerSubmit(
                    [[startDate.toISOString(), endDate.toISOString()], "date_range_picker"]
                )}>
                    Filter by Date
            </button>
        </div>
    )
}

DateRangePicker.propTypes = {
    onDateRangePickerSubmit: PropTypes.func,
    activeFilters: PropTypes.array
}