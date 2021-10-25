import { translateCountry } from "./helpers"
import { formatMonth, formatDay, formatHour, formatMinute } from "./helpers"

export const tournamentFileConverter = (file, hero) => {
    const PLACEMENT_START = 6 
    const splitText = file.split("\n")
    if (!splitText[0].includes("PokerStars") || splitText[0].includes("Hand")) return {failId: 1, type: "Invalid format"}
    
    const tournamentId = (splitText[0].split(" ")[2]).split(/\D/)[1]   

    if (splitText[1].includes("Freeroll")) return {failId: tournamentId, type: "Freeroll"}
    if (splitText[1].includes("Satellite")) return {failId: tournamentId, type: "Satellite"}
    
    const rebuyTaken = (splitText[splitText.length - 3]).length > 10
    let rebuys = 0
    
    if (rebuyTaken) rebuys = parseFloat(splitText[splitText.length - 3].split(" ")[2])
    const buyIn = parseFloat(splitText[1].split("$")[1])
    const rake = parseFloat(splitText[1].split("$")[2])
    const playerAmount = parseFloat(splitText[2].split(" ")[0])
    const prizePool = parseFloat(splitText[3].split("$")[1])

    // Format date and adjust from ET to CET if applicable
    let timeZoneOffset = 0
    const startDateString = splitText[4].split(" ")[2]
    const startTimeString = splitText[4].split(" ")[3]
    const startDateYear = startDateString.split("/")
    const startDateTime = startTimeString.split(":")
    const timeZone = splitText[4].split(" ")[4]
    const year = startDateYear[0]
    const month = parseFloat(startDateYear[1]) -1
    const day = startDateYear[2]
    timeZone !== "CET" ? timeZoneOffset = 6 : timeZoneOffset = 0
    const hour = parseFloat(startDateTime[0]) + timeZoneOffset
    const minute = startDateTime[1]
    const timeStamp = new Date(year, month, day, hour, minute)    
    const startDate = `${timeStamp.getFullYear(timeStamp)}/${formatMonth(timeStamp)}/${formatDay(timeStamp)}`
    const startTime = `${formatHour(timeStamp)}:${formatMinute(timeStamp)}`

    const placementsList = (splitText.slice(PLACEMENT_START, playerAmount + PLACEMENT_START))
    const placements = placementsList.map(
        listItem => {
            const cleanListItem = listItem.split(" ")
            const playerPlace = parseFloat(cleanListItem[2])
            const playerName = ((listItem.split(" (")[0]).split(":")[1])?.trim()
            const playerCountry = listItem.split(/\(([^)]+)\)/)[1]
            const translatedCountry = translateCountry(playerCountry)
            const prizeMoney = parseFloat((listItem.split(/\)..\$/g)[1])?.split(" ")[0]) || 0
            // Rebuys
            
            const placementMap = [
                [ "finishPosition", playerPlace ],
                [ "playerName", playerName ],
                [ "playerCountry", !translatedCountry ? playerCountry : translatedCountry ],
                [ "prizeMoney", prizeMoney]
            ]

            return Object.fromEntries(placementMap)
        })

    const bounties = 0
    const playerPrizeMoney = placements.find(
        element => {
            let players = element.playerName
            if (rebuyTaken) players = element.playerName.split(" [")[0]
            const playerResult = players === hero
            return playerResult
        }
    )

    const tournamentMap = [
        [ "tournamentId", tournamentId ],
        [ "buyIn", buyIn ],
        [ "rebuys", rebuys],
        [ "rake", rake ], 
        [ "playerAmount", playerAmount ], 
        [ "prizePool", prizePool ],
        [ "timeStamp", timeStamp ],
        [ "startDate", startDate ],
        [ "startTime", startTime ],
        [ "finalPosition", playerPrizeMoney?.finishPosition ],
        [ "playerPrizeMoney", playerPrizeMoney?.prizeMoney],
        [ "bounties", bounties ],
        [ "placements", placements ]
    ]
    
    return Object.fromEntries(tournamentMap)
}