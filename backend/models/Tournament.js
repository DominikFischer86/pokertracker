const mongoose = require("mongoose")

const tournamentSchema = {
    tournamentId: String,
    buyIn: Number,
    rake: Number,
    rebuys: Number,
    playerAmount: Number,
    prizePool: Number,
    timeStamp: Date,
    startDate: String,
    startTime: String,
    finalPosition: Number,
    playerPrizeMoney: Number,
    bounties: Number,
    placements: Array
}

const Tournament = mongoose.model("Tournament", tournamentSchema, "tournaments")

module.exports = Tournament
