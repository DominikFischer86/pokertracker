export const keys = () => {
    let keys = []
    for(let i = 1; i <= 24; i++){
        keys.push(i)
    }
    return keys
}

export const data = tournaments => {
    let dataArray = []
    // Loop through all keys
    // Loop through all tournaments
    // match key and startDate hour
    // add +1 for each match
    // return object with "keys": "amount matches" pair


    tournaments.map(tournament => dataArray.push(tournament.startTime.split(":")[0]))
    return dataArray
}