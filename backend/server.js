require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const courseRoutes = require('./routes/courses')

//create express app
const app = express()

app.use(express.json()) 

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/courses', courseRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("connected to mongodb, listening on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })



