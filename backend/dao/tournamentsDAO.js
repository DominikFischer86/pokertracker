import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let tournaments

export default class TournamentDAO {
    static async injectDB(conn){
        if (tournaments){
            return
        }

        try {
            tournaments = await conn.db(process.env.TOURNAMENT_NS).collection("tournaments")
        } catch (e) {
            console.error(`Unable to establish a collection handle in tournamentsDAO: ${e}`)
        }
    }

    static async getTournaments({
        filters = null,
        page = 0,
        tournamentsPerPage = 50
    } = {}){
        let query
        if (filters){
            if ("playerAmount" in filters){
                query = { $text: { $search: filters["playerAmount"]}}
            } else if ("playerName" in filters){
                query = { "placements.playerName" : { $eq: filters["playerName"]}}
            } else if ("playerCountry" in filters){
                query = { "placements.playerCountry" : { $eq: filters["playerCountry"]}}
            } else if ("startDate" in filters){
                query = { "startDate" : { $eq: filters["startDate"]}}
            }
        }

        let cursor

        try {
            cursor = await tournaments
                .find(query)
        } catch (e) {
            console.error(`Unable to find command, ${e}`)
            return { tournamentsList: [], totalNumTournaments: 0 }
        }

        const displayCursor = cursor.limit(tournamentsPerPage).skip(tournamentsPerPage * page)

        try {
            const tournamentsList = await displayCursor.toArray()
            const totalNumTournaments = await tournaments.countDocuments(query)

            return { tournamentsList, totalNumTournaments }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return { tournamentsList: [], totalNumTournaments: 0 }
        }

    }

    static async addTournament(tournamentId, buyIn, rake, playerAmount, prizePool, startDate, finishPosition, placements) {
        try {
            const tournamentDoc = {
                tournamentId,
                buyIn,
                rake,
                playerAmount,
                prizePool,
                startDate,
                finishPosition,
                placements
            }

            return await tournaments.insertOne(tournamentDoc)
        } catch (e) {
            console.error(`Unable to post tournament: ${e}`)
            return { error: e }
        }
    }
}