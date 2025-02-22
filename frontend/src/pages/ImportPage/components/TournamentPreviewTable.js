import React from "react"
import PropTypes from "prop-types"
import { Button } from "react-md"
import { TabsManager, Tabs, TabPanels, TabPanel } from "@react-md/tabs"
import { FaCheck } from "react-icons/fa"

import { formFields } from "../helpers"

const TournamentPreviewTable = ({ tournamentMap, isSubmitted, submitData, isReadyToSubmit }) => {
    const tabs = ["Table", "JSON"]
    if (!tournamentMap) return null

    return (
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
                <hr />
                <Tabs />
                <hr />
                <TabPanels>
                    <TabPanel>
                        <div className="previewTable">
                            <table className="border">
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
                                    {tournamentMap.map((tournament, i) => {
                                        if (tournament.type){
                                            console.log("%c Invalid tournament: #" + tournament.failId + " - " + tournament.type, "color : red" )
                                        } else {
                                            return (
                                            <tr key={i} style={
                                                tournament.playerPrizeMoney > 0
                                                    ? {color: "rgb(0,150,0)", fontWeight: "500"}
                                                    : null
                                                }>
                                                <td>{tournament.tournamentId}</td>
                                                <td>${tournament.buyIn}</td>
                                                <td>${tournament.rake}</td>
                                                <td>{tournament.rebuys}</td>
                                                <td>{tournament.playerAmount}</td>
                                                <td>${tournament.prizePool}</td>
                                                <td>{tournament.startDate}</td>
                                                <td>{tournament.startTime}</td>
                                                <td>{tournament.finalPosition}</td>
                                                <td>{tournament.playerPrizeMoney}</td>
                                                <td>{tournament.bounties}</td>
                                            </tr>
                                            )
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <code className="border">{JSON.stringify(tournamentMap)}</code>
                    </TabPanel>
                </TabPanels>
            </TabsManager>
            }
        </div>
    )
}

TournamentPreviewTable.propTypes = {
    tournamentMap: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    isSubmitted: PropTypes.bool,
    submitData: PropTypes.func,
    isReadyToSubmit: PropTypes.bool
}

export default TournamentPreviewTable
