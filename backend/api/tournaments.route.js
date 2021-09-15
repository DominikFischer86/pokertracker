import express from "express"
import TournamentsController from "./tournaments.controller"

const router = express.Router()

router.route("/results").get(RestaurantsController.apiGetRestaurants)
router.route("/player-analysis").get(RestaurantsController.apiGetRestaurants)
router.route("/tax-report").get(RestaurantsController.apiGetRestaurants)

router
    .route("/import")
    .post(TournamentsController.apiPostTournament)


export default router