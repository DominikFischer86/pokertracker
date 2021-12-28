export const formatPosition = (isValidSeat, seatId, isBigBlind) => {
  console.log(isValidSeat, seatId, isBigBlind)
  const tenActivePlayers = ["UTG", "UTG+1", "UTG+2", "UTG+3", "LJ", "HJ", "CO", "BU", "SB", "BB"]
  const nineActivePlayers = ["UTG", "UTG+1", "UTG+2", "LJ", "HJ", "CO", "BU", "SB", "BB"]
  const eightActivePlayers = ["UTG", "UTG+1", "LJ", "HJ", "CO", "BU", "SB", "BB"]
  const sevenActivePlayers = ["UTG", "LJ", "HJ", "CO", "BU", "SB", "BB"]
  const sixActivePlayers = ["LJ", "HJ", "CO", "BU", "SB", "BB"]
  const fiveActivePlayers = ["HJ", "CO", "BU", "SB", "BB"]
  const fourActivePlayers = ["CO", "BU", "SB", "BB"]
  const threeActivePlayers = ["BU", "SB", "BB"]
  const twoActivePlayers = ["SB", "BB"]
}
