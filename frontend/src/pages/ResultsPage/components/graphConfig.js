
export const data = (tournaments, toggleRake) => {
    let winnings = 0
    let newWinningData = []
    let newRakeData = []

    tournaments.forEach((element, index) => {        
        let buyIn = parseFloat((element.buyIn * (index+1)).toFixed(2))
        let rake = parseFloat((element.rake * (index+1)).toFixed(2))
        winnings = parseFloat((element.playerPrizeMoney + winnings).toFixed(2))
        let profit = parseFloat((winnings - (buyIn + rake)).toFixed(2))
        
        let winningsObject = { "x": (index+1), "y": profit}
        let rakeObject = {"x": (index+1), "y": rake}
        newWinningData.push(winningsObject)
        newRakeData.push(rakeObject)
    })
    if (toggleRake){
        return [
            {
              "id": "Winnings",
              "color": "red",
              "data": newWinningData
            },
            {
                "id": "Rake",
                "color": "blue",
                "data": newRakeData
        }]
    } else {
        return [
            {
              "id": "Winnings",
              "color": "red",
              "data": newWinningData
            }]
    }    
}