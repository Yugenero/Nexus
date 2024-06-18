const connectDB = require('../lib/mongoose');
const User = require('../models/user');
const sessionMiddleware = require('../lib/session');

module.exports = async (req, res) => {
  await connectDB();
  sessionMiddleware(req, res, async () => {
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
};
