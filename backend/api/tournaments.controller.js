import { parse } from "dotenv";
import TournamentDAO from "../dao/tournamentsDAO.js";


export default class TournamentsController {
    static async apiGetTournaments(req, res, next) {
        const tournamentsPerPage = req.tournamentsPerPage ? parseInt(req.query.tournamentsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.playerAmount) {
            filters.playerAmount = req.query.playerAmount
        } else if (req.query.playerName) {
            filters.playerName = req.query.playerName
        } else if (req.query.playerCountry) {
            filters.playerCountry = req.query.playerCountry
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

    static async apiPostTournament(req, res, next) {
        try {
            const tournamentId = req.body.restaurant_id
            const buyIn = req.body.buy_in
            const rake = req.body.rake
            const playerAmount = req.body.player_amount
            const prizePool = req.body.prize_pool
            const startDate = req.body.start_date
            const placements = {
                placement: req.body.placement,
                playerName: req.body.player_name,
                playerCountry: req.body.player_country,
                notFinished: req.body.not_finished
            }
            

            const tournamentResponse = await TournamentsDAO.addTournament(
                tournamentId,
                buyIn,
                rake,
                playerAmount,
                prizePool,
                startDate,
                placements
            )

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

}