const HandHistory = require("../models/HandHistory")
const Tournament = require("../models/Tournament")

module.exports = app => {
  // get routes
  app.get("/hand-histories-and-tournaments", (req, res) => {
    let results = []
    HandHistory.find()
      .then(hands => {
        results.push(hands)
        return Tournament.find()
      })
      .then(tournaments => {
        results.push(tournaments)
      })
      .then(() => res.json([...new Set(results)]))
      .catch(err => res.status(400).json("Error: " + err))
  })

  app.get("/hand-history/:id", (req, res) => {
    HandHistory.find()
      .then(handHistories => res.json(handHistories))
      .catch(err => res.status(400).json("Error: " + err))
  })

  // create routes
  app.post("/hand-histories/add", (req, res) => {
    const newHandHistory = new HandHistory({
      handHistory: req.body
    })

    newHandHistory.save()
      .then(res.status(200).json("Added tournament hand history successfully"))
      .catch(err => res.status(400).json("Error: " + err))
  })

}
