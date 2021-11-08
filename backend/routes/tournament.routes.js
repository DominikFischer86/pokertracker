const Players = require("../models/Players")
const Tournament = require("../models/Tournament")

module.exports = app => {

    // get routes
    app.get("/results", (req, res) => {
        Tournament.find().sort({"timeStamp": 1})
            .then(tournaments => res.json(tournaments))
            .catch(err => res.status(400).json("Error:" + err))
    })

    app.get("/import", (req, res) => {
        Tournament.find()
            .then(tournaments => res.json(tournaments))
            .catch(err => res.status(400).json("Error:" + err))
    })

    app.get("/player-analysis", (req, res) => {
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
    app.post("/import", (req, res) => {
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
    app.delete("/results/:id", (req, res) => {
        const id = req.params.id

        Tournament.findOneAndDelete({ tournamentId: id}, (req, res, err) => {
            if (!err) {
                console.log("Tournament deleted")
            } else {
                console.log(err)
            }
        })
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