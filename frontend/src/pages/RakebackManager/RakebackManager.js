import React, { useEffect, useState, useContext } from "react"
import axios from "axios"

import { MetaContext } from "../../index"
import { formatMonth, formatDay, formatHour, formatMinute, formatSecond } from "../ImportPage/helpers"
import RakebackManagerTable from "./components/RakebackManagerTable"
import RakebackManagerForm from "./components/RakebackManagerForm"
import { ImportConfirmationModal } from "../../components/Modals/ImportConfirmationModal"

const RakebackManager = () => {
    const url = "http://localhost:3001/rakeback/"
    const { heroName, appName } = useContext(MetaContext)

    const [data, setData] = useState([])
    const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState({successMessageList: []})
    const [refetch, setRefetch] = useState(0)

    const fetchData = () => {
        try {
            axios.get(url)
               .then(res => {
                   setData(res.data)
               })
        } catch (e) {
           console.log(e)
       }
    }

    useEffect(() => {
        fetchData()
        document.title = `${appName} - Rakeback Manager`
    }, [refetch, appName])

    const openModal = () => {
        setConfirmationModalIsOpen(true)
    }

    const closeModal = () => {
        setConfirmationModalIsOpen(false)
    }

    const handleSubmit = async (amount, rakebackType, timeStamp) => {
        const idFromTime = new Date()
        const id = `${idFromTime.getFullYear(idFromTime)}${formatMonth(idFromTime)}${formatDay(idFromTime)}-${formatHour(idFromTime)}${formatMinute(idFromTime)}${formatSecond(idFromTime)}`
        const transformDate = new Date(timeStamp)
        const redeemDate = `${transformDate.getFullYear(transformDate)}/${formatMonth(transformDate)}/${formatDay(transformDate)}`
        
        const newRakebackEntry = {
            rakebackId: id,
            heroName: heroName,
            rakebackValue: amount,
            redeemTimeStamp: timeStamp,
            redeemDate: redeemDate,
            rakebackType: rakebackType
        }

        await axios.post(url, newRakebackEntry)
        console.log(`%c Added Rakeback Entry: #${newRakebackEntry.rakebackId}`, "color: green")
        setModalContent({successMessageList: [`Added Rakeback Entry: #${newRakebackEntry.rakebackId}`]})
        openModal()
        fetchData()
    }

    const handleDelete = rakebackId => {
        if (confirm(`Do you really want to remove rakeback entry #${rakebackId}`)){
            try {
                axios.delete(url + rakebackId)
                console.log(`%c Deleted Rakeback Entry: #${rakebackId}`, "color: red")
            } catch (e) {
                console.log(e)
            }
        }

        setRefetch(refetch+1)
    }

    return (
        <div>
            <h2>Rakeback Manager</h2>
            <hr />
            <p>Add entries for redeemed Pokerstars boni or earned cash rewards (1000 Stars Coins = 10 USD).</p>
            <RakebackManagerForm onSubmit={handleSubmit} />
            <ImportConfirmationModal
                confirmationModalIsOpen={confirmationModalIsOpen}
                closeModal={closeModal}
                modalContent={modalContent}
            />
            <hr />
            {!data.length && <p>No rakeback information yet.</p>}
            {data.length > 0 &&
                <RakebackManagerTable data={data} onDelete={handleDelete} />
            }           
        </div>
    )
}

export default RakebackManager