/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import axios from "axios"

import { ExpansionList, ExpansionPanel, usePanels } from "@react-md/expansion-panel"

import {ImportConfirmationModal} from "../../components/Modals/ConfirmationModal"
import { fileConverter } from "./fileConverter"
import PreviewTable from "./components/PreviewTable";
import MultiFilePicker from "./components/FilePicker"
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

    const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState(
        {
        successMessageList: [], 
        warningMessageList: [], 
        errorMessageList:[]
        }
    )

    const url = "http://localhost:3001" + window.location.pathname

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(jsonRes => setTournaments(jsonRes))
            .catch(err => console.log(err))
        
    }, [previewExpanded])

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
        const inputs = document.querySelectorAll(".generalFormInput")

        if (inputs.length <= checkInputLength) {
            if (e.target.value === ""){
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
        const inputs = document.querySelectorAll("input[type='text']")
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
            const playerAmount = parseFloat(Object.values(form.playerAmount).join().replace(",",""))

            playerAmountCreator.splice(0, playerAmountCreator.length)
            for (let i = 1; i <= playerAmount; i++){
                playerAmountCreator.push(i)
            }
            setPlayerAmountCreator(playerAmountCreator)
            setIsReadyToInput(true)
        } else {            
            setTournamentMap({
                ...form,
                "placements": []
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
            "placements": newPlacementMap
        })
        setIsReadyToSubmit(true)
        setIsSubmitted(true)
        setFormExpanded(false)
        setFileExpanded(false)
        setPreviewExpanded(true)
    }

    const submitData = () => {        
        const url = "http://localhost:3001/import"

        let successMessageList = []
        let warningMessageList = []
        let errorMessageList = []

        tournamentMap.forEach(tournament => {
            if (tournament.type){
                console.log("%c Not imported: #" + tournament.failId + " - " + tournament.type, "color : red" )
                return errorMessageList.push(`Not imported: #${tournament.failId} - ${tournament.type}`) 
            }

            const newTournament = {
                tournamentId: tournament.tournamentId,
                buyIn: tournament.buyIn,
                rake: tournament.rake,
                playerAmount: tournament.playerAmount,
                prizePool: tournament.prizePool,
                startDate: tournament.startDate,
                startTime: tournament.startTime,
                finalPosition: tournament.finalPosition,
                playerPrizeMoney: tournament.playerPrizeMoney,
                placements: tournament.placements
             }
            
             const tournamentExists = tournaments.some(
                element => element.tournamentId === newTournament.tournamentId
            )
            if (tournamentExists) {
                resetForm()
                console.log(`%c Tournament #${newTournament.tournamentId} already exists.`, "color: orange")
                return warningMessageList.push(`Tournament #${newTournament.tournamentId} already exists.`)
            }
            
            axios.post(url, newTournament)
            successMessageList.push(`Added Tournament: #${newTournament.tournamentId}`)
            console.log(`%c Added Tournament: #${newTournament.tournamentId}`, "color: green")
        })

        const messageLists = {successMessageList, warningMessageList, errorMessageList}
        setModalContent(messageLists)
        openModal()
    }    

    const pickMultiFile =  e => {
        const files = e.currentTarget.files
        const newFiles = []
        clearState()

        Object.keys(files).forEach(index => {
            const file = files[index]            
             const reader = new FileReader()
             reader.onload = e => {
                const convertedFiles = fileConverter(reader.result, PLAYER)
                newFiles.push(convertedFiles)
                setForm(newFiles)
                setTournamentMap(newFiles)
                setIsReadyToSubmit(true)
                setIsSubmitted(true)
             }
             reader.readAsText(file)            
        })

        setFormExpanded(false)
        setFileExpanded(false)
        setPreviewExpanded(true)        
    }

    const openModal = () => {
        setConfirmationModalIsOpen(true)
        setPreviewExpanded(false)     
    }

    const closeModal = () => {
        setConfirmationModalIsOpen(false)          
    }
   
    return (
        <div>
            <h2>Import Tournaments</h2>
            <hr />
            <ImportConfirmationModal 
                confirmationModalIsOpen={confirmationModalIsOpen}
                closeModal={closeModal}
                modalContent={modalContent}
            />
            <ExpansionList onKeyDown={onKeyDown}>
                {/* FORM INPUT SECTION */}
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
                    <div className="row">
                        <div className="col-lg-6">
                            <MultiFilePicker pickMultiFile={pickMultiFile} multiple />
                        </div>
                        <div className="col-lg-6">
                            Filter dood
                        </div>                
                    </div>
                </ExpansionPanel>
                {/* PREVIEW TABLE */}
                <ExpansionPanel {...panel3Props} expanded={previewExpanded} header="Preview" className="mt-2">
                    <PreviewTable 
                        tournamentMap={tournamentMap}
                        isSubmitted={isSubmitted}                        
                        isReadyToSubmit={isReadyToSubmit}
                        submitData={submitData}
                    />
                </ExpansionPanel>                
            </ExpansionList>
        </div>
    )
}

export default ImportPage