const mongoose = require('mongoose') // Connect to our database
const { MONGOURI, DATABASENAME } = require('../config') // Import keys
let mainDatabase; // variables

/**
 * MongoDB Connection Configration
 */
mongoose.set('strictQuery', false); // Set strict
const options = {
    useNewUrlParser: true, // Use new URL parser
    useUnifiedTopology: true // Use unified topology
}; // connect to mongoDB

/**
 * Create Database Connections
 */
try {
    // Create the main database connection
    mainDatabase = mongoose.createConnection(MONGOURI + DATABASENAME, options);
    mainDatabase.on('connected', () => {
        console.log(`Mongoose ${DATABASENAME} connection open to : ${MONGOURI + DATABASENAME}`)
    });
    mainDatabase.on('error', (error) => {
        console.log(`Mongoose ${DATABASENAME} connection open to: ${error.message || error}`)
    })

} catch (error) {
    console.log(`Mongoose database connection error: ${error.message || error}`);
}

/**
 * Module exports
 */
module.exports = {
    mainDatabase
}
