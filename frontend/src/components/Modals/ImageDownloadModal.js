import React from "react"
import Modal from "react-modal"
import PropTypes from "prop-types"

import { IoIosClose } from "react-icons/io"
import "./modals.scss"

export const ImageDownloadModal = ({imageDownloadModalIsOpen, submitToWeb, closeModal, imageString}) => {
    
    return (
        <Modal 
            isOpen={imageDownloadModalIsOpen}
            shouldCloseOnOverlayClick={false}
            onRequestClose={closeModal}
            className="Confirmation_Modal"
            contentLabel="Confirmation Modal"
            ariaHideApp={false}
        >
            <div className="Confirmation_Modal__content">
                <img src={imageString} />
            </div>
            <div className="Confirmation_Modal__footer">
                <p>Right-click and save to download.</p>
                <button onClick={submitToWeb}>Upload to imgbb.com</button>
            </div>            
            <IoIosClose className="Confirmation_Modal__closeButton" onClick={closeModal} />
        </Modal>
    )
}

ImageDownloadModal.propTypes = {
    imageString: PropTypes.string,
    imageDownloadModalIsOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    submitToWeb: PropTypes.func
}
