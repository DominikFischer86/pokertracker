const express = require('express')
const router = express.Router()
const Tournament = require('../models/tournament-model')

router.post('/import', async (req,res) => {
    const tournamentId = req.body.tournamentId
    const newTournament = new Tournament({
        tournamentId
    })

    try {
        const response = await newTournament.save()
        res.status(201).json(response)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    
    
})

module.exports = router