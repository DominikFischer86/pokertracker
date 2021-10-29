const Player = require("../models/Players")

module.exports = app => {
    // get routes
    app.get("/player-analysis", (req, res) => {
        Player.find()
            .then(players => res.json(players))
            .catch(err => res.status(400).json("Error: " + err))
    })

    app.get("/player-analysis/:id", (req, res) => {
        const id = req.params.id

        Player.find({ playerId: id })
            .then(players => res.json(players))
            .catch(err => res.status(400).json("Error: " + err))
    })

    // create route
    app.post("/player-analysis", (req, res) => {
        const newPlayer = new Player({
            playerId: req.body.playerId,
            playerName: req.body.playerName,
            playerCountry: req.body.playerCountry,
            playerIsHero: req.body.playerIsHero,
            playerTournaments: req.body.playerTournaments
        })

        newPlayer.save()
        .then(res.status(200).json("Added player successfully"))
        .catch(err => res.status(400).json("Error: " + err))
    })

    // update route
    app.patch("/player-analysis/:id", (req, res) => {
        const data = req.body
        const { id } = data.playerId        

        Player.findOneAndUpdate({ playerId: id }), { $set: data }, err => {
            if (!err) {
                console.log(`Player ${id} updated.`)
            } else {
                console.log(err)
            }
        }
    })
    
    
}