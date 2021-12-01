const mongoose = require("mongoose")

const rakebackSchema = {
    rakebackId: String,
    heroName: String,
    rakebackValue: Number,
    redeemTimeStamp: Date,
    redeemDate: String,
    rakebackType: String
}

const Rakeback = mongoose.model("Rakeback", rakebackSchema, "rakeback")

module.exports = Rakeback