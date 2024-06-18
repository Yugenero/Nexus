const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose.connect(process.env.MONGO_CLIENT_ID, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
};

module.exports = connectDB;