
export const data = (tournaments, toggleRake) => {
    let netWin = 0
    let totalCash = 0
    let totalRake = 0
    let newWinningData = []
    let newRakeData = []

    tournaments.forEach((element, index) => {
        let buyIn = parseFloat((element.buyIn).toFixed(2))
        let rake = parseFloat((element.rake).toFixed(2))        
        let winnings = parseFloat((element.playerPrizeMoney).toFixed(2))
        totalRake = parseFloat((totalRake + rake).toFixed(2))
        netWin = parseFloat((winnings - (buyIn + rake)).toFixed(2)) 
        totalCash = parseFloat((netWin + totalCash).toFixed(2))
        // console.log(index+1) DEBUGGER
        // console.log(`%c BuyIn + Rake: ${rake + buyIn}`, "color : red")
        // console.log(`%c NetWins: ${netWin}`, "color : orange")
        // console.log(`%c TotalRake: ${totalRake}`, "color : blue")
        // console.log(`%c TotalWins: ${netWin}`, "color : green")
        // console.log("-------------------------------------")

        let winningsObject = { "x": (index+1), "y": totalCash}
        let rakeObject = {"x": (index+1), "y": totalRake}
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