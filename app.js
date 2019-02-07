const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const itemRoutes = require('./api/item/itemRoutes')

const app = express()
dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))

const db = require('./api/config/database').URL
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected successfully...  :)'))
    .catch(err => console.log(err))

app.use('/api', itemRoutes)

// Run the app server
app.listen(3000, () => console.log(`Magic happen on localhost:3000`))
