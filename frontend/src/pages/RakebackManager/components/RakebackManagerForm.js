import React, { useState } from "react"
import { func } from "prop-types"

import DatePicker from "react-datepicker"
import { Form, TextField, Select } from "@react-md/form"
import { FaCheck } from "react-icons/fa"
import { Button } from "react-md"

import "../RakebackManager.scss"

const RakebackManagerForm = ({ onSubmit }) => {
    const [timestamp, setTimestamp] = useState(new Date())
    const [rakebackType, setRakebackType] = useState("")
    const [value, setValue] = useState("")

    const isValid = rakebackType !== null && value !== null

    const options = ["Cash Reward", "Ticket", "Shop Item"]

    const handleSelect = e => {
        setRakebackType(e)
    }

    const handleValueInput = e => {
        setValue(e.target.value)
    }

    const handleSubmit = () => {
        onSubmit(value, rakebackType, timestamp)
        setRakebackType("")
        setValue("")
    }

    return (
        <div className="rakeback-form-container">
            <Form>
                <DatePicker 
                    selected={timestamp}
                    onChange={date => setTimestamp(date)}
                    startDate={timestamp}
                    className="rakeback-datepicker"
                />
                <Select
                    id="rakeback-type"
                    options={options}
                    label="Rakeback Type"
                    onChange={handleSelect}
                    className="rakeback-type"
                    value={rakebackType}
                />
                <TextField 
                    id="value"
                    name="value"
                    onChange={handleValueInput}
                    label="Dollar Value"
                    className="rakeback-value"
                    value={value}
                />
            </Form>
            <Button 
                theme="primary" 
                buttonType="icon" 
                aria-label="Submit"
                disabled={!isValid}
                onClick={handleSubmit}
            >
                <FaCheck />
            </Button>
        </div>
    )
}

RakebackManagerForm.propTypes = {
    onSubmit: func
}

export default RakebackManagerForm