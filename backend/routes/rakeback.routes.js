const Players = require("../models/Players")
const Rakeback = require("../models/Rakeback")

module.exports = app => {
    // get routes
    app.get("/rakeback", (req, res) => {
        Rakeback.find()
        .then(rakeback => res.json(rakeback))
        .catch(err => res.status(400).json("Error: " + err))
    })

    // create routes
    app.post("/rakeback", (req,res) => {
        const newRakebackEntry = new Rakeback()
        Rakeback.collection.insertOne(req.body)
        .then(res.status(200).json("Added rakeback entry"))
        .catch(err => res.status(400).json("Error: " + err))
    })

    // delete routes
    app.delete("/rakeback/:id", (req, res) => {
        const id = req.params.id

        Tournament.findOneAndDelete({ rakebackId: id}, (req, res, err) => {
            if (!err) {
                console.log("Rakeback entry deleted")
            } else {
                console.log(err)
            }
        })
    })
}