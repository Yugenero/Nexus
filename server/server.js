
/**
 * This is a simple server that listens for POST requests to create a new user.
 * It uses Express.js to handle the requests and Mongoose to connect to MongoDB.
 * Handles user registration, and will handle user login in the the future
 */

const path = require('path'); // Required to resolve paths
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const http = require('http'); // create an HTTP server
const morgan = require('morgan'); // log requests to the console
const express = require('express'); // listen for POST requests
const session = require('express-session'); // Required for session management
const MongoStore = require('connect-mongo'); // Required for session management
const app = express(); // create an Express app
const mongoose = require('mongoose'); // connect to MongoDB
const cors = require('cors'); // allow cross-origin requests
const bcrypt = require('bcryptjs'); // hash passwords
const port = process.env.PORT || 3000;

const postRoutes = require('./postRoutes.js');

// define a session store using MongoDB
const sessionStore = MongoStore.create({ 
  mongoUrl: process.env.MONGO_CLIENT_ID,
  ttl: 60 * 60, // 1 hour
});
// create a session
app.use(session({
  name: 'my.session.cookie',
  secret: 'nero-super-awesome-secret-key',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  // set cookie to true when https is enabled and website is deployed
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 }, // 1 hour
}));

const server = http.createServer(app); // create an HTTP server
// Create a WebSocket server

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_CLIENT_ID, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to myDB in MongoDB Atlas!'))
	.catch(err => console.log('Error: ' + err));

// Define a schema for the user
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, // password to be hashed/stored in the database
}); 

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Middleware
const allowedOrigins = ['https://nexus-vdml.onrender.com']; // Replace with your frontend URL

app.use(cors({
  origin: function(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev')); // log requests to the console for debugging purposes

app.use(express.static(path.join(__dirname, '..', 'build')));

// Middleware to log requests to the console for images (for debugging purposes)
app.use('/images', (req, res, next) => {
  console.log(`Static file request for: ${req.path}`);
  next();
});

app.use(postRoutes.router);

/**
 * USER AUTHENTICATION ENDPOINTS
 */

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
app.post('/login', async (request, response) => {
  
  try {
    // Check if the username and password are provided
    const { username, password } = request.body;
    if (!username || !password) {
      console.log('Missing username or password');  
      return response.status(400).json('Missing username or password');
    }

    const user = await User.findOne({ username: request.body.username });
    if (!user) {
      console.log(`${user.username} was not found in the database`);
      return response.status(400).json('Cannot find user');
    }

    const match = await bcrypt.compare(request.body.password, user.password);

    // crosscheck database password with user input password
    if (!match) {
      console.log('Password is incorrect');
      return response.status(401).json('Password is incorrect');       
    } 

    // Iterate through all sessions to check if user already has active session
    sessionStore.all((err, sessions) => {
      if (err) {
        console.log('Error getting all sessions:', err);
        return response.status(500).json('Error getting all sessions');
      } 
      const activeSession = Object.values(sessions).find(
        (s) => s.userId === user._id.toString()
      );
      if (activeSession) {
        console.log('User is already logged in');
        console.log('Session ID: ' + request.session.userId);
        return response.status(409).json('User is already logged in');
      } else {
        console.log("request.session.userId before override: " + request.session.userId);
        request.session.userId = user._id;
        request.session.username = user.username;
        console.log('User ' + user.username + ' logged in successfully');
        console.log('Session details:', JSON.stringify(request.session, null, 2));
        return response.status(200).json('Login successful');
      }
    });
  } catch (error) {
    console.log('Generalized user login error: ' + error);
    return response.status(400).json('An error occurred during login');
  }
});

// POST endpoint for logging user out 
app.post('/logout', (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ error: 'Could not log out, please try again' });
      } else {
        res.clearCookie('my.session.cookie'); // Clear the cookie
        return res.status(200).json({ message: 'Logged out' });
      }
    });
  } catch(error) {
    console.log('Error logging out:', error);
    return res.status(500).json('Error logging out');
  }
});

// GET endpoint for checking if a user is logged in
app.get('/isLoggedIn', async (req, res) => {
  console.log('Session ID:', req.session.id);
  console.log('User ID:', req.session.userId);
  if (req.session.userId) {
    // Find the user in the database
    const user = await User.findById(req.session.userId);
    if (user) {
      // If the user is found, return their username
      res.status(200).json({ isLoggedIn: true, username: user.username });
    } else {
      // If the user is not found, return an error
      res.status(404).json({ error: 'User not found' });
    }
  } else {
    res.status(200).json({ isLoggedIn: false });
  }
});

// ALL DATA OPERATIONS NEED TO BE WRITTEN ABOVE THIS LINE

// catch all route for serving index.html
app.get('*', (req, res) => {
  console.log(`Serving index.html for route: ${req.path}`);
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});


// Start the server
app.listen(port, (error) => { 
  if (error) {
    console.log('App.listen Error:' + error);
  }
  console.log('Server is running on port ' + port);
});
