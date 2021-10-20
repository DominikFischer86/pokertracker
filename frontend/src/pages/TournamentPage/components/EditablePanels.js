import React from "react"
import PropTypes from "prop-types"

import { FaPencilAlt, FaWindowClose, FaCheckCircle } from "react-icons/fa"

import { translate } from "../helper"

import "../style.scss"

const EditablePanels = ({isEditable, property, isEditMode, setIsEditMode, handleChange, formState, submitChange, tournament}) => {
    const tournamentItem = tournament[0]
    const buyIn = tournamentItem?.buyIn
    const rake = tournamentItem?.rake
    
    const rakePercent = (rake/buyIn * 100).toFixed(2)

    return (
        <div id={property} className="Editable_Panel_Container">
            <h3>{translate(property)}</h3>
            {isEditMode &&
            <div className="Editable_Panel_Edit">
                <input type="text" name={property} disabled={!isEditable} defaultValue={formState[property]} onChange={(e) => handleChange(property, e)} />
                {isEditable &&
                <>
                    <FaCheckCircle className="icon submit_icon" onClick={submitChange} />
                    <FaWindowClose className="icon cancel_icon" onClick={() => setIsEditMode(false)} />
                </>
                }
            </div>
            }
            {!isEditMode &&
            <div className="Editable_Panel_Show">
                {property == "buyIn" && <span>{tournamentItem?.[property]} USD</span>}
                {property == "rake" && <span>{tournamentItem?.[property]} USD ({rakePercent}%)</span>}
                {property == "rebuys" && <span>{tournamentItem?.[property]}x (+{tournamentItem?.[property]*(buyIn+rake)} USD)</span>}
                {property == "prizePool" && <span>{tournamentItem?.[property]} USD</span>}
                {property == "startDate" && <span>{tournamentItem?.[property]} CET</span>}
                {property == "startTime" && <span>{tournamentItem?.[property]} h</span>}
                {property == "finalPosition" && <span>{tournamentItem?.[property]} of {tournamentItem?.playerAmount}</span>}
                {property == "playerPrizeMoney" && <span>{tournamentItem?.[property]} USD</span>}
                {property == "bounties" && <span>{tournamentItem?.[property]} USD</span>}

                {isEditable &&
                    <FaPencilAlt className="icon edit_icon" onClick={() => setIsEditMode(true)} />
                }                
            </div>
            }
        </div>
    )
}

EditablePanels.propTypes = {
    isEditable: PropTypes.bool,
    property: PropTypes.string,
    tournament: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    formState: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
  ]),
  isEditMode: PropTypes.bool,
  setIsEditMode: PropTypes.func,
  handleChange: PropTypes.func,
  submitChange: PropTypes.func
  }

export default EditablePanels