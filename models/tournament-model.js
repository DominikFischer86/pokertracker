const mongoose = require('mongoose')

const tournamentSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    } 
})

const Tournament = mongoose.model("Tournament", tournamentSchema, 'tournaments')

module.exports = Tournament