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

export const createReplayerStory = (activeHand, story) => {
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
            playerAction: "",
            playerBet: 0,
            board: null
        }
    })})
    const filteredInitialState = initialState.filter(state => state !== null)
    let completeStory = []
    let updatedState = filteredInitialState
    // console.log(story)

    story.forEach((chapter, index) => {
        // add and update (enemy) hole cards
        if (Object.keys(chapter).includes("holeCards")) Object.keys(filteredInitialState).map((seat, i) => {
            const seatNumber = parseFloat(seat)+1
            console.log(updatedState)
            // if (updatedState["seat_" + seatNumber].playerName === "KeinKönich")
        })

        // add actions

        // add betsizes

        // add/update board

        
        // console.log(chapter)
        completeStory.push(updatedState)
    })

    return null
}