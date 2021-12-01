import React, { useState } from "react"
import { func } from "prop-types"

import DatePicker from "react-datepicker"
import { Form, TextField, Select } from "@react-md/form"
import { FaCheck } from "react-icons/fa"
import { Button } from "react-md"

import "../RakebackManager.scss"

const RakebackManagerForm = ({ handleSubmit }) => {
    const [timestamp, setTimestamp] = useState(new Date())
    const [rakebackType, setRakebackType] = useState(null)
    const [value, setValue] = useState(null)

    const isValid = rakebackType !== null && value !== null

    const options = ["Cash Reward", "Ticket", "Shop Item"]

    return (
        <div className="rakeback-form-container">
            <Form>
                <DatePicker 
                    selected={timestamp} 
                    onChange={(date) => setTimestamp(date)}
                    startDate={timestamp}
                    className="rakeback-datepicker"
                />
                <Select
                    id="custom-select-1"
                    options={options}
                    label="Rakeback Type"
                    onChange={e => setRakebackType(e)}
                    className="rakeback-type"
                    />
                <TextField 
                    id="value"
                    name="value"
                    onChange={e => setValue(e.target.value)}
                    label="Dollar Value"
                    className="rakeback-value"
                />
            </Form>
            <Button 
                theme="primary" 
                buttonType="icon" 
                aria-label="Submit"
                disabled={!isValid}
                onClick={() => handleSubmit(value, rakebackType, timestamp)}
            >
                <FaCheck />
            </Button>
        </div>
    )
}

RakebackManagerForm.propTypes = {
    handleSubmit: func
}

export default RakebackManagerForm