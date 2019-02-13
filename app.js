require('module-alias/register')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const router = require('@config/routes')


const app = express()
dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(morgan('tiny'))

const db = require('@api/config/database').URL
let port = process.env.APP_PORT

//Mongo connect
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected successfully...  :)'))
    .catch(err => console.log(err))

// Setting up the route app
app.use(router)
app.get('/', (req, res) => {
    res.send('It works')
})

// Run the app server
if(!module.parent){
    app.listen(port, () => console.log(`Magic happen at ${port}`))
}

module.exports = app
