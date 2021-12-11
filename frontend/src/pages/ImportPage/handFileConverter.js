export const handFileConverter = (file, hero) => {

    const tournamentId = file.split("Tournament #")[1].split(", ")[0]
    let finalBounty = 0
    const handsFromFileArray = file.split("PokerStars ").slice(1)

    const singleHand = handsFromFileArray.map(hand => {
        let handMap = []
        const handSplit = hand.split("\n")
        const handLength = handSplit.length
        const handId = handSplit[0].split("Hand #")[1].split(": ")[0]
        const isBounty = (handSplit[0].split(" USD")[0].split(", ")[1].split("$").length - 1) > 2
        const level = handSplit[0].split("Level ")[1].split(" - ")[0]
        const handDate = handSplit[0].split(" - ")[2].split(" ")[0]
        const handTime = handSplit[0].split(" - ")[2].split(" ")[1] + " " + handSplit[0].split(" - ")[2].split(" ")[2]

        // determine blinds and antes
        const smallBlindAmount = hand.split("posts small blind ")[1]?.split("\r")[0]
        const isSmallBlindPlayerPosition = hand.split(": posts small blind ")[0].split("\r\n").length
        let isSmallBlindPlayer = hand.split(": posts small blind ")[0].split("\r\n")[isSmallBlindPlayerPosition-1]
        if (isSmallBlindPlayer.includes("KeinK")) isSmallBlindPlayer = hero
        
        const bigBlindAmount = hand.split("posts big blind ")[1]?.split("\r")[0]
        const isBigBlindPlayerPosition = hand.split(": posts big blind ")[0].split("\r\n").length
        let isBigBlindPlayer = hand.split(": posts big blind ")[0].split("\r\n")[isBigBlindPlayerPosition-1]
        if (isBigBlindPlayer.includes("KeinK")) isBigBlindPlayer = hero

        const anteAmount = hand.split("posts the ante ")[1]?.split("\r")[0]
        
        // determine hand meta
        const handMetaMap = {
            id: handId,
            level,
            smallBlind: smallBlindAmount,
            bigBlind: bigBlindAmount,
            date: handDate,
            time: handTime
        }

        // Determine initial seat distribution
        const maxSeats = handSplit[1].split("-max")[0].split(" ")[3]
        const seats = handSplit.splice(2, maxSeats)
        let seatsMap = {}
        for (let i = 1; i <= maxSeats; i++){
            seatsMap = {
                ...seatsMap,
                [`seat_${i}`]: {}
            }
        }
        seats.map(seat => {            
            const seatId = seat.split(":")[0].replace(" ", "_").toLowerCase()
            const isValidSeat = seat.split(":")[0]?.includes("Seat")
            const isOutOfHand = seat.split(":")[1]?.includes("out of hand")
            if (!isValidSeat) return null
            let seatedPlayerName = seat?.split(": ")[1].split(" (")[0]
            if (seatedPlayerName.includes("KeinK")) seatedPlayerName = hero
            const seatedPlayerStack = seat?.split(" (")[1].split(" in")[0]
            const seatedPlayerBounty = isBounty && !isOutOfHand ? seat?.split(", $")[1].split(" bounty")[0] : 0
            const isSittingOut = seat.includes("is sitting out")
 
            seatsMap = {
                ...seatsMap,
                [seatId]: {
                    "playerSeat": seatId,
                    "playerName": seatedPlayerName,
                    "playerStack": parseFloat(seatedPlayerStack),
                    "playerBounty": parseFloat(seatedPlayerBounty),
                    "playerSmallBlind": seatedPlayerName === isSmallBlindPlayer ? parseFloat(smallBlindAmount) : 0,
                    "playerBigBlind": seatedPlayerName === isBigBlindPlayer ? parseFloat(bigBlindAmount) : 0,
                    "playerAnte": !isOutOfHand ? parseFloat(anteAmount) : 0,
                    "playerSitOut": isSittingOut,
                    "playerOutOfHand": isOutOfHand
                }
            }
        })

        // Determine preflop action
        const preflopActionsStartPosition = hand.split("\n*** HOLE CARDS ***")[0].split("\r\n").length
        const preflopActionEndPosition = hand.split("\n*** FLOP ***")[0].split("\r\n").length
        const preflopActionEndPositionSummary = hand.split("\n*** SUMMARY ***")[0].split("\r\n").length
        const isTruePreflopActionEndPosition = preflopActionEndPosition !== handLength 
            ? preflopActionEndPosition 
            : preflopActionEndPositionSummary 

        const preflopActions = hand.split("\n").splice(
            preflopActionsStartPosition + 1, 
            isTruePreflopActionEndPosition - preflopActionsStartPosition - 1)
        
        let preflopStory = {}

        let holeCards = null
        let story = []

        preflopActions.map((action, index) => {
            if (index < 1) holeCards = action.split("[")[1]?.split("]")[0]

            let activePlayerName = action.split(":")[0]
            if (activePlayerName.includes("KeinK")) activePlayerName = hero            

            const activePlayerSeat = Object.values(seatsMap).find(seat => seat.playerName === activePlayerName)?.playerSeat

            const storyBlackList = 
                action.split(" ")[0] === "Uncalled" ||
                action.split(" ")[1] === "is" ||
                action.split(" ")[1] === "has" ||
                action.split(" ")[1] === "collected" ||
                action.split(": ")[1]?.split(" ")[0] === undefined
            
            console.log("Up: " + activePlayerName)

            if (!storyBlackList){
                const isRaise = action.split(": ")[1]?.split(" ")[0] === "raises"
                const isCall = action.split(": ")[1]?.split(" ")[0] === "calls"
                // console.log(action, index, handId)
                console.log("Down: " + activePlayerName)

                story.push([
                    activePlayerName,
                    activePlayerSeat,
                    action.split(": ")[1]?.split(" ")[0],
                    isRaise 
                        ? parseFloat(action.split("to ")[1]) 
                        : (isCall 
                            ? parseFloat(action.split("calls ")[1])
                            : 0
                        ),
                    (isRaise || isCall ) && action.includes("all-in") ? "All-In" : ""
                ])
            }
       
            
            if (!activePlayerSeat) return
            preflopStory = {
                ...preflopStory,
                "holeCards": holeCards,
                story
            }
        })

        console.log(preflopStory)     
    })

    // Find amount of total tournament hands

    // filter in tournament meta (buyIn, rake, bounty, earnedBounty)

    // Put all hands in single arrays

    // Loop through all arrays
        // filter in handMeta (level, date, time)
        // filter in all seats (playerName, stack, sb bool, bb bool, ante bool)
        // put preflop, flop, turn, river, showdown into single array
            // loop through each with seat_x (board or cards if not null, action [raises/folds/calls/checks], betSequence [60, 120, 1500])
        // showdown with all seats left (cards, hand in words, collected from pot)
    
   // console.log(handsFromFileArray)
}