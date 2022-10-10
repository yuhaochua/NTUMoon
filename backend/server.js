require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const courseRoutes = require('./routes/courses')
const userRoutes = require('./routes/user')
const commentRoutes = require('./routes/comments')
const cors = require("cors");

//create express app
const app = express()

app.use(express.json()) 

app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/courses', courseRoutes)
app.use('/api/user', userRoutes)
app.use('/api/comments', commentRoutes)

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



