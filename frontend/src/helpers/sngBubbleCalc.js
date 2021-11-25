export const sngBubbleCalc = maxPlayers => {
    if (maxPlayers <= 6) return 3
    if (maxPlayers <= 10) return 4
    if (maxPlayers <= 18) return 5
    if (maxPlayers <= 45) return 8
    return 0
}