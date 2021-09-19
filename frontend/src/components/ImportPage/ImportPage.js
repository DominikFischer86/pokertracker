import React, { useState } from "react"
import { Chip } from "@react-md/chip";
import { Button } from "react-md"
import { Checkbox, TextField } from "@react-md/form";
import { FaEye, FaUndo, FaCheck } from 'react-icons/fa';
import {
    ExpansionList,
    ExpansionPanel,
    usePanels,
  } from "@react-md/expansion-panel";

import { formFields, placementFormFields } from "./helpers"

const ImportPage = () => {
    const [form, setForm] = useState([])
    const [placement, setPlacement] = useState([])
    const [playerAmountCreator, setPlayerAmountCreator] = useState([])

    const [isReadyToCreate, setIsReadyToCreate] = useState(false)
    const [isReadyToInput, setIsReadyToInput] = useState(false)
    const [isReadyToSubmit, setIsReadyToSubmit] = useState(false)
   
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [notFinished, setNotFinished] = useState(false)

    const [panels, onKeyDown] = usePanels({
        count: 3,
        idPrefix: "my-panel-group"
      });
    
      const [panel1Props, panel2Props, panel3Props] = panels;

    const handleFormChange = event => {
        const { name, value } = event.target
        setForm({...form, [name]: value})   
    }

    const handleBlur = e => {
        const checkInputKeys = Object.keys(form)
        const checkInputLength = checkInputKeys.length
        const inputs = document.querySelectorAll('.generalFormInput')

        if (inputs.length <= checkInputLength) {
            if (e.target.value === ''){
                return setIsReadyToCreate(false)
            }
            setIsReadyToCreate(true)
        }
    }

    const handlePlacementChange = event => {
        const { name, value } = event.target
        setPlacement({...placement, [name]: value })
    }

    const handlePlacementSwitch = () => {
        setNotFinished(!notFinished)
        setPlacement({...placement, "notFinished": notFinished})
    }

    const clearState = () => {
        setForm([])
        setPlacement([])
    }

    const resetForm = () => {
        const inputs = document.querySelectorAll('input')
        inputs.forEach(input => (input.value = ""))
        clearState()
        playerAmountCreator.splice(0, playerAmountCreator.length)
        setIsReadyToCreate(false)
        setIsReadyToInput(false)
    }

    const submitGeneralFormData = e => {
        e.preventDefault()
        const playerAmount = parseFloat(Object.values(form.playerAmount))

        playerAmountCreator.splice(0, playerAmountCreator.length)
        for (let i = 1; i <= playerAmount; i++){
            playerAmountCreator.push(i)
        }
        setPlayerAmountCreator(playerAmountCreator)
        setIsReadyToInput(true)
    }

    const submitForms = () => {
        console.log(form)
        console.log(placement)
    }

    return (
        <div>
            <h2>Import Tournaments</h2>
            <hr />
            <ExpansionList onKeyDown={onKeyDown}>
                <ExpansionPanel {...panel1Props} header="Form input">
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
                                    >
                                        <FaEye />
                                    </Button>
                                    <Button 
                                        theme="primary" 
                                        buttonType="icon" 
                                        aria-label="Submit"
                                        disabled={!isReadyToInput}
                                        onClick={submitForms}
                                    >
                                        <FaCheck />
                                    </Button>
                                </div>
                            </div>
                            <hr />
                            <form className="col-lg-3" autoComplete="off" onSubmit={submitGeneralFormData}>
                                <div className="border rounded p-2">
                                <h4>General Data</h4>
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
                                        <Button type="submit" theme="warning" themeType="contained" disabled={!isReadyToCreate}>Enter players</Button>
                                    </div>
                                </div>                            
                            </form>
                            {/* PLACEMENT SECTION */}
                            <div className="col-lg-9 playerPlacementSection">
                                <form className="border rounded p-2" autoComplete="off">
                                    <h4>Players/Placements</h4>
                                    <hr />
                                    {!isReadyToInput &&
                                    <div><p><strong>Please fill in General Data before enabling player/placements input.</strong></p></div>
                                    }
                                    {isReadyToInput && playerAmountCreator.map(item => {
                                        return (
                                        <div key={'outer'+item} className="row mb-2">
                                            <div className="col-lg-1 chip">
                                                <Chip disabled>{item}</Chip>
                                            </div>
                                            {placementFormFields.map((field, index) => {
                                                const [id, text, placeholder] = field
                                                return (
                                                    <div key={'inner-'+index} className="col-lg-3">
                                                        <TextField                                             
                                                            className="form-control"
                                                            type="text"
                                                            id={id+'-'+item}
                                                            name={id+'-'+item}
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
                </ExpansionPanel>
            
                 {/* FOLDER PICKER SECTION */}
                 <ExpansionPanel {...panel2Props} header="File Picker" className="mt-2">
                    <div className="border rounded mt-2 p-2">                   
                            <h3>File Picker</h3>             
                    </div>
                </ExpansionPanel>
            {/* PREVIEW TABLE */}
            <ExpansionPanel {...panel3Props} header="Vorschau" className="mt-2">
                <div className="border mt-2 p-2">
                    <h3>Vorschau:</h3>
                    {isReadyToSubmit &&
                    <table className="previewTable border">
                        <thead>
                            <tr>
                                {formFields.map((field,index) => {
                                    return (
                                        <th key={index}>{field[1]}</th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{form.tournamentId}</td>
                                <td>{form.buyIn}</td>
                                <td>{form.rake}</td>
                                <td>{form.playerAmount}</td>
                                <td>{form.prizePool}</td>
                                <td>{form.startDate}</td>
                                <td>{form.startTime}</td>
                                <td>{form.finalPosition}</td>
                                <td>{form.prizeMoney}</td>
                            </tr>
                        </tbody>
                    </table>
                     }
                </div>
               
            </ExpansionPanel>
        </ExpansionList>
    </div>
    )
}

export default ImportPage