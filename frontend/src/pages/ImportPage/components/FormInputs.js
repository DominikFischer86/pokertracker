import React from "react"
import propTypes from "prop-types"

import { Chip } from "@react-md/chip";
import { Button } from "react-md"
import { TextField, Switch } from "@react-md/form";
import { FaEye, FaUndo } from "react-icons/fa";

import { formFields, placementFormFields } from "../helpers"

const FormInputs = ({    
        resetForm, 
        convertData,
        skipPlacements,
        playerAmountCreator,
        submitGeneralFormData, 
        handleSwitch,
        handleBlur,
        handleFormChange,
        handlePlacementChange,
        isReadyToInput, 
        isReadyToCreate    
     }) => {
    return (
        <div className="row pb-1 mb-6">
        <div className="col-lg-12">
            <div className="row">
                {/* FORM SECTION */}
                <div className="formNav">
                    <h3>Enter via Form:</h3>
                    <div>
                        <Button 
                            theme="primary" 
                            buttonType="icon" 
                            aria-label="Reset"
                            disabled={!isReadyToInput}
                            onClick={resetForm}
                        >
                            <FaUndo />
                        </Button>
                        <Button 
                            theme="primary" 
                            buttonType="icon" 
                            aria-label="Preview"
                            disabled={!isReadyToInput}
                            onClick={convertData}
                        >
                            <FaEye />
                        </Button>
                    </div>
                </div>
                <hr />
                <form className="col-lg-3" autoComplete="off" onSubmit={submitGeneralFormData}>
                    <div className="border rounded p-2">
                    <h4>General Data</h4>
                    <hr />
                        <Switch 
                            id="type-switcher" 
                            name="type-switcher" 
                            label="Skip placements" 
                            onChange={handleSwitch}
                        />
                    <hr />
                    {formFields.map((field, index) => {
                        const [id, text, placeholder] = field
                        return (
                            <TextField 
                                key={index} 
                                className="form-control mt-2 generalFormInput"
                                type="text"
                                id={id}
                                name={id}
                                label={text}
                                required
                                onBlur={handleBlur}
                                placeholder={placeholder}
                                onChange={handleFormChange}
                            />
                        )
                    })}
                    <hr />
                        <div className="generalDataFormSubmitButton">
                            <Button type="submit" theme="warning" themeType="contained" disabled={!isReadyToCreate}>
                                {!skipPlacements ? "Enter players" : "Preview Data"}
                            </Button>
                        </div>
                    </div>                            
                </form>
                {/* PLACEMENT SECTION */}
                <div className="col-lg-9 playerPlacementSection">
                    <form className="border rounded p-2" autoComplete="off">
                        <h4>Players/Placements</h4>
                        <hr />
                        {!isReadyToInput && !skipPlacements &&
                            <div><p><strong>Please fill in General Data before enabling player/placements input.</strong></p></div>
                        }
                        {skipPlacements &&
                            <div><p><strong>No placement input required. Useful for tournaments with a lot of players.</strong></p></div>
                        }
                        {isReadyToInput && playerAmountCreator.map(item => {
                            return (
                            <div key={"outer"+item} className="row mb-2">
                                <div className="col-lg-1 chip">
                                    <Chip disabled>{item}</Chip>
                                </div>
                                {placementFormFields.map((field, index) => {
                                    const [id, text, placeholder] = field
                                    return (
                                        <div key={"inner-"+index} className="col-lg-3">
                                            <TextField                                             
                                                className="form-control"
                                                type="text"
                                                id={id+"-"+item}
                                                name={id+"-"+item}
                                                label={text}
                                                pattern="/\w/g"
                                                disabled={!isReadyToCreate}
                                                required
                                                placeholder={placeholder}
                                                onChange={handlePlacementChange}
                                            />
                                        </div>
                                    )
                                    })}     
                            </div>
                            )
                        })
                        }
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

FormInputs.propTypes = {
    resetForm: propTypes.func, 
    convertData: propTypes.func,
    skipPlacements: propTypes.bool,
    playerAmountCreator: propTypes.array,
    submitGeneralFormData: propTypes.func, 
    handleSwitch: propTypes.func,
    handleBlur: propTypes.func,
    handleFormChange: propTypes.func,
    handlePlacementChange: propTypes.func,
    isReadyToInput: propTypes.bool, 
    isReadyToCreate: propTypes.bool 
}

export default FormInputs