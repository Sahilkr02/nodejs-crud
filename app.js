const express = require('express') // Express web server framework
const app = express() // Create our app w/ express
const https = require('https') // https server
const { PORT } = require('./utility/config') // Import keys
const { } = require('./utility/common-helper') // Common helper functions

// Create a custom https.Agent with specific SSL/TLS options
const agent = new https.Agent({
    ciphers: 'AES128-GCM-SHA256',
    secureProtocol: 'TLSv1_2_method'
});

/**
 * Middleware
 */
app.use(express.urlencoded({ extended: true })) // Parse application/x-www-form-urlencoded
app.use(express.json()) // Parse application/json

/**
 * Import Router
 */
const router = require('./router');
app.use(urlLogger); // Log Requested URLs
app.use(router) // Setup router


/** 
 * Handle unknow routes or Invalid routes requests
 */
app.use('*', (req, res, next) => {
    try {
        res.status(404).json({
            status: false,
            status_code: 404,
            message: `Routes not found!!, Please read the API documentation to find out how to use this API.`
        }) 
    } catch (e) {
        return res.status(500).json({ status: false, status_code: 500, message: e.message });
    }
})

app.use((error, req, res, next) => {
    try {
        if (res.headersSent) {
            return next(error);
        }
        res.status(404).json({
            status: false,
            status_code: error.statusCode || 404,
            message: error.message || `Oops something goes wrong!!`
        });
    } catch (e) {
        return res.status(500).json({ status: false, status_code: 500, message: e.message });
    }
});

/** 
* Listen on port 
*/
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})