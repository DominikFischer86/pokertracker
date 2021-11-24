export const itmCalc = tournaments => {
    const sngOnly = tournaments.filter(tournament => {
        return tournament.placements.length < 46 && tournament.placements.length > 4
    })
    console.log(sngOnly)
    return "Stuff"
}