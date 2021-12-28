const Tournament = require("../models/Tournament")
const HandHistory = require("../models/HandHistory")


module.exports = app => {
  // get routes
  app.get("/hand-histories-and-tournaments", (req, res) => {
    let results = []
    Tournament.find()
      .then(tournament => {
        results.push(tournament)
        return HandHistory.Meta.find()
      })
      .then(hands => {
        results.push(hands)
      })
      .then(() => res.json([...new Set(results)]))
      .catch(err => res.status(400).json("Error: " + err))
  })

  app.get("/hand-histories-for-tournament/:id", (req, res) => {
    const id = req.params.id
    let results = []
    Tournament.find({ tournamentId: id })
      .then(tournament => {
        results.push(tournament)
        return HandHistory.Meta.find({"meta.tournamentId": id})
      })
      .then(meta => {
        results.push(meta)
        return HandHistory.Seat_1.find({"seat_1.tournamentId": id})
      })
      .then(seat_1 => {
        results.push(seat_1)
        return HandHistory.Seat_2.find({"seat_2.tournamentId": id})
      })
      .then(seat_2 => {
        results.push(seat_2)
        return HandHistory.Seat_3.find({"seat_3.tournamentId": id})
      })
      .then(seat_3 => {
        results.push(seat_3)
        return HandHistory.Seat_4.find({"seat_4.tournamentId": id})
      })
      .then(seat_4 => {
        results.push(seat_4)
        return HandHistory.Seat_5.find({"seat_5.tournamentId": id})
      })
      .then(seat_5 => {
        results.push(seat_5)
        return HandHistory.Seat_6.find({"seat_6.tournamentId": id})
      })
      .then(seat_6 => {
        results.push(seat_6)
        return HandHistory.Seat_7.find({"seat_7.tournamentId": id})
      })
      .then(seat_7 => {
        results.push(seat_7)
        return HandHistory.Seat_8.find({"seat_8.tournamentId": id})
      })
      .then(seat_8 => {
        results.push(seat_8)
        return HandHistory.Seat_9.find({"seat_9.tournamentId": id})
      })
      .then(seat_9 => {
        results.push(seat_9)
        return HandHistory.Preflop.find({"preflop.tournamentId": id})
      })
      .then(preflop => {
        results.push(preflop)
        return HandHistory.Flop.find({"flop.tournamentId": id})
      })
      .then(flop => {
        results.push(flop)
        return HandHistory.Turn.find({"turn.tournamentId": id})
      })
      .then(turn => {
        results.push(turn)
        return HandHistory.River.find({"river.tournamentId": id})
      })
      .then(river => {
        results.push(river)
        return HandHistory.Summary.find({"summary.tournamentId": id})
      })
      .then(summary => {
        results.push(summary)
      })
      .then(() => res.json([...new Set(results)]))
      .catch(err => res.status(400).json("Error: " + err))
  })

  app.get("/hand-history/:id", (req, res) => {
    HandHistory.Meta.find()
      .then(handHistories => res.json(handHistories))
      .catch(err => res.status(400).json("Error: " + err))
  })

  // create routes
  app.post("/hand-histories/add/meta", (req, res) => {
    const newHandHistory = new HandHistory.Meta({meta: req.body})

    newHandHistory.save()
      .then(res.status(200).json("Added tournament meta hand history successfully"))
      .catch(err => res.status(400).json("Error: " + err))
  })

  app.post("/hand-histories/add/seats", (req, res) => {
    const newHandHistory = new HandHistory.Seats({seats: req.body})

    newHandHistory.save()
      .then(res.status(200).json("Added tournament seats hand history successfully"))
      .catch(err => res.status(400).json("Error: " + err))
  })

  app.post("/hand-histories/add/preflop", (req, res) => {
    const newHandHistory = new HandHistory.Preflop({preflop: req.body})

    newHandHistory.save()
      .then(res.status(200).json("Added tournament preflop hand history successfully"))
      .catch(err => res.status(400).json("Error: " + err))
  })

  app.post("/hand-histories/add/flop", (req, res) => {
    const newHandHistory = new HandHistory.Flop({flop: req.body})

    newHandHistory.save()
      .then(res.status(200).json("Added tournament flop hand history successfully"))
      .catch(err => res.status(400).json("Error: " + err))
  })

  app.post("/hand-histories/add/turn", (req, res) => {
    const newHandHistory = new HandHistory.Turn({turn: req.body})

    newHandHistory.save()
      .then(res.status(200).json("Added tournament turn hand history successfully"))
      .catch(err => res.status(400).json("Error: " + err))
  })

  app.post("/hand-histories/add/river", (req, res) => {
    const newHandHistory = new HandHistory.River({river: req.body})

    newHandHistory.save()
      .then(res.status(200).json("Added tournament river hand history successfully"))
      .catch(err => res.status(400).json("Error: " + err))
  })

  app.post("/hand-histories/add/summary", (req, res) => {
    const newHandHistory = new HandHistory.Summary({summary: req.body})

    newHandHistory.save()
      .then(res.status(200).json("Added tournament summary hand history successfully"))
      .catch(err => res.status(400).json("Error: " + err))
  })

  app.post("/hand-histories/add/seat_1", (req, res) => {
    const newHandHistory = new HandHistory.Seat_1({seat_1: req.body})

    newHandHistory.save()
      .then(res.status(200).json("Added tournament seat_1 hand history successfully"))
      .catch(err => res.status(400).json("Error: " + err))
  })

  app.post("/hand-histories/add/seat_2", (req, res) => {
    const newHandHistory = new HandHistory.Seat_2({seat_2: req.body})

    newHandHistory.save()
      .then(res.status(200).json("Added tournament seat_2 hand history successfully"))
      .catch(err => res.status(400).json("Error: " + err))
  })

  app.post("/hand-histories/add/seat_3", (req, res) => {
    const newHandHistory = new HandHistory.Seat_3({seat_3: req.body})

    newHandHistory.save()
      .then(res.status(200).json("Added tournament seat_3 hand history successfully"))
      .catch(err => res.status(400).json("Error: " + err))
  })

  app.post("/hand-histories/add/seat_4", (req, res) => {
    const newHandHistory = new HandHistory.Seat_4({seat_4: req.body})

    newHandHistory.save()
      .then(res.status(200).json("Added tournament seat_4 hand history successfully"))
      .catch(err => res.status(400).json("Error: " + err))
  })

  app.post("/hand-histories/add/seat_5", (req, res) => {
    const newHandHistory = new HandHistory.Seat_5({seat_5: req.body})

    newHandHistory.save()
      .then(res.status(200).json("Added tournament seat_5 hand history successfully"))
      .catch(err => res.status(400).json("Error: " + err))
  })

  app.post("/hand-histories/add/seat_6", (req, res) => {
    const newHandHistory = new HandHistory.Seat_6({seat_6: req.body})

    newHandHistory.save()
      .then(res.status(200).json("Added tournament seat_6 hand history successfully"))
      .catch(err => res.status(400).json("Error: " + err))
  })

  app.post("/hand-histories/add/seat_7", (req, res) => {
    const newHandHistory = new HandHistory.Seat_7({seat_7: req.body})

    newHandHistory.save()
      .then(res.status(200).json("Added tournament seat_7 hand history successfully"))
      .catch(err => res.status(400).json("Error: " + err))
  })

  app.post("/hand-histories/add/seat_8", (req, res) => {
    const newHandHistory = new HandHistory.Seat_8({seat_8: req.body})

    newHandHistory.save()
      .then(res.status(200).json("Added tournament seat_8 hand history successfully"))
      .catch(err => res.status(400).json("Error: " + err))
  })

  app.post("/hand-histories/add/seat_9", (req, res) => {
    const newHandHistory = new HandHistory.Seat_9({seat_9: req.body})

    newHandHistory.save()
      .then(res.status(200).json("Added tournament seat_9 hand history successfully"))
      .catch(err => res.status(400).json("Error: " + err))
  })
}
