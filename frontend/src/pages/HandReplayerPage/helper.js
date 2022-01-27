export const createStory = activeHand => {
    let story = []
    story.push({holeCards: activeHand["11_preflop"].holeCards})
    activeHand["11_preflop"].story.map(tick => story.push(tick))
    if (activeHand["12_flop"]) {
        story.push({flop: activeHand["12_flop"].board})
        activeHand["12_flop"].story.map(tick => story.push(tick))
    }
    if (activeHand["13_turn"]) {
        story.push({turn: activeHand["13_turn"].board.split("\r")[0]})
        activeHand["13_turn"].story.map(tick => story.push(tick))
    }
    if (activeHand["14_river"]) {
        story.push({river: activeHand["14_river"].board.split("\r")[0]})
        activeHand["14_river"].story.map(tick => story.push(tick))
    }
    story.push({summary: activeHand["15_summary"].board.split("\r")[0]})
    activeHand["15_summary"].story.map(tick => story.push(tick))

    return story
}

export const createInitialReplayerStoryState = activeHand => {
    const allSeats = Object.keys(activeHand).filter(key => key.includes("seat"))
    const initialState = allSeats.map((seat, index) => {
        
        if (!activeHand[seat]?.playerStack) return null
        
        return ({
        ["seat_"+(index+1)]: {
            playerSeat: "seat_"+(index+1),
            playerHand: null,
            playerName: activeHand[seat]?.playerName,
            playerPosition: activeHand[seat]?.playerPosition,
            playerStack: activeHand[seat]?.playerStack,
            playerAnte: activeHand[seat]?.playerAnte,
            playerSmallBlind: activeHand[seat]?.playerSmallBlind,
            playerBigBlind: activeHand[seat]?.playerBigBlind,
            playerSitOut: activeHand[seat]?.playerSitOut,
            playerOutOfHand: activeHand[seat]?.playerOutOfHand,
            playerAction: "",
            playerState: "active",
            playerBet: 0,
            step: ""
        }
    })})

    const filteredInitialState = initialState.filter(state => state !== null)

    return filteredInitialState
}

export const createReplayerStory = (activeHand, story, heroName) => {
    let completeStory = []
    let updatedState = createInitialReplayerStoryState(activeHand)
    const seats = updatedState.map(seat => seat)
    const initialChapter = {
        playerSeat: "",
        playerName: "",
        playerHand: null,
        playerAction: "",
        playerState: "inactive",
        playerSitOut: false,
        playerOutOfHand: false,
        playerStack: 0,
        playerBet: 0,
        step: ""
    }
    
    story.map(chapter => {
        const completeChapter = {
            playerSeat: "",
            playerName: "",
            playerAction: "",
            playerState: "inactive",
            playerSitOut: false,
            playerOutOfHand: false,
            playerStack: 0,
            playerBet: 0,
            step: ""
        }

        // add and update hero hole cards

        if(Object.keys(chapter).includes("holeCards")) completeChapter.holeCards = chapter.holeCards
        if(Object.keys(chapter).includes("flop")) completeChapter.board = chapter.flop
        if(Object.keys(chapter).includes("turn")) completeChapter.board = chapter.turn
        if(Object.keys(chapter).includes("river")) completeChapter.board = chapter.river
        if(Object.keys(chapter).includes("summary")) completeChapter.board = chapter.summary

        // add actions
        if (chapter.length > 3) seats.filter(seat => {
            const seatString = (Object.keys(seat).toString())

            if (seatString === chapter[1]){
                completeChapter.playerSeat = seatString
                completeChapter.playerHand = chapter[2] === "folds" ? null : ". ,"
                completeChapter.playerAction = chapter[2]
                completeChapter.playerBet = chapter[3]
                completeChapter.playerName = chapter[0]
                completeChapter.playerState = completeChapter.playerState.length < 1 ? "active" : chapter[4]?.split("\r")[0]

                if (chapter[2] === "folds"){
                    completeChapter.playerState = "inactive"
                }
            }

            if (seatString !== chapter[1]){
                return initialChapter
            }
        })

        const source = completeChapter
        const target = updatedState.find(state => state[completeChapter.playerSeat]?.playerSeat === completeChapter.playerSeat)?.[completeChapter.playerSeat]
        const mergedChapter = {...target, ...source}
        completeStory.push(mergedChapter)
    })

    return completeStory
}