import React, { useState, useEffect} from "react"
import axios from "axios"


const PlayerPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [player, setPlayer] = useState([])
    const [allTournaments, setAllTournaments] = useState([])

    const url = "http://localhost:3001" + window.location.pathname
    const { playerCountry, playerName, playerIsHero, playerTournaments } = player

    useEffect(() => {
        try {
             axios.get(url)
                .then(res => {
                    setIsLoading(true)
                    setAllTournaments(res.data[0])
                    setPlayer(res.data[1][0])
                    setIsLoading(false)
                })
         } catch (e) {
            console.log(e)
        }
    }, [])


    const selectTournamentsList = allTournaments.filter(tournament => {
        return tournament.placements?.find(placement => placement.playerName === playerName)
    })

    console.log(selectTournamentsList)

    // (estimated)
    // unclear data tournaments (finished before hero)
    // total buy-in
    // total rake
    // total winnings
    // total profit
    // average ROI
    // average stake
    // average profit

     // (real)
    // clear data tournaments (known final position)
    // total buy-in
    // total rake
    // total winnings
    // total profit
    // average ROI
    // average stake
    // average profit

    // playing dates
    // playing times

    return (
        <div>
        {isLoading && <div>Loading user...</div>}
            {!isLoading && 
                <>
                    <h2>{playerName} ({playerCountry})</h2>
                    <p>(Tournaments played: {playerIsHero ? allTournaments.length : playerTournaments.length})</p>
                    <hr />
                </>
            }
        </div>
    )
}

export default PlayerPage