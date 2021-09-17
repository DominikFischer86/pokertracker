import React, { useState } from "react"
import { Chip } from "@react-md/chip";
import { Button } from "react-md"
import { Checkbox, TextField } from "@react-md/form";
import { FaEye, FaUndo, FaRedo, FaCheck } from 'react-icons/fa';

const ImportPage = () => {
    const [form, setForm] = useState([])
    const [placement, setPlacement] = useState([])
    const [isReadyToCreate, setIsReadyToCreate] = useState(false)
    const [isReadyToSubmit, setIsReadyToSubmit] = useState(false)
    const [notFinished, setNotFinished] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const formFields = [
        ["tournamentId", "Tournament Id", "Only digits"],
        ["buyIn", "Buy-In", "in $$.$$"],
        ["rake", "Rake", "in $$.$$"],
        ["playerAmount", "Players", "max. Players"],
        ["prizePool", "Prize Pool", "in $$.$$"],
        ["startDate", "Start Date", "in JJJJ/MM/DD"],
        ["startTime", "Start Time", "in HH:MM:SS"],
        ["finalPosition", "Final Position", "Your placement"],
        ["prizeMoney", "Prize money", "in $$.$$"]
    ]

    const placementFormFields = [
        ["playerName", "Player Name", "Enter name"],
        ["playerCountry", "Player Country", "Enter country"]
    ]

    const handleFormChange = event => {
        const { name, value } = event.target
        setForm({...form, [name]: value})
    }

    const handlePlacementChange = event => {
        const { name, value } = event.target
        setPlacement({...placement, [name]: value})
    }

    const handlePlacementSwitch = event => {
        setNotFinished(!notFinished)
        setPlacement({...placement, "notFinished": notFinished})
    }

    const resetForm = () => {
        console.log("Reset")
    }

    return (
        <div>
            <h2>Import Tournaments</h2>
            <hr />
            <div className="row pb-1">
               <div className="col-lg-8">
                    <div className="row">
                        {/* FORM SECTION */}
                        <div className="formNav">
                            <h3>Enter via Form:</h3>
                            <div>
                                <Button 
                                    theme="primary" 
                                    buttonType="icon" 
                                    aria-label="Reset"
                                    onClick={resetForm}
                                >
                                    <FaUndo />
                                </Button>
                                <Button 
                                    theme="primary" 
                                    buttonType="icon"
                                    disabled={!isReadyToCreate}
                                    aria-label="Create player inputs"
                                >
                                    <FaRedo />
                                </Button>
                                <Button 
                                    theme="primary" 
                                    buttonType="icon" 
                                    aria-label="Preview"
                                    disabled={!isReadyToSubmit}
                                >
                                    <FaEye />
                                </Button>
                                <Button 
                                    theme="primary" 
                                    buttonType="icon" 
                                    aria-label="Submit"
                                    disabled={!isReadyToSubmit}
                                >
                                    <FaCheck />
                                </Button>
                            </div>
                        </div>
                        
                        <hr />
                        <form className="col-lg-3" autoComplete="off">
                            <div className="border rounded p-2">
                            <h4>General Data</h4>
                            <hr />
                            {formFields.map((field, index) => {
                                const [id, text, placeholder] = field
                                return (
                                    <TextField 
                                        key={index} 
                                        className="form-control mt-2"
                                        type="text"
                                        id={id}
                                        name={id}
                                        label={text}
                                        required
                                        placeholder={placeholder}
                                        onChange={handleFormChange}
                                    />
                                )
                            })}
                            </div>
                        </form>
                        {/* PLACEMENT SECTION */}
                        <div className="col-lg-9 ">
                            <form className="border rounded p-2" autoComplete="off">
                                <h4>Players/Placements</h4>
                                <hr />
                                <div className="row">
                                    <div className="col-lg-1 chip">
                                        <Chip disabled>1</Chip>
                                    </div>
                                    {placementFormFields.map((field, index) => {
                                        const [id, text, placeholder] = field
                                        return (
                                            <div key={index} className="col-lg-4">
                                                <TextField                                             
                                                    className="form-control"
                                                    type="text"
                                                    id={id}
                                                    name={id}
                                                    label={text}
                                                    disabled={!isReadyToCreate}
                                                    required
                                                    placeholder={placeholder}
                                                    onChange={handlePlacementChange}
                                                />
                                            </div>
                                           )
                                         })}                                   
                                    <div className="col-lg-3">
                                        <Checkbox
                                            id="notFinished"
                                            name="notFinished"
                                            label="Still playing"
                                            disabled={!isReadyToCreate}
                                            onChange={handlePlacementSwitch}
                                            value={notFinished}
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
               </div>
               {/* FOLDER PICKER SECTION */}
               <div className="col-lg-4">
                    <div className="row">
                        <h3>Folder Picker</h3>
                        <hr />
                    </div>
               </div>
            </div>
            {/* PREVIEW TABLE */}
            {isSubmitted &&
                <div className="border mt-2 p-2">
                    <h3>Vorschau:</h3>
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
                </div>
            }
        </div>
    )
}

export default ImportPage