/**
 * This is a simple server that listens for POST requests to create a new user.
 * It uses Express.js to handle the requests and Mongoose to connect to MongoDB.
 * Handles user registration, and will handle user login in the the future
 */

const express = require('express'); // listen for POST requests
const mongoose = require('mongoose'); // connect to MongoDB
const cors = require('cors'); // allow cross-origin requests
const app = express(); // create an Express app
const port = 3001;

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://neroxv1313:Snowfuzzyugen13-@mydb.vv5dhyk.mongodb.net/?retryWrites=true&w=majority&appName=myDB', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB'))
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
app.post('/users', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Post endpoint for user login
// Post endpoint for user deletion

// Start the server
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});