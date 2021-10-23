import React from "react"
import PropTypes from "prop-types"

import { FaPencilAlt, FaWindowClose, FaCheckCircle } from "react-icons/fa"

import { translate } from "../helper"

import "../style.scss"

const EditablePanels = ({isEditable, property, isEditMode, setIsEditMode, handleChange, formState, submitChange, tournament}) => {
    const buyIn = tournament?.buyIn
    const rake = tournament?.rake
    
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
                {property == "buyIn" && <span>{tournament?.[property]} USD</span>}
                {property == "rake" && <span>{tournament?.[property]} USD ({rakePercent}%)</span>}
                {property == "rebuys" && <span>{tournament?.[property]}x (+{tournament?.[property]*(buyIn+rake)} USD)</span>}
                {property == "prizePool" && <span>{tournament?.[property]} USD</span>}
                {property == "startDate" && <span>{tournament?.[property]} CET</span>}
                {property == "startTime" && <span>{tournament?.[property]} h</span>}
                {property == "finalPosition" && <span>{tournament?.[property]} of {tournament?.playerAmount}</span>}
                {property == "playerPrizeMoney" && <span>{tournament?.[property]} USD</span>}
                {property == "bounties" && <span>{tournament?.[property]} USD</span>}

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