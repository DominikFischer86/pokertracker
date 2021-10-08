import React from "react"
import Modal from "react-modal"
import PropTypes from "prop-types"

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 0 10px rgba(0,0,0,.25)'
    }
  }


export const ImportConfirmationModal = ({confirmationModalIsOpen, closeModal}) => {
    return (
        <Modal 
            isOpen={confirmationModalIsOpen}
            shouldCloseOnOverlayClick={false}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Confirmation Modal"
            ariaHideApp={false}
        >
            <h2>Import summary</h2>
            <button onClick={closeModal}>close</button>
        </Modal>
    )
}

ImportConfirmationModal.propTypes = {
    confirmationModalIsOpen: PropTypes.bool,
    closeModal: PropTypes.func
}