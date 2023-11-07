# Step to Setup NodeJS CRUD
CMD: node install

# Create a .env file on root and put the below code change configuration accordingly
#MONGO CONFIGURATION
PORT = 3000
DATABASENAME = 'books_crud'
MONGOURI = 'mongodb://127.0.0.1:27017/'

# Execute the Application
CMD: node app.js OR nodemon app

