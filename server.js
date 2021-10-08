const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const PORT = 3001

// config
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

// connect to mongodb
dotenv.config()
mongoose.connect(process.env.TOURNAMENT_DB_LOCAL)

// data schema
const tournamentSchema = {
    tournamentId: String,
    buyIn: Number,
    rake: Number,
    playerAmount: Number,
    prizePool: Number,
    startDate: String,
    startTime: String,
    finalPosition: Number,
    playerPrizeMoney: Number,
    placements: Array
}

// data model
const Tournament = mongoose.model("Tournament", tournamentSchema, "tournaments")

// read route
app.get("/results", (req, res) => {
    Tournament.find().sort({"tournamentId": 1})
        .then(tournaments => res.json(tournaments))
        .catch(err => res.status(400).json("Error:" + err))
})

app.get("/import", (req, res) => {
    Tournament.find()
        .then(tournaments => res.json(tournaments))
        .catch(err => res.status(400).json("Error:" + err))
})

app.get("/tournament/:id", (req, res) => {
    const id = req.params.id

    Tournament.find({ tournamentId: id})
        .then(tournament => res.json(tournament))
        .catch(err => res.status(400).json("Error: " + err))
})

// create route
app.post("/import", (req, res) => {
    const newTournament = new Tournament({
        tournamentId: req.body.tournamentId,
        buyIn: req.body.buyIn,
        rake: req.body.rake,
        playerAmount: req.body.playerAmount,
        prizePool: req.body.prizePool,
        startDate: req.body.startDate,
        startTime: req.body.startTime,
        finalPosition: req.body.finalPosition,
        playerPrizeMoney: req.body.playerPrizeMoney,
        placements: req.body.placements
    })

    newTournament.save()
        .then(res.status(200).json("Added tournament successfully"))
        .catch(err => res.status(400).json("Error: " + err))
})

// delete route
app.delete("/results/:id", (req, res) => {
    const id = req.params.id

    Tournament.findOneAndDelete({ tournamentId: id}, (req, res, err) => {
        if (!err) {
            console.log("Item deleted")
        } else {
            console.log(err)
        }
    })
})

// update route

app.listen(PORT, function(){
    console.log("Express is running!")
})