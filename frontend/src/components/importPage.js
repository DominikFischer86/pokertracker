import React, { useState } from "react"
import { Chip } from "@react-md/chip";
import { Checkbox } from "@react-md/form";

const ImportPage = () => {
    const [form, setForm] = useState([])
    const [placement, setPlacement] = useState([])
    const [isReadyToCreate, setIsReadyToCreate] = useState(false)
    const [notFinished, setNotFinished] = useState(false)

    const formFields = [
        ["tournamentId", "Tournament Id:", "Only digits"],
        ["buyIn", "Buy-In:", "in $"],
        ["rake", "Rake:", "in $"],
        ["playerAmount", "Players:", "max. Player"],
        ["prizePool", "Prize Pool:", "in $"],
        ["startDate", "Start Date:", "in JJJJ/MM/DD"],
        ["finalPosition", "Final Position:", "Your placement"],
    ]

    const placementFormFields = [
        ["playerName", "Player Name:", "Enter name"],
        ["playerCountry", "Player Country:", "Enter country"],
        ["notFinished", "Still playing:", ""]
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

    return (
        <div>
            <h2>Import Tournaments</h2>
            <hr />
            <div className="row pb-1">
               <div className="col-lg-8">
                    <div className="row">
                        {/* FORM SECTION */}
                        <h3>Enter via Form:</h3>
                        <hr />
                        <form className="col-lg-3">
                            <div className="border rounded p-2">
                            <h4>General Data</h4>
                            <hr />
                            {formFields.map((field, index) => {
                                const [id, text, placeholder] = field
                                return (
                                    <div key={index} className="mt-2">
                                        <label htmlFor={id}>{text}</label>
                                        <input 
                                            type="text"
                                            id={id}
                                            name={id}
                                            required
                                            className="form-control"
                                            placeholder={placeholder}
                                            onChange={handleFormChange}
                                        />
                                    </div>
                                )
                            })}
                            </div>
                        </form>
                        {/* PLACEMENT SECTION */}
                        <div className="col-lg-9 ">
                            <form className="border rounded p-2">
                                <h4>Players/Placements</h4>
                                <hr />
                                <div className="row">
                                    <div className="col-lg-1">
                                        <Chip disabled>1</Chip>
                                    </div>
                                    <div className="col-lg-4">
                                        <input 
                                            type="text"
                                            name="playerName"
                                            id="playerName"
                                            disabled={!isReadyToCreate}
                                            className="form-control"
                                            placeholder="Player Name"
                                            onChange={handlePlacementChange}
                                        />
                                    </div>
                                    <div className="col-lg-4">
                                        <input 
                                            type="text"
                                            name="playerCountry"
                                            id="playerCountry"
                                            disabled={!isReadyToCreate}
                                            className="form-control"
                                            placeholder="Player Country"
                                            onChange={handlePlacementChange}
                                        />
                                    </div>
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
            <hr />
            <h3>Vorschau:</h3>
            <table className="previewTable border">
                <thead>
                    <tr>
                        <th>Tournament Id</th>
                        <th>Buy-In in USD</th>
                        <th>Rake in USD</th>
                        <th>Player Amount</th>
                        <th>Prize Pool in USD</th>
                        <th>Start Date</th>
                        <th>Final Position</th>
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
                        <td>{form.finalPosition}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ImportPage