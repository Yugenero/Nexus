const connectDB = require('../lib/mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const sessionMiddleware = require('../lib/session');

module.exports = async (req, res) => {
  await connectDB();
  sessionMiddleware(req, res, async () => {
    try {
      const { username, password } = req.body;
      if (!username || !password) { // test
        return res.status(400).json('Missing username or password');
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json('Cannot find user');
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json('Password is incorrect');
      } // test

      req.session.userId = user._id;
      req.session.username = user.username;

      res.status(200).json('Login successful');
    } catch (error) {
      res.status(400).json('Login error: ' + error.message);
    } // change
  });
};
