import React from "react"
import { array, object, number, oneOfType} from "prop-types"

export const OverviewTable = ({allTournamentsAmount, filteredTournaments, rakebackData}) => {
    const count = filteredTournaments.length
    const tournamentRatio = count / allTournamentsAmount
    let buyIn = 0
    let rake = 0
    let winnings = 0
    let bounties = 0
    let rakeback = 0
    
    Object.values(filteredTournaments).forEach(element => {
        buyIn = parseFloat((element.buyIn + buyIn).toFixed(2))
        rake = parseFloat((element.rake + rake).toFixed(2))
        winnings = parseFloat((element.playerPrizeMoney + winnings).toFixed(2))
        bounties = parseFloat((element.bounties + bounties).toFixed(2))
    })

    rakebackData.forEach(element => {
        rakeback = parseFloat(((element.rakebackValue + rakeback)).toFixed(2))
    })

    const totalBuyIn = (parseFloat(buyIn) + parseFloat(rake)).toFixed(2)
    const profit = parseFloat(winnings - totalBuyIn).toFixed(2)
    const averageProfit = parseFloat(profit / count).toFixed(2)
    const roi = parseFloat(profit / totalBuyIn * 100).toFixed(2)
    const averageStake = parseFloat(totalBuyIn/count).toFixed(2)
    const totalProfit = (parseFloat(profit) + parseFloat(bounties) + parseFloat(rakeback)).toFixed(2)
    const rakebackPercent = parseFloat((rakeback / rake * 100)*tournamentRatio).toFixed(2)
    const totalRakeback = parseFloat(rakeback * tournamentRatio).toFixed(2)

    return (
        <div className="results_table no_scroll">
            <table >
                <thead>
                    <tr>
                        <th>Count</th>
                        <th>Avg. profit</th>
                        <th>Avg. Stake*</th>
                        <th>Avg. ROI</th>
                        <th>Total Buy-In</th>
                        <th>Total Rake</th>
                        <th>Winnings</th>
                        <th>Rakeback</th>
                        <th>Total Bounties</th>
                        <th>Total Profit</th>                       
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{count}</td>
                        <td>{averageProfit} USD</td>
                        <td>{averageStake} USD</td>
                        <td>{roi}%</td>
                        <td>{totalBuyIn} USD</td>
                        <td>{rake} USD</td>
                        <td>{profit} USD</td>
                        <td>{totalRakeback} USD ({rakebackPercent}%)</td>
                        <td>{bounties} USD</td>
                        <td>{totalProfit} USD</td>
                    </tr>
                </tbody>
            </table>
            <sub>* incl. Rake</sub>
        </div>
    )
}

OverviewTable.propTypes = {
    allTournamentsAmount: number,
    filteredTournaments: oneOfType([object, array]),
    rakebackData: array
}