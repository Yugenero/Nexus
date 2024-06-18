const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const sessionMiddleware = session({
  name: 'my.session.cookie',
  secret: 'default-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_CLIENT_ID,
    ttl: 60 * 60, // 1 hour
  }),
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 }, // 1 hour
});

module.exports = sessionMiddleware;