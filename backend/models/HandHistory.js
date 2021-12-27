const mongoose = require("mongoose")

// SCHEMAS
const handHistoryMetaSchema = {
    meta: Array
}

const handHistorySeatsSchema = {
    seats: Array
}

const handHistoryPreflopSchema = {
    preflop: Array
}

const handHistoryFlopSchema = {
    flop: Array
}

const handHistoryTurnSchema = {
    turn: Array
}

 const handHistoryRiverSchema = {
    river: Array
}

const handHistorySummarySchema = {
    summary: Array
}

const handHistorySeat1Schema = {
    seat_1: Array
}

const handHistorySeat2Schema = {
    seat_2: Array
}

const handHistorySeat3Schema = {
    seat_3: Array
}

const handHistorySeat4Schema = {
    seat_4: Array
}

const handHistorySeat5Schema = {
    seat_5: Array
}

const handHistorySeat6Schema = {
    seat_6: Array
}

const handHistorySeat7Schema = {
    seat_7: Array
}

const handHistorySeat8Schema = {
    seat_8: Array
}

const handHistorySeat9Schema = {
    seat_9: Array
}

// MODELS

const Meta = mongoose.model("HandHistoryMeta", handHistoryMetaSchema, "handHistoriesMeta")
const Seats = mongoose.model("HandHistorySeats", handHistorySeatsSchema, "handHistoriesSeats")
const Seat_1 = mongoose.model("HandHistorySeat_1", handHistorySeat1Schema, "handHistoriesSeat_1")
const Seat_2 = mongoose.model("HandHistorySeat_2", handHistorySeat2Schema, "handHistoriesSeat_2")
const Seat_3 = mongoose.model("HandHistorySeat_3", handHistorySeat3Schema, "handHistoriesSeat_3")
const Seat_4 = mongoose.model("HandHistorySeat_4", handHistorySeat4Schema, "handHistoriesSeat_4")
const Seat_5 = mongoose.model("HandHistorySeat_5", handHistorySeat5Schema, "handHistoriesSeat_5")
const Seat_6 = mongoose.model("HandHistorySeat_6", handHistorySeat6Schema, "handHistoriesSeat_6")
const Seat_7 = mongoose.model("HandHistorySeat_7", handHistorySeat7Schema, "handHistoriesSeat_7")
const Seat_8 = mongoose.model("HandHistorySeat_8", handHistorySeat8Schema, "handHistoriesSeat_8")
const Seat_9 = mongoose.model("HandHistorySeat_9", handHistorySeat9Schema, "handHistoriesSeat_9")
const Preflop = mongoose.model("HandHistoryPreflop", handHistoryPreflopSchema, "handHistoriesPreflop")
const Flop = mongoose.model("HandHistoryFlop", handHistoryFlopSchema, "handHistoriesFlop")
const Turn = mongoose.model("HandHistoryTurn", handHistoryTurnSchema, "handHistoriesTurn")
const River = mongoose.model("HandHistoryRiver", handHistoryRiverSchema, "handHistoriesRiver")
const Summary = mongoose.model("HandHistorySummary", handHistorySummarySchema, "handHistoriesSummary")

//EXPORTS
exports.Meta = Meta
exports.Seats = Seats
exports.Seat_1 = Seat_1
exports.Seat_2 = Seat_2
exports.Seat_3 = Seat_3
exports.Seat_4 = Seat_4
exports.Seat_5 = Seat_5
exports.Seat_6 = Seat_6
exports.Seat_7 = Seat_7
exports.Seat_8 = Seat_8
exports.Seat_9 = Seat_9
exports.Preflop = Preflop
exports.Flop = Flop
exports.Turn = Turn
exports.River = River
exports.Summary = Summary
