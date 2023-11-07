const Book = require('../models/crudModel') // Book model
const { registerBookValidator, updateBookValidator, idValidator } = require('../middleware/validation') // Book validation middleware

module.exports = {
    fetchAllBooks: async (req, res) => {
        try {
            await Book.find({}, { __v: 0 })
                .then(Books => {
                    // Return the retrieved Books
                    return successMsg(res, true, "Books retrieved successfully", Books);
                })
                // Catch any errors
                .catch(err => {
                    return errorMsg(res, err.message || err, 500);
                })
        } catch (error) {
            return errorMsg(res, err.message || err, 500);
        }
    },

    fetchBookDetails: async (req, res) => {
        try {
            /* Book details validation */
            const validationError = idValidator(req.params)
            if (validationError.error) return errorMsg(res, validationError.error.message, 400);

            await Book.findOne({ _id: req.params.id }, { __v: 0 })
                .then(Books => {
                    if (Books) {
                        return successMsg(res, true, "Books retrieved successfully", Books);
                    } else {
                        return errorMsg(res, 'No Books found');
                    }
                })
                .catch(err => {
                    return errorMsg(res, err.message || err, 500);
                })
        } catch (error) {
            return errorMsg(res, error.message || error, 500);
        }

    },

    createBook: async (req, res) => {
        try {
            /* Book details validation */
            const validationError = registerBookValidator(req.body)
            if (validationError.error) return errorMsg(res, validationError.error.message, 400);

            const newBook = {
                title: req.body.title,
                author: req.body.author,
                summary: req.body.summary
            }

            await Book.findOne({ title: req.body.title })
                .then((book) => {
                    if (book) {
                        // If the postal code already exists 
                        return errorMsg(res, 'Book with same title already exists', 422);
                    }
                    const BookSchema = new Book(newBook) // Create a new instance of the Book model
                    BookSchema.save() // Save the new instance of the Book model
                        .then(BookSchema => {
                            const responseBook = BookSchema.toObject();
                            delete responseBook.__v; // Exclude the __v field from the response
                            // Return the new instance of the Book model
                            return successMsg(res, true, "Book Added successfully", responseBook, 201);
                        })
                        .catch(err => {
                            return errorMsg(res, err.message || err, 500);
                        })
                })
                .catch(err => {
                    return errorMsg(res, err.message || err, 500);
                }) // Catch any errors

        } catch (error) {
            return errorMsg(res, error.message || error, 500);
        }
    },
    updateBook: async (req, res) => {
        try {
            /* Book ID validation */
            const validationError = idValidator(req.params)
            if (validationError.error) return errorMsg(res, validationError.error.message, 400);

            /* Book details validation */
            const updateValidationError = updateBookValidator(req.body)
            if (updateValidationError.error) return errorMsg(res, updateValidationError.error.message, 400);

            const bookId = req.params.id;
            const updatedData = {
                title: req.body.title,
                author: req.body.author,
                summary: req.body.summary
            };

             /**
              * Check if the new title already exists in another book
              */
             if (updatedData.title) {
                const existingBook = await Book.findOne({ title: updatedData.title, _id: { $ne: bookId } });
                if (existingBook) {
                    return errorMsg(res, 'Book with same title already exists', 422);
                }
            }

            const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, { new: true }).select('-__v');

            if (!updatedBook) {
                return errorMsg(res, 'Book not found', 404);
            }

            return successMsg(res, true, 'Book updated successfully', updatedBook, 200);
        } catch (error) {
            return errorMsg(res, error.message || error, 500);
        }
    },
    deleteBook: async (req, res) => {
        try {
            /* Book ID validation */
            const validationError = idValidator(req.params)
            if (validationError.error) return errorMsg(res, validationError.error.message, 400);

            const bookId = req.params.id;

            const deletedBook = await Book.findByIdAndDelete(bookId);

            if (!deletedBook) {
                return errorMsg(res, 'Book not found', 404);
            }

            return successMsg(res, true, 'Book deleted successfully', '', 200);
        } catch (error) {
            return errorMsg(res, error.message || error, 500);
        }
    },
}