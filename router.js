const express = require('express') // Express web server framework
const router = express.Router() // Create a new router

/**
 * Import Routes
 */
const crudRoutes = require('./routes/crudRouter') // Import Location routes

/**
 * Route Middleware
 * Set up routers routes
 */
router.use('/v1/crud', crudRoutes)

/**
 * Export the module router.
 */
module.exports = router 