import React from "react"
import { oneOfType, object, array, func } from "prop-types"
import { FaTrashAlt } from "react-icons/fa"

const RakebackManagerTable = ({data, onDelete}) => {
    if (!data) return null
    return (
        <div className="results_table">
            <table >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Redeemer</th>
                        <th>Redeem Date</th>
                        <th>Rakeback Type</th>
                        <th>Rakeback Amount</th>
                        <th>Actions</th>                
                    </tr>
                </thead>
                <tbody>
                    {data.map(entry => {
                        
                        return (
                        <tr key={entry.rakebackId}>
                           <td>{entry.rakebackId}</td>
                           <td>{entry.heroName}</td>
                           <td>{entry.redeemDate}</td>
                           <td>{entry.rakebackType}</td>
                           <td>{entry.rakebackValue} USD</td>
                           <td>
                           <FaTrashAlt 
                                onClick={() => onDelete(entry.rakebackId)}
                                className="trash-icon"
                                style={{color: "red"}}
                            />
                           </td>
                        </tr>
                       )
                    })
                    }                   
                </tbody>
            </table>
        </div>
    )
}

RakebackManagerTable.propTypes = {
    data: oneOfType([
        object,
        array
    ]),
    onDelete: func
}

export default RakebackManagerTable