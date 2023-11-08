# Step to Setup NodeJS CRUD
CMD: node install

# Create a .env file on root and put the below code change configuration accordingly
#MONGO CONFIGURATION
PORT = 3000
DATABASENAME = 'books_crud'
MONGOURI = 'mongodb://127.0.0.1:27017/'

# Execute the Application
CMD: node app.js OR nodemon app

# PostMan End-Points Collection
Filename: book_crud.postman_collection.json, 
URL: https://github.com/Sahilkr02/nodejs-crud/blob/main/book_crud.postman_collection.json
# List of End-Points
/v1/crud/add-book - POST, 
/v1/crud/books-list - GET, 
/v1/crud/book-details/{id} - GET, 
/v1/crud/update-book-details/{id} - PUT, 
/v1/crud/delete-book/{id} - DELETE
