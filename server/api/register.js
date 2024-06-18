const connectDB = require('../lib/mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  await connectDB();

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
};
