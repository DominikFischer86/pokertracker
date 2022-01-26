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

const createInitialReplayerStoryState = activeHand => {
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
            board: null,
            step: ""
        }
    })})

    const filteredInitialState = initialState.filter(state => state !== null)

    return filteredInitialState
}

export const createReplayerStory = (activeHand, story, heroName) => {
    let completeStory = []
    let updatedState = createInitialReplayerStoryState(activeHand)
    const seats = updatedState.map((seat, i) => "seat_" + parseFloat(i+1))

    story.map((chapter, index) => {
        const completeChapter = {
            playerSeat: "",
            playerName: "",
            playerHand: ". ,",
            playerAction: "",
            playerBet: 0,
            board: null,
            step: ""
        }
        // add and update hero hole cards
        let flopChapter, turnChapter, riverChapter, summaryChapter
        
        if (Object.keys(chapter).includes("holeCards")) seats.filter(() => {      
            completeChapter.playerHand = chapter.holeCards
            completeChapter.step = "Preflop"
        })

       // console.log(index, chapter)
        
        if(Object.keys(chapter).includes("flop")) flopChapter = index
        if(Object.keys(chapter).includes("turn")) turnChapter = index
        if(Object.keys(chapter).includes("river")) riverChapter = index
        if(Object.keys(chapter).includes("summary")) summaryChapter = index

        // add actions
        if (chapter.length > 3) seats.filter((seat, i) => {
            const seatNumber = "seat_" + parseFloat(i+1)
 
            if (seatNumber === chapter[1]){
                completeChapter.playerSeat = seatNumber
                completeChapter.playerHand = chapter[2] === "folds" ? null : ". ,"
                completeChapter.playerAction = chapter[2]
                completeChapter.playerbet = chapter[3]
                completeChapter.playerName = chapter[0]
            }
        })

        // add/update board
        if (flopChapter === index) {
            completeChapter.board = chapter.flop
            completeChapter.step = "Flop"
        }
        if (turnChapter === index) {
            completeChapter.board = chapter.turn
            completeChapter.step = "Turn"
        }
        if (riverChapter === index)  {
            completeChapter.board = chapter.river
            completeChapter.step = "River"
        }
        if (summaryChapter === index) {
            completeChapter.board = chapter.summary
            completeChapter.step = "Summary"
        }

        const source = completeChapter
        const target = updatedState.find(state => state[completeChapter.playerSeat]?.playerSeat === completeChapter.playerSeat)?.[completeChapter.playerSeat]
        if (!target) return source
        const targetIndex = target.playerSeat
        const mergedChapter = {...target, ...source}
        const createCompleteStory = updatedState.map(state => {
            return {
                ...state,
                ...mergedChapter
            }
        })
        console.log(createCompleteStory)
        
        completeStory.push({...updatedState})
    })

    return completeStory
}