import express from "express"
import TournamentsController from "./tournaments.controller.js"

const router = express.Router()

router.route("/").get(TournamentsController.apiGetTournaments)
router.route("/player-analysis").get(TournamentsController.apiGetTournaments)
router.route("/tax-report").get(TournamentsController.apiGetTournaments)

router
    .route("/import")
    .get(TournamentsController.apiGetTournaments)
    .post(TournamentsController.apiPostTournament)


export default router