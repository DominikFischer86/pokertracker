const mongoose = require("mongoose")

const rakebackSchema = {
    rakebackId: String,
    heroName: String,
    rakebackValue: Number,
    redeemDate: Date,
    rakebackType: String
}

const Rakeback = mongoose.model("Rakeback", rakebackSchema, "rakeback")

module.exports = Rakeback