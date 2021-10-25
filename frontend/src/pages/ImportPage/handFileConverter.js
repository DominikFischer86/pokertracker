export const handFileConverter = (file, hero) => {
    console.log(hero)
    // let HandSplitPositions = []
    const splitText = file.split("\n")
    const tournamentId = splitText[0].split("Tournament #")[1].split(",")[0]

    // Find amount of total tournament hands

    // filter in tournament meta (buyIn, rake, bounty)

    // Put all hands in single arrays

    // Loop through all arrays
        // filter in handMeta (level, date, time)
        // filter in all seats (playerName, stack, sb bool, bb bool, ante bool)
        // put preflop, flop, turn, river, showdown into single array
            // loop through each with seat_x (board or cards if not null, action [raises/folds/calls/checks], betSequence [60, 120, 1500])
        // showdown with all seats left (cards, hand in words, collected from pot)
    
    console.log(splitText)
    console.log(tournamentId)
}