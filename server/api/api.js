const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const morgan = require('morgan');

const { router: postRoutes } = require('./postRoutesApi');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB connection
mongoose.connect(process.env.MONGO_CLIENT_ID, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Session store
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_CLIENT_ID,
  ttl: 60 * 60, // 1 hour
});

app.use(session({
  name: 'my.session.cookie',
  secret: 'default-secret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 }, // 1 hour
}));

// User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json("Missing username, email, or password");
    }

    const existingUsername = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUsername || existingEmail) {
      return res.status(400).json("Username or email already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 6);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json('User created successfully');
  } catch (error) {
    res.status(400).json('User registration error: ' + error.message);
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json('Missing username or password');
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json('Cannot find user');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json('Password is incorrect');
    }

    req.session.userId = user._id;
    req.session.username = user.username;

    res.status(200).json('Login successful');
  } catch (error) {
    res.status(400).json('Login error: ' + error.message);
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out, please try again' });
    } else {
      res.clearCookie('my.session.cookie');
      res.status(200).json({ message: 'Logged out' });
    }
  });
});

app.get('/api/isLoggedIn', async (req, res) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    if (user) {
      res.status(200).json({ isLoggedIn: true, username: user.username });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } else {
    res.status(200).json({ isLoggedIn: false });
  }
});

// import serverless post routes from postRoutesApi.js
app.use('/api', postRoutes);

// Catch-all route to serve the frontend
app.use(express.static(path.join(__dirname, '..', '..', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'));
});

module.exports = app;