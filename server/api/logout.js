const sessionMiddleware = require('../lib/session');

module.exports = (req, res) => {
  sessionMiddleware(req, res, () => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ error: 'Could not log out, please try again' });
      } else {
        res.clearCookie('my.session.cookie');
        res.status(200).json({ message: 'Logged out' });
      }
    });
  });
};
