const mongoose = require("mongoose")

const playersSchema = {
    playerId: String,
    playerName: String,
    playerCountry: String,
    playerIsHero: Boolean,
    playerTournaments: Array
}

const Players = mongoose.model("Players", playersSchema, "players")

module.exports = Players