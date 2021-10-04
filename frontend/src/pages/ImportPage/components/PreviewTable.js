import React from "react"
import PropTypes from "prop-types"
import { Button } from "react-md"
import { TabsManager, Tabs, TabPanels, TabPanel } from "@react-md/tabs";
import { FaCheck } from 'react-icons/fa';

import { formFields } from "../helpers"

const PreviewTable = ({ tournamentMap, isSubmitted, submitData, isReadyToSubmit }) => {

    const tabs = ["Table", "JSON"];

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
    )
}

PreviewTable.propTypes = {
    tournamentMap: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    isSubmitted: PropTypes.bool,
    submitData: PropTypes.func,
    isReadyToSubmit: PropTypes.bool
}

export default PreviewTable