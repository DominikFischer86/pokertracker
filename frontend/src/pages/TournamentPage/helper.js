export const translate = property => {
    return translations.map(translation => {
        return translation[property]
    })
}

const translations = [
    { buyIn: "Buy-In" },
    { rake: "Rake" },
    { rebuys: "Rebuys" },
    { prizePool: "Prize Pool" },
    { startDate: "Start Date" },
    { startTime: "Start Time" },
    { finalPosition: "Position" },
    { playerPrizeMoney: "Money won" },
    { bounties: "Bounties" }
]