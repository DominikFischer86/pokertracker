/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import axios from "axios"
import { Chip } from "@react-md/chip";
import { Button } from "react-md"
import { TextField, Switch } from "@react-md/form";
import { TabsManager, Tabs, TabPanels, TabPanel } from "@react-md/tabs";
import { FaEye, FaUndo, FaCheck } from 'react-icons/fa';
import {
    ExpansionList,
    ExpansionPanel,
    usePanels,
  } from "@react-md/expansion-panel";

import { formFields, placementFormFields } from "./helpers"
import { fileConverter } from "./fileConverter";

const PLAYER = "KeinKönich"

const ImportPage = () => {
    const [tournaments, setTournaments] = useState([])
    const [form, setForm] = useState([])
    const [placement, setPlacement] = useState([])
    const [tournamentMap, setTournamentMap] = useState({})
    const [playerAmountCreator, setPlayerAmountCreator] = useState([])

    const [skipPlacements, setSkipPlacements] = useState(false)
    const [isReadyToCreate, setIsReadyToCreate] = useState(false)
    const [isReadyToInput, setIsReadyToInput] = useState(false)
    const [isReadyToSubmit, setIsReadyToSubmit] = useState(false)
   
    const [isSubmitted, setIsSubmitted] = useState(false)

    const [formExpanded, setFormExpanded] = useState(false)
    const [fileExpanded, setFileExpanded] = useState(false)
    const [previewExpanded, setPreviewExpanded] = useState(false)

    useEffect(() => {
        fetch("http://localhost:3001/import")
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(jsonRes => setTournaments(jsonRes))
            .catch(err => console.log(err))
        
    }, [])

    const [panels, onKeyDown] = usePanels({
        count: 3,
        multiple: true,
        idPrefix: "my-panel-group"
      });
    
      const [panel1Props, panel2Props, panel3Props] = panels;

    const tabs = ["Table", "JSON"];
    
    const handleSwitch = () => {
        setSkipPlacements(!skipPlacements)
    }

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

    const clearState = () => {
        setForm([])
        setPlacement([])
    }

    const resetForm = () => {
        const inputs = document.querySelectorAll('input[type="text"]')
        inputs.forEach(input => (input.value = ""))
        clearState()
        playerAmountCreator.splice(0, playerAmountCreator.length)
        setIsReadyToCreate(false)
        setIsReadyToInput(false)
        setIsSubmitted(false)
        setTournamentMap([])
        setFormExpanded(false)
        setFileExpanded(false)
        setPreviewExpanded(false)
    }

    const submitGeneralFormData = e => {
        e.preventDefault()

        if (!skipPlacements){
            const playerAmount = parseFloat(Object.values(form.playerAmount).join().replace(',',''))

            playerAmountCreator.splice(0, playerAmountCreator.length)
            for (let i = 1; i <= playerAmount; i++){
                playerAmountCreator.push(i)
            }
            setPlayerAmountCreator(playerAmountCreator)
            setIsReadyToInput(true)
        } else {
            
            setTournamentMap({
                ...form,
                'placements': []
            })
            setIsReadyToSubmit(true)
            setIsSubmitted(true)
            setFormExpanded(false)
            setFileExpanded(false)
            setPreviewExpanded(true)
        }
        
    }

    const convertData = () => {
        let newPlacement = []
        let newPlacementMap = []
        let arr = []
        let arrList = []
        clearState()

        for (let i = 1; i <= form.playerAmount; i++){    
            let key = Object.keys(placement).filter(item => item.includes(i))
            newPlacement.push(key)

            for (let j = 0; j < 3; j++){
                arr.push(placement[newPlacement[i-1][j]])
                arrList = [
                    [ "finishPosition", i ],
                    [ "playerName", arr[i*3-3] ],
                    [ "playerCountry", arr[i*3-2] ],
                    [ "prizeMoney", arr[i*3-1] ]
                ]
            }
            newPlacementMap.push(Object.fromEntries(arrList))
        }

        setTournamentMap({
            ...form,
            'placements': newPlacementMap
        })

        setIsReadyToSubmit(true)
        setIsSubmitted(true)
        setFormExpanded(false)
        setFileExpanded(false)
        setPreviewExpanded(true)
    }

    const submitData = async () => {
        const url = "http://localhost:3001/import"
        const newTournament = {
            tournamentId: tournamentMap.tournamentId,
            buyIn: tournamentMap.buyIn,
            rake: tournamentMap.rake,
            playerAmount: tournamentMap.playerAmount,
            prizePool: tournamentMap.prizePool,
            startDate: tournamentMap.startDate,
            startTime: tournamentMap.startTime,
            finalPosition: tournamentMap.finalPosition,
            playerPrizeMoney: tournamentMap.playerPrizeMoney,
            placements: tournamentMap.placements
         }
        const headers = {
            'Access-Control-Allow-Origin' : '*',
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }

        const tournamentExists = tournaments.some(
            element => element.tournamentId === newTournament.tournamentId
        )
        if (tournamentExists) {
            resetForm()
            return alert(`Tournament (#${newTournament.tournamentId}) already exists`)
        }
        
        await axios.post(url, newTournament, { headers })
        console.log("Added Tournament: #" + newTournament.tournamentId)
        console.log(tournaments)
        resetForm()
    }

    const pickFile = e => {
       const files = e.target.files
       const reader = new FileReader()
       clearState()

       reader.onload = () => {
           const convertedFile = fileConverter(reader.result, PLAYER)
           const { playerAmount } = convertedFile
           if (Number.isNaN(playerAmount)) {
               console.log("File doesn't fit format")
           } else {
            setForm(convertedFile)
            setTournamentMap(convertedFile)
            setIsReadyToSubmit(true)
            setIsSubmitted(true)
           }
           
       }
       for (let i = 0; i < files.length; i++){
        reader.readAsText(files[i])
       }

       setFormExpanded(false)
       setFileExpanded(false)
       setPreviewExpanded(true)       
    }
   
    return (
        <div>
            <h2>Import Tournaments</h2>
            <hr />
            <ExpansionList onKeyDown={onKeyDown}>
                <ExpansionPanel 
                    {...panel1Props} 
                    expanded={formExpanded} 
                    onExpandClick={() => {
                        setFormExpanded(!formExpanded)
                        setFileExpanded(false)
                    }}
                    header="Form input"
                >
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
                 <ExpansionPanel 
                    {...panel2Props} 
                    expanded={fileExpanded} 
                    header="File Picker" 
                    className="mt-2" 
                    onExpandClick={() => {
                        setFileExpanded(!fileExpanded)
                        setFormExpanded(false)
                    }}
                >
                    <div className="border rounded mt-2 p-2">                   
                            <h3>File Picker</h3>
                            <input accept="text/plain" type="file" onChange={pickFile} />     
                    </div>
                </ExpansionPanel>
            {/* PREVIEW TABLE */}
            <ExpansionPanel {...panel3Props} expanded={previewExpanded} header="Preview" className="mt-2">
                <div className="border mt-2 p-2">
                    <div className="formNav">
                        <h3>Preview:</h3>
                        <div>
                            <Button 
                                theme="primary" 
                                buttonType="icon" 
                                aria-label="Submit"
                                disabled={!isSubmitted}
                                onClick={submitData}
                            >
                                <FaCheck />
                            </Button>
                        </div>
                    </div>
                    {isReadyToSubmit &&
                    <TabsManager tabs={tabs} tabsId="tournament-output">
                        <Tabs />
                        <TabPanels>
                            <TabPanel>
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
                                            <td>{tournamentMap.tournamentId}</td>
                                            <td>${tournamentMap.buyIn}</td>
                                            <td>${tournamentMap.rake}</td>
                                            <td>{tournamentMap.playerAmount}</td>
                                            <td>${tournamentMap.prizePool}</td>
                                            <td>{tournamentMap.startDate}</td>
                                            <td>{tournamentMap.startTime} ET</td>
                                            <td>{tournamentMap.finalPosition}/{tournamentMap.playerAmount}</td>
                                            <td>${tournamentMap.playerPrizeMoney}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </TabPanel>
                            <TabPanel>
                                <code className="border">{JSON.stringify(tournamentMap)}</code>
                            </TabPanel>
                        </TabPanels>
                    </TabsManager>
                     }
                </div>
              </ExpansionPanel>
        </ExpansionList>
    </div>
    )
}

export default ImportPage