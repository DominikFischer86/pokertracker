import React from "react"
import PropTypes from "prop-types"

export const OverviewTable = ({filteredTournaments}) => {
    const count = filteredTournaments.length
    let buyIn = 0
    let rake = 0
    let winnings = 0
    let bounties = 0

    Object.values(filteredTournaments).forEach((element) => {
        buyIn = parseFloat((element.buyIn + buyIn).toFixed(2))
        rake = parseFloat((element.rake + rake).toFixed(2))
        winnings = parseFloat((element.playerPrizeMoney + winnings).toFixed(2))
        bounties = parseFloat((element.bounties + bounties).toFixed(2))
    })

    const totalBuyIn = (parseFloat(buyIn) + parseFloat(rake)).toFixed(2)
    const profit = parseFloat(winnings - totalBuyIn).toFixed(2)
    const averageProfit = parseFloat(profit / count).toFixed(2)
    const roi = parseFloat(profit / totalBuyIn * 100).toFixed(2)
    const averageStake = parseFloat(totalBuyIn/count).toFixed(2)

    return (
        <div className="results_table no_scroll">
            <table >
                <thead>
                    <tr>
                        <th>Count</th>
                        <th>Average profit</th>
                        <th>Average Stake (+Rake)</th>
                        <th>Average ROI</th>
                        <th>Total Buy-In</th>
                        <th>Total Rake</th>
                        <th>Total Profit</th>
                        <th>Total Bounties</th>                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{count}</td>
                        <td>{averageProfit}$</td>
                        <td>{averageStake}$</td>
                        <td>{roi}%</td>
                        <td>{totalBuyIn}$</td>
                        <td>{rake}$</td>
                        <td>{profit}$</td>
                        <td>{bounties}$</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

OverviewTable.propTypes = {
    filteredTournaments: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
}