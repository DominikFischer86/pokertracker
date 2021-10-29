const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const PORT = 3001

// config
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

// connect to mongodb
dotenv.config()
mongoose.connect(process.env.TOURNAMENT_DB_LOCAL)

require("./backend/routes/tournament.routes")(app)
require("./backend/routes/player.routes")(app)

app.listen(PORT, function(){
    console.log("Express is running!")
})