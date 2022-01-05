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