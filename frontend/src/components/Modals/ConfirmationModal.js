import React from "react"
import Modal from "react-modal"
import PropTypes from "prop-types"

import { IoIosClose } from "react-icons/io"
import "./modals.scss"

export const ImportConfirmationModal = ({confirmationModalIsOpen, closeModal, modalContent}) => {
    
    const { successMessageList, warningMessageList, errorMessageList } = modalContent

    return (
        <Modal 
            isOpen={confirmationModalIsOpen}
            shouldCloseOnOverlayClick={false}
            onRequestClose={closeModal}
            className="Confirmation_Modal"
            contentLabel="Confirmation Modal"
            ariaHideApp={false}
        >
            <div className="Confirmation_Modal__title">
                <h2>Import summary</h2>
            </div>
            <div className="Confirmation_Modal__content">
                {successMessageList.length > 0 &&
                    <div>
                        <h3>Successfully added ({successMessageList.length}):</h3>
                        <ul>
                        {successMessageList.map((listItem, index) => {
                                return <li className="success" key={index}>{listItem}</li>
                            })}
                        </ul>
                    </div>
                }
                {warningMessageList.length > 0 &&
                    <div>
                        <h3>Already existing ({warningMessageList.length}):</h3>
                        <ul>
                            {warningMessageList.map((listItem, index) => {
                                return <li className="warning" key={index}>{listItem}</li>
                            })}
                        </ul>
                    </div>
                }
                {errorMessageList.length > 0 &&
                    <div>
                        <h3>Not added ({errorMessageList.length}):</h3>
                        <ul>
                            {errorMessageList.map((listItem, index) => {
                               return <li className="error" key={index}>{listItem}</li>
                            })}
                        </ul>
                    </div>
                }
            </div>
            <div className="Confirmation_Modal__footer">
                <button onClick={closeModal}>Ok</button>
            </div>            
            <IoIosClose className="Confirmation_Modal__closeButton" onClick={closeModal} />
        </Modal>
    )
}

ImportConfirmationModal.propTypes = {
    modalContent: PropTypes.object,
    confirmationModalIsOpen: PropTypes.bool,
    closeModal: PropTypes.func
}
