const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemModel = new Schema({
    name: { type: String },
    desc: { type: String },
})

module.exports = mongoose.model('item', itemModel)
