/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react"
import axios from "axios"

import { MetaContext } from "../../index"

import { Switch } from "@react-md/form"
import { ExpansionList, ExpansionPanel, usePanels } from "@react-md/expansion-panel"
import { TabsManager, Tabs, TabPanels, TabPanel } from "@react-md/tabs"

import { ImportConfirmationModal } from "../../components/Modals/ImportConfirmationModal"
import { tournamentFileConverter } from "./tournamentFileConverter"
import { handFileConverter } from "./handFileConverter"
import TournamentPreviewTable from "./components/TournamentPreviewTable"
import HandHistoryPreviewTable from "./components/HandHistoryPreviewTable"
import { TournamentFilePicker } from "./components/TournamentFilePicker"
import { HandFilePicker } from "./components/HandFilePicker"

const ImportPage = () => {
    const { heroName } = useContext(MetaContext)

    const [tournaments, setTournaments] = useState([])
    const [tournamentMap, setTournamentMap] = useState({})
    const [hands, setHands] = useState([])
    const [handMap, setHandMap] = useState({})
    const [skipFilePlacements, setSkipFilePlacements] = useState(false)
    const [isReadyToSubmit, setIsReadyToSubmit] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [fileExpanded, setFileExpanded] = useState(false)
    const [tournamentPreviewExpanded, setTournamentPreviewExpanded] = useState(false)
    const [handPreviewExpanded, setHandPreviewExpanded] = useState(false)
    const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState({successMessageList: [], warningMessageList: [], errorMessageList:[]})

    const tabs = ["Tournaments", "Hand Histories"]

    const tournamentAndHandsGetUrl = "http://localhost:3001/hand-histories-and-tournaments"
    const tournamentPostUrl = "http://localhost:3001/tournaments/add"
    const handHistoryPostUrl = "http://localhost:3001/hand-histories/add"

    useEffect(() => {
        try {
            axios.get(tournamentAndHandsGetUrl)
                .then(res => {
                    setHands(res.data[0])
                    setTournaments(res.data[1])
                })
        } catch (e) {
            console.log(e)
        }
    }, [tournamentPreviewExpanded, handPreviewExpanded, tournamentAndHandsGetUrl])

    const [tournamentPanels, onTournamentKeyDown] = usePanels({
        count: 2,
        multiple: true,
        idPrefix: "tournament-group"
      });

      const [handPanels, onHandsKeyDown] = usePanels({
        count: 2,
        multiple: true,
        idPrefix: "hands-group"
      });

    const [panel1Props, panel2Props] = tournamentPanels;
    const [panel3Props, panel4Props] = handPanels;

    const handleFileSwitch = () => {
        setSkipFilePlacements(!skipFilePlacements)
    }

    const submitData = () => {
        let successMessageList = []
        let warningMessageList = []
        let errorMessageList = []

        tournamentMap.forEach(tournament => {
            if (tournament.type){
                console.log("%c Not imported: #" + tournament.failId + " - " + tournament.type, "color : red" )
                return errorMessageList.push(`Not imported: #${tournament.failId} - ${tournament.type}`)
            }

            const isFilterActive = tournament.playerAmount > 45 && !skipFilePlacements

            const newTournament = {
                tournamentId: tournament.tournamentId,
                buyIn: tournament.buyIn,
                rake: tournament.rake,
                rebuys: tournament.rebuys,
                playerAmount: tournament.playerAmount,
                prizePool: tournament.prizePool,
                timeStamp: tournament.timeStamp,
                startDate: tournament.startDate,
                startTime: tournament.startTime,
                finalPosition: tournament.finalPosition,
                playerPrizeMoney: tournament.playerPrizeMoney,
                bounties: tournament.bounties,
                placements: isFilterActive ? [] : tournament.placements
             }

             const tournamentExists = tournaments.some(
                element => element.tournamentId === newTournament.tournamentId
            )
            if (tournamentExists) {
                console.log(`%c Tournament #${newTournament.tournamentId} already exists.`, "color: orange")
                return warningMessageList.push(`Tournament #${newTournament.tournamentId} already exists.`)
            }

            axios.post(tournamentPostUrl, newTournament)
            successMessageList.push(`Added Tournament: #${newTournament.tournamentId}`)
            console.log(`%c Added Tournament: #${newTournament.tournamentId}`, "color: green")
        })

        const messageLists = {successMessageList, warningMessageList, errorMessageList}
        setModalContent(messageLists)
        openModal()
        setSkipFilePlacements(false)
    }

    const submitHandData = () => {
        let successMessageList = []
        let warningMessageList = []

        handMap.forEach(handHistory => {
            const handHistoryLength = handHistory.length
            const lastHand = handHistory[handHistoryLength-1]
            const handMeta = handHistory[0]["1_meta"]
            const finalBounty = Object.values(lastHand["2_seats"])?.find(seat => seat.playerName === heroName).playerBounty
            const tournamentId = handHistory[0].tournamentId

            const tournamentExists = hands.some(
                element => element.handHistory[0].tournamentId === tournamentId)

            if (finalBounty > 0 && tournamentExists) updateBountyInTournament(finalBounty, tournamentId)

            if (tournamentExists) {
                console.log(`%c Tournament with these hands #${tournamentId} already exists.`, "color: orange")
                return warningMessageList.push(`Tournament with these hands #${tournamentId} already exists.`)
            }

            axios.post(handHistoryPostUrl, handHistory)
            successMessageList.push(` Added Hand History for tournament: #${tournamentId}`)
            console.log(`%c Added Hand History for tournament: #${tournamentId}`, "color: green")

        })

        const messageLists = {successMessageList, warningMessageList}
        console.log(messageLists)
        setModalContent(messageLists)
        openModal()
        setHandPreviewExpanded(false)
    }

    const updateBountyInTournament = (finalBounty, tournamentId) => {
        console.log(finalBounty, tournamentId)
    }

    const pickTournamentMultiFile =  e => {
        const files = e.currentTarget.files
        const newFiles = []

        Object.keys(files).forEach(index => {
            const file = files[index]
             const reader = new FileReader()
             reader.onload = e => {
                const convertedTournamentFiles = tournamentFileConverter(reader.result, heroName)
                newFiles.push(convertedTournamentFiles)
                setTournamentMap(newFiles)
                setIsReadyToSubmit(true)
                setIsSubmitted(true)
             }
             reader.readAsText(file)
        })

        setFileExpanded(false)
        setTournamentPreviewExpanded(true)
    }

    const pickHandMultiFile =  e => {
        const files = e.currentTarget.files
        const newFiles = []

        Object.keys(files).forEach(index => {
            const file = files[index]
             const reader = new FileReader()
             reader.onload = e => {
                const convertedHandsFiles = handFileConverter(reader.result, heroName)
                newFiles.push(convertedHandsFiles)
                setHandMap(newFiles)
                setIsReadyToSubmit(true)
                setIsSubmitted(true)
             }
             reader.readAsText(file, 'CP1251')
        })

        setFileExpanded(false)
        setHandPreviewExpanded(true)
    }

    const openModal = () => {
        setConfirmationModalIsOpen(true)
        setTournamentPreviewExpanded(false)
    }

    const closeModal = () => {
        setConfirmationModalIsOpen(false)
    }

    return (
        <div>
            <TabsManager tabs={tabs} tabsId="tournament-results">
                <Tabs />
                <hr />
                <TabPanels>
                    <TabPanel>
                        <h2>Import Tournaments</h2>
                        <hr />
                        <ImportConfirmationModal
                            confirmationModalIsOpen={confirmationModalIsOpen}
                            closeModal={closeModal}
                            modalContent={modalContent}
                        />
                        <ExpansionList onKeyDown={onTournamentKeyDown}>
                            {/* FILE PICKER SECTION */}
                            <ExpansionPanel
                                {...panel1Props}
                                expanded={fileExpanded}
                                header="File Picker"
                                className="mt-2"
                                onExpandClick={() => {
                                    setFileExpanded(!fileExpanded)
                                }}
                            >
                                <div className="row">
                                    <div className="col-lg-6">
                                        <TournamentFilePicker pickMultiFile={pickTournamentMultiFile} multiple />
                                    </div>
                                    <div className="col-lg-6">
                                        <Switch
                                            id="no-mtt-placement"
                                            name="no-mtt-placement"
                                            label={!skipFilePlacements
                                                ? "Deny MTT placements"
                                                : "Allow MTT placements (big data load!)"
                                            }
                                            onChange={handleFileSwitch}
                                        />
                                        <p>Player placements from MTTs are denied by default in order to prevent big data loads. Activate at your own risk.</p>
                                    </div>
                                </div>
                            </ExpansionPanel>
                            {/* PREVIEW TABLE */}
                            <ExpansionPanel {...panel2Props} expanded={tournamentPreviewExpanded} header="Preview" className="mt-2">
                                <TournamentPreviewTable
                                    tournamentMap={tournamentMap}
                                    isSubmitted={isSubmitted}
                                    isReadyToSubmit={isReadyToSubmit}
                                    submitData={submitData}
                                />
                            </ExpansionPanel>
                        </ExpansionList>
                </TabPanel>
                <TabPanel>
                         <h2>Hand Histories</h2>
                        <hr />
                        <ImportConfirmationModal
                            confirmationModalIsOpen={confirmationModalIsOpen}
                            closeModal={closeModal}
                            modalContent={modalContent}
                        />
                        <ExpansionPanel
                            {...panel3Props}
                            expanded={fileExpanded}
                            header="File Picker"
                            className="mt-2"
                            onExpandClick={() => {
                                setFileExpanded(!fileExpanded)
                            }}
                        >
                            <div className="row">
                                <div className="col-lg-6">
                                    <HandFilePicker pickMultiFile={pickHandMultiFile} multiple />
                                </div>
                            </div>
                        </ExpansionPanel>
                        <ExpansionPanel {...panel4Props} expanded={handPreviewExpanded} header="Preview" className="mt-2">
                            <HandHistoryPreviewTable
                                handHistoryMap={handMap}
                                isSubmitted={isSubmitted}
                                isReadyToSubmit={isReadyToSubmit}
                                submitHandData={submitHandData}
                                heroName={heroName}
                            />
                        </ExpansionPanel>
                </TabPanel>
            </TabPanels>
        </TabsManager>
    </div>
    )
}

export default ImportPage
