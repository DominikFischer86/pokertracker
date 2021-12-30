import { countries } from "../../locales/countries"

export const formFields = [
    ["tournamentId", "Tournament Id", "Only digits"],
    ["buyIn", "Buy-In", "in $$.$$"],
    ["rake", "Rake", "in $$.$$"],
    ["rebuys", "Rebuys", "in $$.$$"],
    ["playerAmount", "Players", "max. Players"],
    ["prizePool", "Prize Pool", "in $$.$$"],
    ["startDate", "Start Date", "in JJJJ/MM/DD"],
    ["startTime", "Start Time", "in HH:MM:SS"],
    ["finalPosition", "Final Position", "Your placement"],
    ["playerPrizeMoney", "Player Prize money", "in $$.$$"],
    ["bounties", "Bounties", "in $$.$$"]
]

export const placementFormFields = [
    ["playerName", "Player Name", "Enter name"],
    ["playerCountry", "Player Country", "Enter country"],
    ["playerMoney", "Prize Money", "in $$.$$"]
]

const idValue = "[0-9]/g"
const moneyValue = /([0-9]*)\.([0-9]{1,2})/
const amountValue = /[0-9][^.]/
const dateValue = /[0-9]{4}\/[0-9]{2}\/[0-9]{2}/
const timeValue = /[0-9]{2}:[0-9]{2}:[0-9]{2}/


export const validationRegEx = [
    idValue, moneyValue, moneyValue, amountValue, moneyValue, dateValue, timeValue, idValue, moneyValue
]

export const translateCountry = country => {
    const list = countries.find(element => {
         if(element.de === country) return element.en
    })
    if (!list){
        return false
    }
    if (list.de === country) return list.en
}

export const formatMonth = timeStamp => {
    let month = timeStamp.getMonth() + 1
    return month < 10 ? '0' + month : "" + month
}
export const formatDay = timeStamp => {
    let day = timeStamp.getDate()
    return day < 10 ? '0' + day : "" + day
}
export const formatHour = timeStamp => {
    let hour = timeStamp.getHours()
    return hour < 10 ? '0' + hour : "" + hour
}

export const formatMinute = timeStamp => {
    let minute = timeStamp.getMinutes()
    return minute < 10 ? '0' + minute : "" + minute
}

export const formatSecond = timeStamp => {
    let second = timeStamp.getSeconds()
    return second < 10 ? '0' + second : "" + second
}



export const formatPosition = (isOutOfHand, buttonPosition, availableSeats, seatId, playerPerTable) => {
    const buttonIndex = availableSeats.indexOf(buttonPosition)
    const arrayLength  = availableSeats.length
    const arrayToButtonPosition = availableSeats.slice(0, buttonIndex)
    const arrayFromButtonPosition = availableSeats.slice(buttonIndex, arrayLength)
    const sortedPositionArray = arrayFromButtonPosition.concat(arrayToButtonPosition)
   
    if (isOutOfHand) return "Out of hand"
    const finalPlayerIndex = sortedPositionArray.indexOf(seatId)

    const nineActivePlayersPositions = ["BU", "SB", "BB", "UTG", "UTG+1", "UTG+2", "LJ", "HJ", "CO"]
    const eightActivePlayersPositions = ["BU", "SB", "BB", "UTG", "UTG+1", "LJ", "HJ", "CO"]
    const sevenActivePlayersPositions = ["BU", "SB", "BB", "UTG", "LJ", "HJ", "CO"]
    const sixActivePlayersPositions = ["BU", "SB", "BB", "LJ", "HJ", "CO"]
    const fiveActivePlayersPositions = ["BU", "SB", "BB", "HJ", "CO"]
    const fourActivePlayersPositions = ["BU", "SB", "BB", "CO"]
    const threeActivePlayersPositions = ["BU", "SB", "BB"]
    const twoActivePlayersPositions = ["BU", "BB"]

    if (playerPerTable === 9) return nineActivePlayersPositions[finalPlayerIndex]
    if (playerPerTable === 8) return eightActivePlayersPositions[finalPlayerIndex]
    if (playerPerTable === 7) return sevenActivePlayersPositions[finalPlayerIndex]
    if (playerPerTable === 6) return sixActivePlayersPositions[finalPlayerIndex]
    if (playerPerTable === 5) return fiveActivePlayersPositions[finalPlayerIndex]
    if (playerPerTable === 4) return fourActivePlayersPositions[finalPlayerIndex]
    if (playerPerTable === 3) return threeActivePlayersPositions[finalPlayerIndex]
    if (playerPerTable === 2) return twoActivePlayersPositions[finalPlayerIndex]    
  }
  