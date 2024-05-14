// I am genuinely suicidal

/**
 * This is a simple server that listens for POST requests to create a new user.
 * It uses Express.js to handle the requests and Mongoose to connect to MongoDB.
 * Handles user registration, and will handle user login in the the future
 */

const express = require('express'); // listen for POST requests
const mongoose = require('mongoose'); // connect to MongoDB
const cors = require('cors'); // allow cross-origin requests
const bcrypt = require('bcrypt'); // hash passwords
const app = express(); // create an Express app
const port = 3000;

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://neroxv1313:Snowfuzzyugen13-@mydb.vv5dhyk.mongodb.net/usersDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to myDB in MongoDB Atlas!'))
	.catch(err => console.log('Error: ' + err));

// Define a schema for the user
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, // Note: In a real-world application, you should hash passwords
}); 

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Middleware
app.use(cors());
app.use(express.json());

// POST endpoint for creating a new user
app.post('/users', async(request, response) => {
  console.log(request.url);
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 20);
    const newUser = new User({
      username: request.body.username,
      email: request.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log('New User: ' + newUser.username + ' created succesfully' +
                ' and entered into mongoDB');
  } catch (error) {
    response.status(400).json('User save error: ' + error);
  }
})

// POST endpoint for logging in a user
// POST endpoint for deleting a user 

// Start the server
app.listen(port, (error) => {
  if (error) {
    console.log('App.listen Error:' + error);
  }
  console.log('Server is running on port ' + port);
});
