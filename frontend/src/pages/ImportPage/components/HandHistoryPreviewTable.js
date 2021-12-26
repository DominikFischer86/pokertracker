import React from "react"
import PropTypes from "prop-types"
import { Button } from "react-md"
import { FaCheck } from "react-icons/fa"

const HandHistoryPreviewTable = ({ handHistoryMap, isSubmitted, isReadyToSubmit, submitHandData, heroName }) => {
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
                        onClick={submitHandData}
                    >
                        <FaCheck />
                    </Button>
                </div>
            </div>
            {isReadyToSubmit &&
              <div className="previewTable">
                  <table className="border">
                      <thead>
                          <tr>
                            <th>Tournament Id</th>
                            <th>Played Hands</th>
                            <th>Start date</th>
                            <th>Start Time</th>
                            <th>Final bounty</th>
                          </tr>
                      </thead>
                      <tbody>
                          {handHistoryMap.map((handHistory, i) => {
                            const handHistoryLength = handHistory.length
                            const lastHand = handHistory[handHistoryLength-1]
                            const handMeta = handHistory[0]["1_meta"]
                            const finalBounty = Object.values(lastHand["2_seats"])?.find(seat => seat.playerName === heroName).playerBounty

                            return (
                              <tr key={i}>
                                  <td><a href={`http://localhost:3000/tournament/${handHistory[0].tournamentId}`}>{handHistory[0].tournamentId}</a></td>
                                  <td>{handHistoryLength}</td>
                                  <td>{handMeta.date}</td>
                                  <td>{handMeta.time}</td>
                                  <td>{finalBounty}</td>
                              </tr>
                              )
                          })}
                      </tbody>
                  </table>
              </div>
            }
        </div>
    )
}

HandHistoryPreviewTable.propTypes = {
    handHistoryMap: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    isSubmitted: PropTypes.bool,
    submitHandData: PropTypes.func,
    isReadyToSubmit: PropTypes.bool,
    heroName: PropTypes.string
}

export default HandHistoryPreviewTable
