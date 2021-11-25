export const itmCalc = (sngOnly, maxPlayers, bubble) => {
    const sngList = sngOnly.reduce((acc, obj) => {
        const key = obj["finalPosition"]
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push(obj)
        return acc
    }, {})

    const itmDistribution = []
    for(let i = 1; i <= maxPlayers; i++){
        const totalTournaments = sngOnly.length
        const amountPerPlace = sngList[i]?.length

        if (!sngList[i]) itmDistribution.push({
            placement: i, 
            [i]: 0,
            totalCash: 0,
            finishedTotal: amountPerPlace || 0,
            finishedPercent: parseFloat(([amountPerPlace]/totalTournaments*100).toFixed(2)),
            isBubble: bubble === i
        })
        if (sngList[i]) itmDistribution.push({ 
            placement: i, 
            [i]: amountPerPlace,
            totalCash: parseFloat(sngList[i].reduce((acc, currentVal) => acc + currentVal.playerPrizeMoney,0).toFixed(2)),
            finishedTotal: amountPerPlace || 0,
            finishedPercent: parseFloat(([amountPerPlace]/totalTournaments*100).toFixed(2)),
            isBubble: bubble === i
        })
    }

    return itmDistribution
}