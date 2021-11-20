const Players = require("../models/Players")
const Tournament = require("../models/Tournament")


module.exports = app => {
    // get routes
    app.get("/players", (req, res) => {
        let results = []
        Tournament.find()
        .then(tournaments => {
            results.push(tournaments)
            return Players.find()
        })
        .then(players => {
            results.push(players)
        })
        .then(() => res.json([...new Set(results)]))
        .catch(err => res.status(400).json("Error:" + err))
    })

    app.get("/players/:id", (req, res) => {
        const id = req.params.id

        Players.find({ playerId: id })
            .then(players => res.json(players))
            .catch(err => res.status(400).json("Error: " + err))
    })

    app.get("/player/:id", (req, res) => {
        const id = req.params.id
        let results = []
        Tournament.find()
        .then(tournaments => {
            results.push(tournaments)
            return Players.find({ playerId: id })
        })
        .then(players => {
            results.push(players)
        })
        .then(() => res.json([...new Set(results)]))
        .catch(err => res.status(400).json("Error: " + err))
    })

    // create route
    app.post("/players", (req, res) => {
        const newPlayers = new Players()
        Players.collection.insertMany(req.body)
        .then(res.status(200).json("Added player successfully"))
        .catch(err => res.status(400).json("Error: " + err))
    })

    // delete route
    app.delete("/player/:id", (req, res) => {
        const id = req.params.id

        Players.findOneAndDelete({ playerId: id }, (req, res, err) => {
            if (!err) {
                console.log("Player deleted")
            } else {
                console.log(err)
            }
        })
    })

    // update route
    app.patch("/players/:id", (req, res) => {
        const data = req.body
        const { id } = data.playerId        

        Players.updateMany({ playerId: id }), { $set: data }, err => {
            if (!err) {
                console.log(`Player ${id} updated.`)
            } else {
                console.log(err)
            }
        }
    })
}