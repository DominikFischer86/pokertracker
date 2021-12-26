const mongoose = require("mongoose")

const handHistorySchema = {
    tournamentId: String,
    handHistory: Array
}

const HandHistory = mongoose.model("HandHistory", handHistorySchema, "handHistories")

module.exports = HandHistory
