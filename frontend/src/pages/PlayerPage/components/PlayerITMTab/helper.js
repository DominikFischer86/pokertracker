export const itmCalc = (tournaments, maxPlayers) => {
    const sngOnly = tournaments.filter(tournament => {
        return tournament.playerAmount <= maxPlayers
    })

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
        if (!sngList[i]) itmDistribution.push({placement: i, [i]: 0})
        if (sngList[i]) itmDistribution.push({ placement: i, [i]: sngList[i]?.length})
    }

    return itmDistribution
}