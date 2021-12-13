export const handFileConverter = (file, hero) => {

    const tournamentId = file.split("Tournament #")[1].split(", ")[0]
    let finalBounty = 0
    const handsFromFileArray = file.split("PokerStars ").slice(1)

    const singleHand = handsFromFileArray.map(hand => {
        let handMap = {}
        const parseHand = JSON.stringify(hand).replace(/(KeinK).{1,3}(nich)/g, "KeinKönich")
        const changedHand = JSON.parse(parseHand)
        const handSplit = changedHand.split("\n")
        const handLength = handSplit.length
        const handId = handSplit[0].split("Hand #")[1].split(": ")[0]
        const isBounty = (handSplit[0].split(" USD")[0].split(", ")[1].split("$").length - 1) > 2
        const level = handSplit[0].split("Level ")[1].split(" (")[0]
        const handDate = handSplit[0].split(" - ")[2].split(" ")[0]
        const handTime = handSplit[0].split(" - ")[2].split(" ")[1] + " " + handSplit[0].split(" - ")[2].split(" ")[2]

        // determine blinds and antes
        const smallBlindAmount = changedHand.split("posts small blind ")[1]?.split("\r")[0]
        const isSmallBlindPlayerPosition = changedHand.split(": posts small blind ")[0].split("\r\n").length
        let isSmallBlindPlayer = changedHand.split(": posts small blind ")[0].split("\r\n")[isSmallBlindPlayerPosition-1]
        if (isSmallBlindPlayer.includes(hero)) isSmallBlindPlayer = hero
        
        const bigBlindAmount = changedHand.split("posts big blind ")[1]?.split("\r")[0]
        const isBigBlindPlayerPosition = changedHand.split(": posts big blind ")[0].split("\r\n").length
        let isBigBlindPlayer = changedHand.split(": posts big blind ")[0].split("\r\n")[isBigBlindPlayerPosition-1]
        if (isBigBlindPlayer.includes(hero)) isBigBlindPlayer = hero

        const anteAmount = changedHand.split("posts the ante ")[1]?.split("\r")[0]
        
        // determine hand meta
        const handMetaMap = {
            tournamentId,
            handId,
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
            if (seatedPlayerName.includes("KeinK")) seatedPlayerName = "KeinKönich"
            const seatedPlayerStack = seat?.split(" (")[1]?.split(" in")[0]
            const seatedPlayerBounty = isBounty && !isOutOfHand ? seat?.split(", $")[1]?.split(" bounty")[0] : 0
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
        const preflopActionsStartPosition = changedHand.split("\n*** HOLE CARDS ***")[0].split("\r\n").length
        const preflopActionEndPosition = changedHand.split("\n*** FLOP ***")[0].split("\r\n").length
        const preflopActionEndPositionSummary = changedHand.split("\n*** SUMMARY ***")[0].split("\r\n").length
        const isTruePreflopActionEndPosition = preflopActionEndPosition !== handLength 
            ? preflopActionEndPosition 
            : preflopActionEndPositionSummary 

        const preflopActions = changedHand.split("\n").splice(
            preflopActionsStartPosition + 1, 
            isTruePreflopActionEndPosition - preflopActionsStartPosition - 1)
        
        let preflopStory = null
        let flopStory = null
        let turnStory = null
        let riverStory = null
        let summary = null

        let holeCards = null
        let board = null
        let story = []

        preflopActions.map((action, index) => {
            if (index < 1) holeCards = action.split("[")[1]?.split("]")[0]
             let activePlayerName = action.split(":")[0]

            const activePlayerSeat = Object.values(seatsMap).find(seat => seat.playerName === activePlayerName)?.playerSeat

            const storyBlackList = 
                action.split(" ")[0] === "Uncalled" ||
                action.split(": ")[1]?.split(" ")[0] === "to" ||
                action.split(" ")[1]?.split(" show")[0] === "doesn't" ||
                action.split(": ")[1]?.split(" ")[0] === undefined
                
            if (!storyBlackList){
                const isRaise = action.split(": ")[1]?.split(" ")[0] === "raises"
                const isCall = action.split(": ")[1]?.split(" ")[0] === "calls"

                story.push([
                    activePlayerName,
                    activePlayerSeat,
                    action.split(": ")[1].split(" ")[0],
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

        story = []

        // determine flop action
        const flopActionStartPosition = changedHand.split("\n*** FLOP ***")[0].split("\r\n").length
        const flopActionEndPosition = changedHand.split("\n*** TURN ***")[0].split("\r\n").length
        const flopActionEndPositionSummary = changedHand.split("\n*** SUMMARY ***")[0].split("\r\n").length
        const isTrueFlopActionEndPosition = flopActionEndPosition !== handLength 
            ? flopActionEndPosition 
            : flopActionEndPositionSummary

        
        const flopActions = changedHand.split("\n").splice(
            flopActionStartPosition, 
            isTrueFlopActionEndPosition - flopActionStartPosition)
        
        if (flopActions.length > 0) {
            flopActions.map((action,index) => {
                if (index < 1 ) board = action.split("[")[1]?.split("]")[0]
                let activePlayerName = action.split(":")[0]
                const activePlayerSeat = Object.values(seatsMap).find(seat => seat.playerName === activePlayerName)?.playerSeat

                const storyBlackList = action.split(": ")[1]?.split(" ")[0] === undefined

                if (!storyBlackList){
                    const isRaise = action.split(": ")[1]?.split(" ")[0] === "raises"
                    const isBet = action.split(": ")[1]?.split(" ")[0] === "bets"
                    const isCall = action.split(": ")[1]?.split(" ")[0] === "calls"

                    story.push([
                        activePlayerName,
                        activePlayerSeat,
                        action.split(": ")[1].split(" ")[0],
                        isRaise 
                            ? parseFloat(action.split("to ")[1]) 
                            : (isCall 
                                ? parseFloat(action.split("calls ")[1])
                                : (isBet 
                                    ? parseFloat(action.split("bets ")[1])
                                    : 0    
                                )
                            ),
                        (isRaise || isCall ) && action.includes("all-in") ? "All-In" : ""
                    ])
                }

                if (!activePlayerSeat) return
                flopStory = {
                    ...flopStory,
                    "board": board,
                    story
                }
            })
        }

        story = []

        // determine turn action
        const turnActionStartPosition = changedHand.split("\n*** TURN ***")[0].split("\r\n").length
        const turnActionEndPosition = changedHand.split("\n*** RIVER ***")[0].split("\r\n").length
        const turnActionEndPositionSummary = changedHand.split("\n*** SUMMARY ***")[0].split("\r\n").length
        const isTrueTurnActionEndPosition = turnActionEndPosition !== handLength 
            ? turnActionEndPosition 
            : turnActionEndPositionSummary

        
        const turnActions = changedHand.split("\n").splice(
            turnActionStartPosition, 
            isTrueTurnActionEndPosition - turnActionStartPosition)
        
        if (turnActions.length > 0) {
            turnActions.map((action,index) => {
                const leftBracket = /\[/gi
                const rightBracket = /\]/gi
                if (index < 1 ) board = action.split("*** ")[2].split("\r")[0].replace(leftBracket, "").replace(rightBracket, "")
                let activePlayerName = action.split(":")[0]
                const activePlayerSeat = Object.values(seatsMap).find(seat => seat.playerName === activePlayerName)?.playerSeat

                const storyBlackList = 
                    action.split(" ")[1]?.split(" show")[0] === "doesn't" ||
                    action.split(": ")[1]?.split(" ")[0] === undefined

                if (!storyBlackList){
                    const isRaise = action.split(": ")[1]?.split(" ")[0] === "raises"
                    const isBet = action.split(": ")[1]?.split(" ")[0] === "bets"
                    const isCall = action.split(": ")[1]?.split(" ")[0] === "calls"

                    story.push([
                        activePlayerName,
                        activePlayerSeat,
                        action.split(": ")[1].split(" ")[0],
                        isRaise 
                            ? parseFloat(action.split("to ")[1]) 
                            : (isCall 
                                ? parseFloat(action.split("calls ")[1])
                                : (isBet 
                                    ? parseFloat(action.split("bets ")[1])
                                    : 0    
                                )
                            ),
                        (isRaise || isCall ) && action.includes("all-in") ? "All-In" : ""
                    ])
                }

                if (!activePlayerSeat) return
                turnStory = {
                    ...turnStory,
                    "board": board,
                    story
                }
            })
        }

        story = []

        // determine river action
        const riverActionStartPosition = changedHand.split("\n*** RIVER ***")[0].split("\r\n").length
        const riverActionEndPosition = changedHand.split("\n*** SUMMARY ***")[0].split("\r\n").length
        const riverActionEndPositionSummary = changedHand.split("\n*** SUMMARY ***")[0].split("\r\n").length
        const isTrueRiverActionEndPosition = riverActionEndPosition !== handLength 
            ? riverActionEndPosition 
            : riverActionEndPositionSummary

        
        const riverActions = changedHand.split("\n").splice(
            riverActionStartPosition, 
            isTrueRiverActionEndPosition - riverActionStartPosition)
        
        if (riverActions.length > 0) {
            riverActions.map((action,index) => {
                const leftBracket = /\[/gi
                const rightBracket = /\]/gi
                if (index < 1 ) board = action.split("*** ")[2].split("\r")[0].replace(leftBracket, "").replace(rightBracket, "")
                let activePlayerName = action.split(":")[0]
                const activePlayerSeat = Object.values(seatsMap).find(seat => seat.playerName === activePlayerName)?.playerSeat

                const storyBlackList = 
                    action.split(" ")[1]?.split(" show")[0] === "doesn't" ||
                    action.split(": ")[1]?.split(" ")[0] === "shows" ||
                    action.split(": ")[1]?.split(" ")[0] === "mucks" ||
                    action.split(": ")[1]?.split(" ")[0] === undefined

                if (!storyBlackList){
                    const isRaise = action.split(": ")[1]?.split(" ")[0] === "raises"
                    const isBet = action.split(": ")[1]?.split(" ")[0] === "bets"
                    const isCall = action.split(": ")[1]?.split(" ")[0] === "calls"

                    story.push([
                        activePlayerName,
                        activePlayerSeat,
                        action.split(": ")[1].split(" ")[0],
                        isRaise 
                            ? parseFloat(action.split("to ")[1]) 
                            : (isCall 
                                ? parseFloat(action.split("calls ")[1])
                                : (isBet 
                                    ? parseFloat(action.split("bets ")[1])
                                    : 0    
                                )
                            ),
                        (isRaise || isCall ) && action.includes("all-in") ? "All-In" : ""
                    ])
                }

                if (!activePlayerSeat) return
                riverStory = {
                    ...riverStory,
                    "board": board,
                    story: story.length > 0 ? story : null
                }
            })
        }

        story = []

        // determine hand summary
        const summaryStartPosition = changedHand.split("\n*** SUMMARY ***")[0].split("\r\n").length
        const summaryActions = board
            ? changedHand.split("\n").splice(summaryStartPosition + 3, 9)
            : changedHand.split("\n").splice(summaryStartPosition + 2, 9)

        summaryActions.map(action => {
            const isButton = action.includes("button")
            const isSmallBlind = action.includes("small blind")
            if (isSmallBlind) action = action.replace("small blind", "small_blind")  

            const isBigBlind = action.includes("big blind")
            if (isBigBlind) action = action.replace("big blind", "big_blind")

            const isCollected = action.includes("collected")
            const isShowAndWon = action.includes("showed") && action.includes("won")
            const isShowAndLost = action.includes("showed") && action.includes("lost")
            const isMucked = action.includes("mucked")

            const isDifferentFormat = isButton || isSmallBlind || isBigBlind
            
            //Find Username with spaces:
            const playerNameWithSpacesFromSeats = Object.values(seatsMap).find(seat => seat.playerName?.includes(" "))?.playerName
            const spacesInName = playerNameWithSpacesFromSeats ? playerNameWithSpacesFromSeats.split(" ").length - 1 : 0
            let activePlayerName = action.split(": ")[1]?.split(" ")[0]
            if (spacesInName > 0 && action.includes(playerNameWithSpacesFromSeats)) activePlayerName = playerNameWithSpacesFromSeats
            if (activePlayerName && isDifferentFormat) activePlayerName = action.split(": ")[1]?.split(" (")[0]
            const activePlayerSeat = Object.values(seatsMap).find(seat => seat.playerName === activePlayerName)?.playerSeat
            const storyBlackList = 
                action.includes("folded") || 
                !action.includes("Seat")
            
            if (isDifferentFormat) action = action.replace("(", "").replace(")", "")

            if (!storyBlackList) {
                if (isCollected) story.push([
                    activePlayerName,
                    activePlayerSeat,
                    isDifferentFormat 
                        ? action.split(" (")[0]?.split(activePlayerName)[1]?.split(" ")[2]
                        : action.split(" (")[0]?.split(activePlayerName)[1],
                    parseFloat(action.split("(")[1]?.split(")")[0])
                ])
                if (isShowAndWon) story.push([
                    activePlayerName,
                    activePlayerSeat,
                    // action
                    action.split(" and ")[1].split(" (")[0],
                    // pot
                    parseFloat(action.split("(")[1].split(")")[0]),
                    // hole cards
                    action.split("[")[1].split("]")[0],
                    // hand
                    action.split(") with ")[1].split("\r")[0]
                ])
                if (isShowAndLost) story.push([
                    activePlayerName,
                    activePlayerSeat,
                    // action
                    action.split(" and ")[1].split(" with")[0],
                    // pot
                    null,
                    // hole cards
                    action.split("[")[1].split("]")[0],
                    // hand
                    action.split("with ")[1].split("\r")[0]
                ])
                if (isMucked) story.push([
                    activePlayerName,
                    activePlayerSeat,
                    // action
                    isDifferentFormat ? action.split(": ")[1].split(" [")[0].split(" ")[2] : action.split(": ")[1].split(" [")[0].split(" ")[1],
                    // pot
                    null,
                    // hole cards
                    action.split("[")[1].split("]")[0]
                ])
                
            }

            if (!activePlayerSeat) return
            summary = {
                ...summary,
                "holeCards": holeCards,
                "board": board,
                story
            }
        })

        handMap = {
            "1_meta": handMetaMap,
            "2_seats": seatsMap,
            "3_preflop": preflopStory,
            "4_flop": flopStory,
            "5_turn": turnStory,
            "6_river": riverStory,
            "7_summary": summary
        }

        return handMap
    })
}