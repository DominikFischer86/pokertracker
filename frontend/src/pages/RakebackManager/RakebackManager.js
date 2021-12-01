import React, { useEffect, useState, useContext } from "react"
import axios from "axios"

import { MetaContext } from "../../index"
import { formatMonth, formatDay, formatHour, formatMinute } from "../ImportPage/helpers"
import RakebackManagerTable from "./components/RakebackManagerTable"
import RakebackManagerForm from "./components/RakebackManagerForm"
import { ImportConfirmationModal } from "../../components/Modals/ImportConfirmationModal"

const RakebackManager = () => {
    const url = "http://localhost:3001/rakeback"
    const { heroName } = useContext(MetaContext)

    const [data, setData] = useState([])
    const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState("")

    useEffect(() => {
        try {
             axios.get(url)
                .then(res => {
                    setData(res.data)
                })
         } catch (e) {
            console.log(e)
        }
    }, [url])

    const openModal = () => {
        setConfirmationModalIsOpen(true)
    }

    const closeModal = () => {
        setConfirmationModalIsOpen(false)
    }

    const handleSubmit = async (amount, rakebackType, timeStamp) => { 
        const id = `${timeStamp.getFullYear(timeStamp)}${formatMonth(timeStamp)}${formatDay(timeStamp)}${formatHour(timeStamp)}${formatMinute(timeStamp)}`

        const newRakebackEntry = {
            rakebackId: id,
            heroName: heroName,
            rakebackValue: amount,
            redeemDate: timeStamp,
            rakebackType: rakebackType
        }

        await axios.post(url, newRakebackEntry)
        console.log(`%c Added Rakeback Entry: #${newRakebackEntry.rakebackId}`, "color: green")
        setModalContent(`Added Rakeback Entry: #${newRakebackEntry.rakebackId}`)
        openModal()
    }

    return (
        <div>
            <h2>Rakeback Manager</h2>
            <hr />
            <p>Add entries for redeemed Pokerstars boni or earned cash rewards (1000 Stars Coins = 10 USD).</p>
            <RakebackManagerForm handleSubmit={handleSubmit} />
            <ImportConfirmationModal
                confirmationModalIsOpen={confirmationModalIsOpen}
                closeModal={closeModal}
                modalContent={modalContent}
            />
            <hr />
            {!data.length && <p>No rakeback information yet.</p>}
            {data.length &&
                <RakebackManagerTable data={data} />
            }           
        </div>
    )
}

export default RakebackManager