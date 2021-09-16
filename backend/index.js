import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import TournamentDAO from "./dao/tournamentsDAO.js" 

dotenv.config()

const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.TOURNAMENT_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.catch(err => {
    console.log(err.stack)
    process.exit(1)
})
.then(async client => {
    await TournamentDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})