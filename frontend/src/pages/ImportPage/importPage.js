/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react"
import axios from "axios"

import { Switch } from "@react-md/form"
import { ExpansionList, ExpansionPanel, usePanels } from "@react-md/expansion-panel"
import { TabsManager, Tabs, TabPanels, TabPanel } from "@react-md/tabs"
import { FaTrashAlt } from "react-icons/fa"

import { MetaContext } from "../../index"

import { ImportConfirmationModal } from "../../components/Modals/ImportConfirmationModal"
import { tournamentFileConverter } from "./tournamentFileConverter"
import { handFileConverter } from "./handFileConverter"
import TournamentPreviewTable from "./components/TournamentPreviewTable"
import HandHistoryPreviewTable from "./components/HandHistoryPreviewTable"
import { TournamentFilePicker } from "./components/TournamentFilePicker"
import { HandFilePicker } from "./components/HandFilePicker"

import "./ImportPage.scss"

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
    const tournamentUrl = "http://localhost:3001/tournament/"
    const tournamentPostUrl = "http://localhost:3001/tournaments/add"
    const handHistoryPostMetaUrl = "http://localhost:3001/hand-histories/add/meta"
    const handHistoryPostSeat1Url = "http://localhost:3001/hand-histories/add/seat_1"
    const handHistoryPostSeat2Url = "http://localhost:3001/hand-histories/add/seat_2"
    const handHistoryPostSeat3Url = "http://localhost:3001/hand-histories/add/seat_3"
    const handHistoryPostSeat4Url = "http://localhost:3001/hand-histories/add/seat_4"
    const handHistoryPostSeat5Url = "http://localhost:3001/hand-histories/add/seat_5"
    const handHistoryPostSeat6Url = "http://localhost:3001/hand-histories/add/seat_6"
    const handHistoryPostSeat7Url = "http://localhost:3001/hand-histories/add/seat_7"
    const handHistoryPostSeat8Url = "http://localhost:3001/hand-histories/add/seat_8"
    const handHistoryPostSeat9Url = "http://localhost:3001/hand-histories/add/seat_9"
    const handHistoryPostPreflopUrl = "http://localhost:3001/hand-histories/add/preflop"
    const handHistoryPostFlopUrl = "http://localhost:3001/hand-histories/add/flop"
    const handHistoryPostTurnUrl = "http://localhost:3001/hand-histories/add/turn"
    const handHistoryPostRiverUrl = "http://localhost:3001/hand-histories/add/river"
    const handHistoryPostSummaryUrl = "http://localhost:3001/hand-histories/add/summary"

    const killDataUrl = "http://localhost:3001/hand-histories/deleteHands"

    useEffect(() => {
        try {
            axios.get(tournamentAndHandsGetUrl)
                .then(res => {
                    setTournaments(res.data[0])
                    setHands(res.data[1])
                })
        } catch (e) {
            console.log(e)
        }
    }, [tournamentPreviewExpanded, handPreviewExpanded, tournamentAndHandsGetUrl, killDataUrl])

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

    const submitHandData = async () => {
        let successMessageList = []
        let warningMessageList = []

        for (let handHistory of handMap){
            let metaMap = []
            let seat_1Map = []
            let seat_2Map = []
            let seat_3Map = []
            let seat_4Map = []
            let seat_5Map = []
            let seat_6Map = []
            let seat_7Map = []
            let seat_8Map = []
            let seat_9Map = []
            let preflopMap = []
            let flopMap = []
            let turnMap = []
            let riverMap = []
            let summaryMap = []
            const handHistoryLength = handHistory.length
            const lastHand = handHistory[handHistoryLength-1]
            const initialBounty = lastHand["1_meta"]?.buyInBountyAmount
            const bounty = Object.values(lastHand["2_seats"])?.find(seat => seat.playerName === heroName).playerBounty
            const finalBounty = parseFloat(bounty - initialBounty)
            const tournamentId = handHistory.find(hand => hand["1_meta"].tournamentId)["1_meta"].tournamentId

            const tournamentExists = hands.some(element => element.meta[0].tournamentId === tournamentId)

            if (bounty > 0) updateBountyInTournament(finalBounty, tournamentId)

            if (tournamentExists) {
                console.log(`%c Tournament with these hands #${tournamentId} already exists.`, "color: orange")
                warningMessageList.push(`Tournament with these hands #${tournamentId} already exists.`)
            }

            for (let hand of handHistory){
                const meta = hand["1_meta"]
                if (Object.keys(hand["1_meta"]).length > 0) metaMap.push(meta)

                const seat_1 = hand["2_seats"]["seat_1"]
                if (Object.keys(hand["2_seats"]["seat_1"])?.length > 0) seat_1Map.push(seat_1)
                
                const seat_2 = hand["2_seats"]["seat_2"]
                if (Object.keys(hand["2_seats"]["seat_2"])?.length > 0) seat_2Map.push(seat_2)
                
                const seat_3 = hand["2_seats"]["seat_3"]
                if (Object.keys(hand["2_seats"]["seat_3"])?.length > 0) seat_3Map.push(seat_3)
                
                const seat_4 = hand["2_seats"]["seat_4"]
                if (Object.keys(hand["2_seats"]["seat_4"])?.length > 0) seat_4Map.push(seat_4)
                
                const seat_5 = hand["2_seats"]["seat_5"]
                if (Object.keys(hand["2_seats"]["seat_5"])?.length > 0) seat_5Map.push(seat_5)
                
                const seat_6 = hand["2_seats"]["seat_6"]
                if (Object.keys(hand["2_seats"]["seat_6"])?.length > 0) seat_6Map.push(seat_6)
                
                const seat_7 = hand["2_seats"]["seat_7"]
                if (Object.keys(hand["2_seats"]["seat_7"])?.length > 0) seat_7Map.push(seat_7)
                
                const seat_8 = hand["2_seats"]["seat_8"]
                if (Object.keys(hand["2_seats"]["seat_8"])?.length > 0) seat_8Map.push(seat_8)
                
                const seat_9 = hand["2_seats"]["seat_9"]
                if (hand["2_seats"]["seat_9"]) seat_9Map.push(seat_9)

                const preflop = Object.keys(hand["3_preflop"]).length > 0 ? hand["3_preflop"] : null
                if (preflop !== null) preflopMap.push(preflop)

                const flop = Object.keys(hand["4_flop"]).length > 0 ? hand["4_flop"] : null
                if (flop !== null) flopMap.push(flop)

                const turn = Object.keys(hand["5_turn"]).length > 0 ? hand["5_turn"] : null
                if (turn !== null) turnMap.push(turn)

                const river = Object.keys(hand["6_river"]).length > 0 ? hand["6_river"] : null
                if (river !== null) riverMap.push(river)

                const summary = Object.keys(hand["7_summary"]).length > 0 ? hand["7_summary"] : null
                if (summary !== null) summaryMap.push(summary)
            }

            if (!tournamentExists){
                await axios.post(handHistoryPostMetaUrl, metaMap)
                .then(() => axios.post(handHistoryPostSeat1Url, seat_1Map))
                .then(() => axios.post(handHistoryPostSeat2Url, seat_2Map))
                .then(() => axios.post(handHistoryPostSeat3Url, seat_3Map))
                .then(() => axios.post(handHistoryPostSeat4Url, seat_4Map))
                .then(() => axios.post(handHistoryPostSeat5Url, seat_5Map))
                .then(() => axios.post(handHistoryPostSeat6Url, seat_6Map))
                .then(() => axios.post(handHistoryPostSeat7Url, seat_7Map))
                .then(() => axios.post(handHistoryPostSeat8Url, seat_8Map))
                .then(() => axios.post(handHistoryPostSeat9Url, seat_9Map))
                .then(() => axios.post(handHistoryPostPreflopUrl, preflopMap))
                .then(() => axios.post(handHistoryPostFlopUrl, flopMap))
                .then(() => axios.post(handHistoryPostTurnUrl, turnMap))
                .then(() => axios.post(handHistoryPostRiverUrl, riverMap))
                .then(() => axios.post(handHistoryPostSummaryUrl, summaryMap))
                
                successMessageList.push(` Added Hand History for tournament: #${tournamentId}`)
                console.log(`%c Added Hand History for tournament: #${tournamentId}`, "color: green")
            }
        }

        const messageLists = {successMessageList, warningMessageList}
        setModalContent(messageLists)
        openModal()
        setHandPreviewExpanded(false)
    }

    const updateBountyInTournament = async (finalBounty, tournamentId) => {
        const selectedTournament = tournaments.find(item => item.tournamentId === tournamentId)
        const data = {
            ...selectedTournament,
            bounties: parseFloat(finalBounty)
        }

        console.log(data)
        await axios.patch(tournamentUrl + tournamentId, data)
            .then(console.log("Updated bounty for tournament: " + tournamentId))
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

    const deletHandData = () => {
        if (confirm("Delete existing hand histories?")){
            try {
                axios.delete(killDataUrl)
            } catch (e) {
                console.log(e)
            }

            console.log("Cleared hand history database")
        }       
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
                    <div className="header">
                        <h2>Hand Histories</h2>
                        {hands.length > 0 &&
                                <FaTrashAlt 
                                onClick={deletHandData}
                                className="trash-icon"
                                style={{color: "red"}}
                                title="Delete hand histories from database"
                            />
                        }
                    </div>
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
