export const createUsers = (tournaments, heroName) => {
    let allPlayers = []
    let allPlayersList = []
    let tournamentsList = []
    let playerCountry = ""
    let playerName = ""

    tournaments.forEach(item => {
        const placements = item.placements            
        placements.forEach(placement => {
            return allPlayers.push(placement.playerName)
        })

        allPlayersList = [...new Set(allPlayers)]
    })
    
    const playersMap = allPlayersList.map((player, index) => {
        const allTournaments = tournaments.filter(tournament => {
            return tournament.placements.find(item => item.playerName === player)
        })

        let tournamentsIdList = []
                
        tournamentsList = [...new Set(allTournaments)]

        tournamentsList.find(tournament => {
            playerCountry = (tournament.placements.find(item => item.playerName === player)).playerCountry
            playerName = (tournament.placements.find(item => item.playerName === player)).playerName
            if (playerName === player) tournamentsIdList.push(tournament.tournamentId)
        })

        const playerMap = [
            [ "playerId", `${index+1}` ],
            [ "playerName", player ],
            [ "playerCountry", playerCountry ],
            [ "playerIsHero", player === heroName ? true : false ],
            [ "playerTournaments", tournamentsIdList ]
        ]
        
        return Object.fromEntries(playerMap)
    })

    return playersMap
}