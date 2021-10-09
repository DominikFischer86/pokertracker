import { translateCountry } from "./helpers"

export const fileConverter = (file, player) => {
    const PLACEMENT_START = 6 
    const splitText = file.split("\n")
    if (!splitText[0].includes("PokerStars")) return {failId: 1, type: "Invalid format"}
    
    const tournamentId = (splitText[0].split(" ")[2]).split(/\D/)[1]   

    if (splitText[1].includes("Freeroll")) return {failId: tournamentId, type: "Freeroll"}
    if (splitText[1].includes("Satellite")) return {failId: tournamentId, type: "Satellite"}
    
    const buyIn = parseFloat(splitText[1].split("$")[1])
    const rake = parseFloat(splitText[1].split("$")[2])
    const playerAmount = parseFloat(splitText[2].split(" ")[0])
    const prizePool = parseFloat(splitText[3].split("$")[1])
    const startDate = splitText[4].split(" ")[2]
    const startTime = splitText[4].split(" ")[3]
    const placementsList = (splitText.slice(PLACEMENT_START, playerAmount + PLACEMENT_START))
    const placements = placementsList.map(
        listItem => {
            const cleanListItem = listItem.split(" ")
            const playerPlace = parseFloat(cleanListItem[2])
            const playerName = ((listItem.split(" (")[0]).split(":")[1])?.trim()
            const playerCountry = listItem.split(/\(([^)]+)\)/)[1]
            const translatedCountry = translateCountry(playerCountry)
            const prizeMoney = parseFloat((listItem.split(/\)..\$/g)[1])?.split(" ")[0]) || 0
            
            const placementMap = [
                [ "finishPosition", playerPlace ],
                [ "playerName", playerName ],
                [ "playerCountry", !translatedCountry ? playerCountry : translatedCountry ],
                [ "prizeMoney", prizeMoney]
            ]

            return Object.fromEntries(placementMap)
        })
    const playerPrizeMoney = placements.find(
        element => {
            const playerResult = element.playerName === player
            return playerResult
        }
    )
    
    const tournamentMap = [
        [ "tournamentId", tournamentId ],
        [ "buyIn", buyIn ], 
        [ "rake", rake ], 
        [ "playerAmount", playerAmount ], 
        [ "prizePool", prizePool ], 
        [ "startDate", startDate ],
        [ "startTime", startTime ],
        [ "finalPosition", playerPrizeMoney.finishPosition ],
        [ "playerPrizeMoney", playerPrizeMoney.prizeMoney],
        [ "placements", placements ]
    ]
    
    return Object.fromEntries(tournamentMap)
}