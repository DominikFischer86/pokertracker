const Players = require("../models/Players")
const Tournament = require("../models/Tournament")
const Rakeback = require("../models/Rakeback")
const HandHistory = require("../models/HandHistory")

module.exports = app => {

    // get routes
    app.get("/tournaments/dateSorted", (req, res) => {
        let results = []
        Tournament.find().sort({"timeStamp": 1})
            .then(tournaments => {
                results.push(tournaments)
                return Rakeback.find()
            })
            .then(rakeback => {
                results.push(rakeback)
                return HandHistory.Meta.find()
            })
            .then(hands => results.push(hands))
            .then(() => res.json([...new Set(results)]))
            .catch(err => res.status(400).json("Error:" + err))
    })

    app.get("/tournaments/", (req, res) => {
        Tournament.find()
            .then(tournaments => res.json(tournaments))
            .catch(err => res.status(400).json("Error:" + err))
    })

    app.get("/tournament/:id", (req, res) => {
        const id = req.params.id
        let playerList = []
        let results = []

        Tournament.find({ tournamentId: id })
            .then(tournament => {
                tournament[0].placements.map(player => playerList.push(player.playerName))
                results.push(tournament)
                return Players.find({"playerName":{ "$in": playerList}})
            })
            .then(players => {
                results.push(players)
            })
            .then(() => res.json([...new Set(results)]))
            .catch(err => res.status(400).json("Error: " + err))
    })

    // create route
    app.post("/tournaments/add", (req, res) => {
        const newTournament = new Tournament({
            tournamentId: req.body.tournamentId,
            buyIn: req.body.buyIn,
            rake: req.body.rake,
            rebuys: req.body.rebuys,
            playerAmount: req.body.playerAmount,
            prizePool: req.body.prizePool,
            timeStamp: req.body.timeStamp,
            startDate: req.body.startDate,
            startTime: req.body.startTime,
            finalPosition: req.body.finalPosition,
            playerPrizeMoney: req.body.playerPrizeMoney,
            bounties: req.body.bounties,
            placements: req.body.placements
        })

        newTournament.save()
            .then(res.status(200).json("Added tournament successfully"))
            .catch(err => res.status(400).json("Error: " + err))
    })

    // delete route
    app.delete("/tournament/:id", (req, res) => {
        const id = req.params.id

        Tournament.findOneAndDelete({ tournamentId: id})
        .then(() => HandHistory.Meta.findOneAndDelete({"meta.tournamentId": id}))
        .then(() => HandHistory.Seat_1.findOneAndDelete({"seat_1.tournamentId": id}))
        .then(() => HandHistory.Seat_2.findOneAndDelete({"seat_2.tournamentId": id}))
        .then(() => HandHistory.Seat_3.findOneAndDelete({"seat_3.tournamentId": id}))
        .then(() => HandHistory.Seat_4.findOneAndDelete({"seat_4.tournamentId": id}))
        .then(() => HandHistory.Seat_5.findOneAndDelete({"seat_5.tournamentId": id}))
        .then(() => HandHistory.Seat_6.findOneAndDelete({"seat_6.tournamentId": id}))
        .then(() => HandHistory.Seat_7.findOneAndDelete({"seat_7.tournamentId": id}))
        .then(() => HandHistory.Seat_8.findOneAndDelete({"seat_8.tournamentId": id}))
        .then(() => HandHistory.Seat_9.findOneAndDelete({"seat_9.tournamentId": id}))
        .then(() => HandHistory.Preflop.findOneAndDelete({"preflop.tournamentId": id}))
        .then(() => HandHistory.Flop.findOneAndDelete({"flop.tournamentId": id}))
        .then(() => HandHistory.Turn.fifindOneAndDeletend({"turn.tournamentId": id}))
        .then(() => HandHistory.River.findOneAndDelete({"river.tournamentId": id}))
        .then(() => HandHistory.Summary.findOneAndDelete({"summary.tournamentId": id}))
        .then(res.status(200).json("Removed tournament and hand history for #" + id))
        .catch(err => res.status(400).json("Error: " + err))
    })

    // update route
    app.patch("/tournament/:id", (req, res) => {
        const id = req.params.id
        const data = req.body

        Tournament.findOneAndUpdate({ tournamentId: id}, { $set: data }, err => {
            if (!err) {
                console.log(`Tournament ${id} updated.`)
            } else {
                console.log(err)
            }
        })
    })
}
