export const keys = () => {
    let keys = []
    for(let i = 0; i <= 24; i++){
        keys.push(i)
    }
    return keys
}

export const data = tournaments => {
    let dataArray = []
    let keyArray = keys()
    
    keyArray.forEach((key, index) => {
        let counter = 0
        tournaments.map(tournament => {
            let startTime = parseFloat(tournament.startTime.split(":")[0])
            if (startTime === key) return dataArray[index] = {hour: key, amount: 1 + counter++}
            return dataArray[index] = {hour: key, amount: counter}
        })
    })

    return dataArray
}

export const testData = [
    {
      "country": "0",
      "hot dog": 103,
      "hot dogColor": "hsl(225, 70%, 50%)"
    },
    {
      "country": "1",
      "hot dog": 29,
      "hot dogColor": "hsl(304, 70%, 50%)"
    },
    {
      "country": "2",
      "hot dog": 135,
      "hot dogColor": "hsl(154, 70%, 50%)"
    },
    {
      "country": "3",
      "hot dog": 178,
      "hot dogColor": "hsl(259, 70%, 50%)"
    },
    {
      "country": "4",
      "hot dog": 68,
      "hot dogColor": "hsl(99, 70%, 50%)"
    },
    {
      "country": "5",
      "hot dog": 145,
      "hot dogColor": "hsl(306, 70%, 50%)"
    },
    {
      "country": "6",
      "hot dog": 183,
      "hot dogColor": "hsl(181, 70%, 50%)"
    }
  ]