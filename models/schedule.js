const mongoose = require('mongoose')

const SchSchema = mongoose.Schema({
    race_no : {
        type: Number,
        required: true,
        unique: true
    },
    track : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Schedule', SchSchema)