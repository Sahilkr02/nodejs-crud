const express = require('express') // Express web server framework
const router = express.Router() // Create a new router
const crudController = require('../controllers/crudController') // controller

/**
 * @description : Here all routes is bind with the controllers.
 */
router.post('/add-book', crudController.createBook ) // Define the add location route
router.get('/books-list', crudController.fetchAllBooks) // Define the get locations route
router.get('/book-details/:id', crudController.fetchBookDetails) // Define the get location by query route in the query string PIN, and District will be added to the query string and limit by 5 results.
router.put('/update-book-details/:id', crudController.updateBook) // Define the get location by query route in the query string PIN, and District will be added to the query string and limit by 5 results.
router.delete('/delete-book/:id', crudController.deleteBook) // Define the get location by query route in the query string PIN, and District will be added to the query string and limit by 5 results.

/**
 * Export the module router
 */
module.exports = router