import { parse } from "dotenv";
import TournamentDAO from "../dao/tournamentsDAO.js";


export default class TournamentsController {
    static async apiGetTournaments(req, res, next) {
        const tournamentsPerPage = req.tournamentsPerPage ? parseInt(req.query.tournamentsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.tournamentId) {
            filters.tournamentId = req.query.tournamentId
        } else if (req.query.buyIn) {
            filters.buyIn = req.query.buyIn
        } else if (req.query.playerAmount) {
            filters.playerAmount = req.query.playerAmount
        } else if (req.query.startDate) {
            filters.startDate = req.query.startDate
        }

        const { tournamentsList, totalNumTournaments } = await TournamentDAO.getTournaments({
            filters,
            page,
            tournamentsPerPage
        })

        let response = {
            tournaments: tournamentsList,
            page: page,
            filters: filters,
            entries_per_page: tournamentsPerPage,
            total_results: totalNumTournaments
        }

        res.json(response)
    }

    static async apiDeleteTournament(req, res, next) {
        try {
            const tournamentId = req.query.tournamentId
            const tournamentResponse = await TournamentDAO.deleteTournament(tournamentId)
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetTournamentById(req, res, next) {
        try {
            let tournamentId = req.params.tournamentId || {}
            let tournament = await TournamentDAO.apiGetTournamentById(tournamentId)

            if(!tournament) {
                res.status(404).json({ error: "Not found" })
                return
            }
            res.json(tournament)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiPostTournament(req, res, next) {
        try {
            const tournamentId = req.body.tournamentId
            const buyIn = req.body.buyIn
            const rake = req.body.rake
            const playerAmount = req.body.playerAmount
            const prizePool = req.body.prizePool
            const startDate = req.body.startDate
            const startTime = req.body.startTime
            const finalPosition = req.body.finalPosition
            const playerPrizeMoney = req.body.playerPrizeMoney
            const placements = {
                finishPosition: req.body.finishPosition,
                playerName: req.body.playerName,
                playerCountry: req.body.playerCountry,
                prizeMoney: req.body.prizeMoney
            }
            

            const tournamentResponse = await TournamentDAO.addTournament(
                tournamentId,
                buyIn,
                rake,
                playerAmount,
                prizePool,
                startDate,
                startTime,
                finalPosition,
                playerPrizeMoney,
                placements
            )

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

}