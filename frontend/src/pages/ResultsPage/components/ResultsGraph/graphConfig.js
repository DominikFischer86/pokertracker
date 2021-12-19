export const data = (tournaments, tournamentRatio, rakebackData, toggleBounties, toggleRakeback) => {
    let netWin = 0
    let totalCash = 0
    let totalRake = 0
    let totalBounties = 0
    let totalRakeback = 0
    let rakebackFactor = 0
    let newWinningData = []
    let newRakeData = []
    let newBountyData = []
    let newRakebackData = []
    
    const orderedRakebackData = rakebackData?.reduce((acc, obj) => {
        const key = obj["redeemDate"]
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push(obj)
        return acc
    }, {})

    if (orderedRakebackData) Object.values(orderedRakebackData).forEach(element => {
        const valuePerDate = element.reduce((acc, obj) => {
            return acc + obj.rakebackValue
        }, 0)
        totalRakeback = totalRakeback + valuePerDate
    })

    const allRake = tournaments.reduce((acc, obj) => {
        return acc + obj.rake
    }, 0)

    rakebackFactor = totalRakeback / allRake

    tournaments.forEach((element, index) => {
        let buyIn = parseFloat((element.buyIn).toFixed(2))
        let rake = parseFloat((element.rake).toFixed(2))        
        let winnings = parseFloat((element.playerPrizeMoney).toFixed(2))
        let bounties = parseFloat((element.bounties).toFixed(2))

        totalBounties = parseFloat((totalBounties + bounties).toFixed(2))
        totalRake = parseFloat((totalRake + rake).toFixed(2))
        netWin = parseFloat((winnings - (buyIn + rake)).toFixed(2)) 
        totalCash = parseFloat((netWin + totalCash).toFixed(2))
        totalRakeback = parseFloat(((totalRake*rakebackFactor)*tournamentRatio).toFixed(2))

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

    const dataGraphs = [
        {
          "id": "Winnings",
          "color": "red",
          "data": newWinningData
        },
        {
            "id": "Bounties",
            "color": "orange",
            "data": newBountyData
        },
        {
            "id": "Rakeback",
            "color": "green",
            "data": newRakebackData
        }
    ]

    if (toggleBounties && toggleRakeback) return dataGraphs
    if (toggleBounties) return dataGraphs.filter(element => element.id == "Winnings" || element.id == "Bounties")
    if (toggleRakeback) return dataGraphs.filter(element => element.id == "Winnings" || element.id == "Rakeback")
    if (!toggleBounties || !toggleRakeback ) return dataGraphs.filter(element => {return element.id == "Winnings"})
    return dataGraphs.filter(element => element.id == "Winnings")
}
