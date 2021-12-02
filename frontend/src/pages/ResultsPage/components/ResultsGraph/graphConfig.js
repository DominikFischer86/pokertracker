export const data = (tournaments, rakebackData, toggleRake, toggleBounties) => {
    let netWin = 0
    let totalCash = 0
    let totalRake = 0
    let totalBounties = 0
    let totalRakeback = 0
    let filteredRakebackData = []
    let newWinningData = []
    let newRakeData = []
    let newBountyData = []
    let newRakebackData = []
    
    const orderedRakebackData = rakebackData.reduce((acc, obj) => {
        const key = obj["redeemDate"]
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push(obj)
        return acc
    }, {})

    Object.values(orderedRakebackData).forEach(element => {
        const valuePerDate = element.reduce((acc, obj) => {
            return acc + obj.rakebackValue
        }, 0)

        return filteredRakebackData.push({[element[0].redeemDate]: valuePerDate})
    })

    tournaments.forEach((element, index) => {
        let buyIn = parseFloat((element.buyIn).toFixed(2))
        let rake = parseFloat((element.rake).toFixed(2))        
        let winnings = parseFloat((element.playerPrizeMoney).toFixed(2))
        let bounties = parseFloat((element.bounties).toFixed(2))
        totalBounties = parseFloat((totalBounties + bounties).toFixed(2))
        totalRake = parseFloat((totalRake + rake).toFixed(2))
        netWin = parseFloat((winnings - (buyIn + rake)).toFixed(2)) 
        totalCash = parseFloat((netWin + totalCash).toFixed(2))
        totalRakeback = filteredRakebackData.find(entry => {
            const key = Object.keys(entry)[0]
            return key === element.startDate
        })
        if (totalRakeback && Object.keys(totalRakeback)[0] === element.startDate) console.log(index+1)
        // console.log(index+1) DEBUGGER
        // console.log(`%c BuyIn + Rake: ${rake + buyIn}`, "color : red")
        // console.log(`%c NetWins: ${netWin}`, "color : orange")
        // console.log(`%c TotalRake: ${totalRake}`, "color : blue")
        // console.log(`%c TotalWins: ${netWin}`, "color : green")
        // console.log("-------------------------------------")

        let winningsObject = { "x": (index+1), "y": totalCash}
        let rakeObject = {"x": (index+1), "y": totalRake}
        let bountyObject = {"x": (index+1), "y": totalBounties}
        let rakebackObject = {"x": (index+1), "y": totalRakeback}
        newWinningData.push(winningsObject)
        newRakeData.push(rakeObject)
        newBountyData.push(bountyObject)
        newRakebackData.push(rakebackObject)
    })

    // console.log(newRakebackData)

    const dataGraphs = [
        {
          "id": "Winnings",
          "color": "red",
          "data": newWinningData
        },
        {
            "id": "Rake",
            "color": "blue",
            "data": newRakeData
        },
        {
            "id": "Bounties",
            "color": "orange",
            "data": newBountyData
        }
    ]

    if (toggleBounties && toggleRake) return dataGraphs
    if (toggleRake) return dataGraphs.filter(element => element.id == "Winnings" || element.id == "Rake")
    if (toggleBounties) return dataGraphs.filter(element => element.id == "Winnings" || element.id == "Bounties")
    if (!toggleRake || !toggleBounties) return dataGraphs.filter(element => {return element.id == "Winnings"})
    return dataGraphs.filter(element => {return element.id == "Winnings"})
}