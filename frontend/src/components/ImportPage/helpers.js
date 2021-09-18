export const formFields = [
    ["tournamentId", "Tournament Id", "Only digits"],
    ["buyIn", "Buy-In", "in $$.$$"],
    ["rake", "Rake", "in $$.$$"],
    ["playerAmount", "Players", "max. Players"],
    ["prizePool", "Prize Pool", "in $$.$$"],
    ["startDate", "Start Date", "in JJJJ/MM/DD"],
    ["startTime", "Start Time", "in HH:MM:SS"],
    ["finalPosition", "Final Position", "Your placement"],
    ["prizeMoney", "Prize money", "in $$.$$"]
]

export const placementFormFields = [
    ["playerName", "Player Name", "Enter name"],
    ["playerCountry", "Player Country", "Enter country"],
    ["playerPrizeMoney", "Prize Money", "in $$.$$"]
]

const idValue = "[0-9]/g"
const moneyValue = /([0-9]*)\.([0-9]{1,2})/
const amountValue = /[0-9][^.]/
const dateValue = /[0-9]{4}\/[0-9]{2}\/[0-9]{2}/
const timeValue = /[0-9]{2}:[0-9]{2}:[0-9]{2}/


export const validationRegEx = [
    idValue, moneyValue, moneyValue, amountValue, moneyValue, dateValue, timeValue, idValue, moneyValue
]