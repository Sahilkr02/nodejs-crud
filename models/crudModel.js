const mongoose = require('mongoose') // mongoose
const { mainDatabase } = require('../utility/databases/mongoConnection');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    }
}, { timestamp: true }) // bookSchema

module.exports = mainDatabase.model('Books', bookSchema); // create a new model called 'Books'