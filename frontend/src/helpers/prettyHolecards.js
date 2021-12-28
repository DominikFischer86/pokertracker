export const prettyHolecards = (holeCards) => {
    let newHoleCards = ""
    if (holeCards.includes("h")) newHoleCards = holeCards.replace(/h/, "♥")
    if (holeCards.includes("c")) newHoleCards = holeCards.replace(/c/, "♣")
    if (holeCards.includes("s")) newHoleCards = holeCards.replace(/s/, "♠")
    if (holeCards.includes("d")) newHoleCards = holeCards.replace(/d/, "♦")

    return newHoleCards
}
