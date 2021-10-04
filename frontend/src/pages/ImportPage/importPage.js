/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import axios from "axios"

import { ExpansionList, ExpansionPanel, usePanels } from "@react-md/expansion-panel";

import { fileConverter } from "./fileConverter";

import PreviewTable from "./components/PreviewTable";
import FilePicker from "./components/FilePicker"
import FormInputs from "./components/FormInputs"

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
        alert("Added Tournament: #" + newTournament.tournamentId)
        console.log("Added Tournament: #" + newTournament.tournamentId)
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
                   <FormInputs 
                    resetForm={resetForm}
                    convertData={convertData}
                    skipPlacements={skipPlacements}
                    playerAmountCreator={playerAmountCreator}
                    submitGeneralFormData={submitGeneralFormData}
                    handleSwitch={handleSwitch}
                    handleBlur={handleBlur}
                    handleFormChange={handleFormChange}
                    handlePlacementChange={handlePlacementChange}
                    isReadyToInput={isReadyToInput}
                    isReadyToCreate={isReadyToCreate}
                   />
                </ExpansionPanel>
            
                 {/* FILE PICKER SECTION */}
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
                    <FilePicker pickFile={pickFile} />
                </ExpansionPanel>
                {/* PREVIEW TABLE */}
                <ExpansionPanel {...panel3Props} expanded={previewExpanded} header="Preview" className="mt-2">
                    <PreviewTable 
                        tournamentMap={tournamentMap}
                        isSubmitted={isSubmitted}
                        submitData={submitData}
                        isReadyToSubmit={isReadyToSubmit} 
                    />
                </ExpansionPanel>                
            </ExpansionList>
        </div>
    )
}

export default ImportPage