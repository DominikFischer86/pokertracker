export const hourKeys = () => {
    let keys = []
    for(let i = 0; i <= 23; i++){
        keys.push(i)
    }
    return keys
}

export const dayKeys = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export const data = (tournaments, toggleDateResults) => {
    let dataArray = []
    let keyArray = toggleDateResults ? hourKeys() : dayKeys

    if(toggleDateResults) {
      keyArray.forEach((key, index) => {
        let counter = 0
        tournaments.map(tournament => {
            let startTime = parseFloat(tournament.startTime.split(":")[0])
            if (startTime === key) return dataArray[index] = {x: key.toString(), [key]: 1 + counter++, color: `hsl(${360-15*key}, 100%, 50%)`}
            return dataArray[index] = {x: key.toString(), [key]: counter, color: `hsl(${360-15*key}, 100%, 50%)`}
        })
      })
    } else {
      keyArray.forEach((key, index) => {
        let counter = 0
        tournaments.map(tournament => {
            const newDate = new Date(tournament.timeStamp)
            const startDay = newDate.getDay()
            if (startDay === index) return dataArray[index] = {x: key.toString(), [key]: 1 + counter++, color: `hsl(${360-51*index}, 100%, 50%)`}
            return dataArray[index] = {x: key.toString(), [key]: counter, color: `hsl(${360-51*index}, 100%, 50%)`}
        })
      })
    }
    return dataArray
}