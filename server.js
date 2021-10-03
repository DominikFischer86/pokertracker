const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors({
    origin: "*"
}))
app.use(express.json())

const url = 'mongodb://localhost:27017'
const db = mongoose.connection

// connect to mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
db.once("open", function(){
    console.log("mongodb is connected!", url)
})

db.on("error", function(err){
    console.error("Database connection error!", err)
})

// require route
const tournamentsRouter = require('./routes/tournament-route')
app.use('/import', tournamentsRouter)

app.listen(3001, function() {
    console.log('express server is running on port 3001')
})