
/**
 * This is a simple server that listens for POST requests to create a new user.
 * It uses Express.js to handle the requests and Mongoose to connect to MongoDB.
 * Handles user registration, and will handle user login in the the future
 */

require('dotenv').config(); // load environment variables
const express = require('express'); // listen for POST requests
const mongoose = require('mongoose'); // connect to MongoDB
const cors = require('cors'); // allow cross-origin requests
const WebSocket = require('ws'); // create a WebSocket server
const http = require('http'); // create an HTTP server
const path = require('path'); // Required to resolve paths
const app = express(); // create an Express app
const morgan = require('morgan'); // log requests to the console
const bcrypt = require('bcrypt'); // hash passwords
const port = 3000;


const server = http.createServer(app); // create an HTTP server
// Create a WebSocket server
const wss = new WebSocket.Server({ server: server, path: '/ws' });

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_CLIENT_ID, { useNewUrlParser: true, useUnifiedTopology: true })
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
app.use(morgan('dev')); // log requests to the console for debugging purposes

app.use(express.static(path.join(__dirname, '..', '..', 'build')));

// Middleware to log requests to the console for images (for debugging purposes)
app.use('/images', (req, res, next) => {
  console.log(`Static file request for: ${req.path}`);
  next();
});

// websocket connection (for real-time user interaction not necessary for this project)
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  ws.send('ws server connected');
});

// POST endpoint for creating a new user
app.post('/register', async(request, response) => {

  
  try {
    
    const hashedPassword = await bcrypt.hash(request.body.password, 6);
    const newUser = new User({
      username: request.body.username,
      email: request.body.email,
      password: hashedPassword,
    });

    const existingUsername = await User.findOne({ username: newUser.username }); 
    const existingEmail = await User.findOne({ email: newUser.email });

    if (newUser.username === null || newUser.email === null || newUser.password === null
        || newUser.username === '' || newUser.email === '' || newUser.password === '') {
        return response.status(400).json("Missing username, email, or password");
    } else if (newUser.username.length > 15 || newUser.username.length < 3) {
        return response.status(400).json("Username must between 3 and 15 characters");
    } else if (existingUsername || existingEmail) {
        return response.status(400).json( {error: "Username or email already taken"} );
    }

    await newUser.save();
    // server side console.log will go to the terminal
    console.log('New User: ' + newUser.username + ' created succesfully' +
                  ' and entered into database');
    response.status(201).json('User created successfully');

  } catch (error) {
    response.status(400).json('User registration error: ' + error);
  }
})

// POST endpoint for logging in a user
app.post('/login', async(request, response) => {

  try {
    const user = await User.findOne({username: request.body.username})
    if (!user || user.username != request.body.username) {
      console.log(request.body.username + ' was not found in the database')
      return response.status(400).json('Cannot find user'); 
    }

    // if user exists in the database
    const match = await bcrypt.compare(request.body.password, user.password);

    if (match) {
      // server side console.log will go to the terminal
      console.log(user.username + ' logged into the database');
      console.log('User session information: ');
      return response.status(200).json('User was found');
    }
    console.log('Password is incorrect');
    response.status(201).json('Invalid Password');

  } catch (error) {
    console.log('User login error: ' + error);
    return response.status(400).json('User was not found in the database');
  }
})


// POST endpoint for deleting a user 
app.post('/delete', async(request, response) => {
  
  const user = await User.findOne({username: request.body.username});
  
  // adding return will stop function propagation
  if (!user) {
    return response.status(400).json('User not found');
  } else {
    await User.deleteOne({username: request.body.username});
  } 
})

// GET endpoint for getting all users
app.get('*', (req, res) => {
  console.log(`Serving index.html for route: ${req.path}`);
  res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'));
});


// Start the server
app.listen(port, (error) => { 
  if (error) {
    console.log('App.listen Error:' + error);
  }
  console.log('Server is running on port ' + port);
});
